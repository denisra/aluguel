angular.module('contabil').service('recordService', ['$firebaseArray', '$q', '$state', function($firebaseArray, $q, $state) {

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
			t_due = t_due + parseFloat(tmp[i].total_due);
			t_received = t_received + parseFloat(tmp[i].total_received);
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

	this.saveRecord = function (record) {
		var deferred = $q.defer();
		_ref.push(record, function (error) {
		  if (error) {
		    console.log('Synchronization failed');
		  } else {
		    console.log('Synchronization succeeded');
			}
		});
	};

}]);