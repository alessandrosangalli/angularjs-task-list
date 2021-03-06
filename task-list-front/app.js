angular.module('taskList', []);
angular
  .module('taskList', ['ngSanitize'])
  .controller('taskListController', function ($scope, $http) {
    $scope.app = 'task list app';
    $scope.invalidEmailMessage = '';
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

    $scope.addNewTask = function (description, userEmail, name) {
      $scope.updateUser(userEmail, name).then(() => {
        var task = {
          description,
          userEmail
        };
        $http.post('http://localhost:3000/task', task).then(function () {
          ['email', 'description', 'assignedTo'].forEach((field) => {
            if($scope.fieldExists(field)) {
              $scope.task[field] = "";
            }
          });
          $scope.updateTasks();
        });
      });
    };

    $scope.fieldExists = function (field) {
      return $scope.task && $scope.task[field];
    } 

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
        }).catch((err) => {
          let wrongEmailMessage = 'Invalid format!';
          if(err.data.message) {
            wrongEmailMessage += ' Did you mean: ' + err.data.message + '?';
          }
          alert(wrongEmailMessage);
        });
    };

    $scope.updateUser = async function (email, name) {
      await $http
        .put('http://localhost:3000/user/' + email, {
          name: name
        });
    };

    $scope.addRandomTasks = function() {
      $http.get('https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3').then(function(response) {
        response.data.forEach(async function(fact) {
          const description = fact.text;
          const email = 'eu@me.com';
          const name = 'Eu';
          $scope.addNewTask(description, email, name);
        });

        $scope.updateTasks();
      });
    };

    $scope.updateTasks();
  });
