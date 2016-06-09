observeApp.directive("highlightCard", function () {
    var cardTemplate = '' +
    '<div class="highlight-card">' +
            '{{currentHighlight.name}} ' +
            '<a class="button tiny" ng-click="enableEditor()">Edit</a>' +
        '<div ng-show="view.editorEnabled">' +
            '<input type="text" class="small-12.columns" ng-model="currentJob.comment">' +
            '<a class="button tiny" href="#" ng-click="save()">Save</a>' +
            ' or ' +
            '<a class="button tiny" ng-click="disableEditor()">cancel</a>' +
        '</div>' +
    '</div>';

return {
    restrict: "E",
    replace: true,
    template: cardTemplate,
    scope: {
        currentHighlight : "="
    },
    link: function (scope, element, attrs) {
        scope.view = {
            editableValue: scope.value,
            editorEnabled: false
        };

        scope.enableEditor = function () {
            scope.view.editorEnabled = true;
            scope.view.editableValue = scope.value;
            setTimeout(function () {
                element.find('input')[0].focus();
                //element.find('input').focus().select(); // w/ jQuery
            });
        };

        scope.disableEditor = function () {
            scope.view.editorEnabled = false;
        };

        scope.save = function () {
//            scope.value = scope.view.editableValue;
            scope.disableEditor();
            scope.saveComment()(scope.currentJob.name, scope.currentJob.comment);
        };

    }
};
});

