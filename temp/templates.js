angular.module('aluguel').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('contabil/partial/create/create.html',
    "<div class=col-md-12 ng-controller=CreateCtrl><p class=text-center><a href=# class=\"btn btn-primary\" ng-click=reset()>Reset</a></p></div>"
  );


  $templateCache.put('contabil/partial/list/contabil.html',
    "<div class=main-fab><md-button ui-sref=create><ng-md-icon icon=add_circle size=56 style=\"fill: #0277bd\"></ng-md-icon></md-button></div><div class=main-contabil layout=row flex ng-controller=ContabilCtrl><md-whiteframe class=md-whiteframe-z2 layout-fill layout-padding><h2>Contabil</h2><md-content class=contabil-tb layout=column flex=flex ng-click=\"toggleSearch=false\"><md-table headers=headers content=content sortable filters=search custom-class=custom thumbs=thumbs count=count></md-table></md-content></md-whiteframe></div><footer><md-toolbar class=md-medium-tall><div layout=column flex layout-align=\"center start\" layout-padding ng-controller=ContabilCtrl><p>Total Recebido: R$ {{total_amounts.total_received}}</p><p>Total a Receber: R$ {{total_amounts.total_due}}</p></div></md-toolbar></footer>"
  );


  $templateCache.put('directive/mdTable/mdTable.html',
    "<table md-colresize=md-colresize class=md-table><thead><tr class=md-table-headers-row><th ng-repeat=\"h in headers\" class=md-table-header><a href=# ng-if=handleSort(h.field) ng-click=\"reverse=!reverse;order(h.field,reverse)\">{{h.name}}<ng-md-icon icon=arrow_drop_down ng-show=\"reverse &amp;&amp; h.field == predicate\"></ng-md-icon><ng-md-icon icon=arrow_drop_up ng-show=\"!reverse &amp;&amp; h.field == predicate\"></ng-md-icon></a><span ng-if=!handleSort(h.field)>{{h.name}}</span></th><th class=md-table-header></th></tr></thead><tbody><tr ng-repeat=\"c in content | filter:filters | startFrom:tablePage*count | limitTo: count\" class=md-table-content-row><td ng-repeat=\"h in headers\" ng-class=customClass[h.field] ng-if=\"h.field != thumbs\" class=md-table-content>{{(h.field.indexOf('name') > 0) ? $filter('search')(c[h.field]) : c[h.field];}}</td><td class=md-table-td-more><md-button aria-label=Info><ng-md-icon icon=more_vert></ng-md-icon></md-button></td></tr></tbody></table><div layout=row class=md-table-footer><span class=md-table-count-info>Rows per page : <a href=# ng-click=\"goToPage(0); count=10\">10</a>,<a href=# ng-click=\"goToPage(0); count=25\">25</a>,<a href=# ng-click=\"goToPage(0); count=50\">50</a>,<a href=# ng-click=\"goToPage(0); count=100\">100</a>(current is {{count}})</span><span flex=flex></span><span ng-show=\"nbOfPages() &gt; 1\"><md-button ng-disabled=\"tablePage==0\" ng-click=\"tablePage=tablePage-1\" aria-label=\"Previous Page\"><ng-md-icon icon=chevron_left style=\"fill: #0277bd\"></ng-md-icon></md-button><a href=# ng-repeat=\"i in getNumber(nbOfPages()) track by $index\"><md-button ng-click=goToPage($index) class=\"md-primary md-hue-2 md-table-footer-item\"><span ng-class=\"{ 'md-table-active-page': tablePage==$index}\">{{$index+1}}</span></md-button></a><md-button ng-disabled=\"tablePage==nbOfPages()-1\" ng-click=\"tablePage=tablePage+1\" aria-label=\"Next Page\"><ng-md-icon icon=chevron_right style=\"fill: #0277bd\"></ng-md-icon></md-button></span></div>"
  );

}]);
