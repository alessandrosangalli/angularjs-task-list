angular.module('taskList', []);
angular
  .module('taskList')
  .controller('taskListController', function ($scope, $http) {
    $scope.app = 'task list app';

    $scope.models = {
      tasks: [],
    };

    $scope.updateTasks = function () {
      $scope.models.tasks = {};
      $http.get('http://localhost:3000/state').then(function (response) {
        let states = response.data;
        $http.get('http://localhost:3000/task').then(function (response) {
          let tasks = response.data;

          let result = states.map((state) => {
            const result = {
              title: state.title,
              isFinalState: state.isFinalState,
              list: [],
            };

            result.list = tasks.filter((task) => {
              return task.stateId === state.id;
            });

            return result;
          });

          $scope.models.tasks = result;
        });
      });
    };

    $scope.addNewTask = function () {
      $scope.updateUser($scope.task.email).then(() => {
        var task = {
          description: $scope.task.description,
          userEmail: $scope.task.email,
        };
        $http.post('http://localhost:3000/task', task).then(function () {
          $scope.updateTasks();
        });
      });
    };

    $scope.changeStatus = function (taskId, moveTo) {
      $http
        .patch('http://localhost:3000/task', { taskId, moveTo })
        .then(function (response) {
          $scope.updateTasks();
        });
    };

    $scope.findUser = function (email) {
      $http
        .get('http://localhost:3000/user/' + email)
        .then(function (response) {
          if (response.data) {
            $scope.task.assignedTo = response.data.name;
          }
        });
    };

    $scope.updateUser = async function (email) {
      await $http
        .put('http://localhost:3000/user/' + email, {
          name: $scope.task.assignedTo,
        });
    };

    $scope.updateTasks();
  });
