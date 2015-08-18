angular.module('contabil').service('recordService', ['$firebaseArray', '$q', '$state', '$mdToast', function($firebaseArray, $q, $state, $mdToast) {

	var _baseURL = "https://alugueis.firebaseio.com/contabil";
	var _ref = new Firebase(_baseURL);

	this.getState = function() {
		return ($state.current.name === 'contabil');
	};

	this.loadData = function () {
		var data = $firebaseArray(_ref);
		var deferred = $q.defer();
		data.$loaded()
		.then (function (data) {
			console.log('data loaded: ', data);
			deferred.resolve(data);
			//return data;
		});
		return deferred.promise;
	};

	this.get_totals = function (data) {
		var tmp = [];
		_.map(data, function(obj) {tmp.push(obj);});
		//console.log('tmp: ', tmp);
		var t_due = 0;
		var t_received = 0;		
		for (var i in tmp) {
			if (_.isFinite(tmp[i].total_due) && _.isFinite(tmp[i].total_received)) {
				t_due = t_due + parseFloat(tmp[i].total_due);
				t_received = t_received + parseFloat(tmp[i].total_received);
			}
		}
		//console.log(t_due);
		var total = {total_due: t_due, total_received: t_received};
		return total;
	};

	this.deleteRecord = function (record) {
		console.log('delete record: ', record.$id);
		 _ref.child(record.$id).remove(function(error){
	     if (error) {
	     	console.log("Error:", error);
	  	} else {
	     	console.log("Removed successfully!");	     	
	   	}
	  });
	};

	this.createRecord = function (record) {
		var deferred = $q.defer();
		if (record.$id) {
			delete record.$id;
			delete record.$priority;
		}
		_ref.push(record, function (error) {
		  if (error) {
		  	deferred.reject(error);
		    console.log('Synchronization failed');
		  } else {
		  	deferred.resolve('Record saved!');
		    console.log('Synchronization succeeded');
			}
		});
		return deferred.promise;
	};

	this.updateRecord = function (record) {
		var deferred = $q.defer();
		var _rec = _ref.child(record.$id);
		console.log(_rec);
		if (record.$id) {
			delete record.$id;
			delete record.$priority;
		}
		_rec.update(record, function (error) {
		  if (error) {
		  	deferred.reject(error);
		    console.log('Synchronization failed');
		  } else {
		  	deferred.resolve('Record saved!');
		    console.log('Synchronization succeeded');
			}
		});
		return deferred.promise;
	};

	this.showToast = function(msg) {
    $mdToast.show(
      $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(3000)
        //.parent(angular.element('.create-form .md-whiteframe-z3'))
    );	    
	};

	this.dateToString = function(record) {
		var _newRecord = angular.copy(record);
		_.mapObject(_newRecord, function(val, key) {
			if (key.indexOf('date') > 0) {
				var d = new Date(_newRecord[key]);
				_newRecord[key] = d.toISOString();
				console.log('new obj: ', _newRecord[key]);
			}
		});
		return _newRecord;
	};

	this.stringToDate = function(record) {
		var _newRecord = angular.copy(record);
		_.mapObject(_newRecord, function(val, key) {
			if (key.indexOf('date') > 0) {
				var d = new Date(_newRecord[key]);
				_newRecord[key] = d;
				console.log('new key: ', _newRecord[key]);
			}
		});
		return _newRecord;
	};

}]);