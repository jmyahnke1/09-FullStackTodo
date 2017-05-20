(function() {
  'use strict';
  // This is the controller for the VSTDA project.
  angular
    .module('vstdaApp')
    .controller('VSTDAController', VSTDAController);

  VSTDAController.$inject = ['VSTDAFactory', '$log'];

  /* @ngInject */
  function VSTDAController(VSTDAFactory, $log) {
    var vm = this;

//Various bound parameters
    vm.priority = {};  //Select element
    vm.taskText = ""; //Task text
    vm.items = [];
    vm.GetTask = GetTask;
    //Func definitions
    vm.DoubleClick = DoubleClick;
    vm.DeleteTask = DeleteTask;
    vm.PutTask = PutTask;
    //Workspace
    var editingTask = {};

    //Sorting properties.
    vm.predicate = 'priority';
    vm.reverse = true;
    // These are for the select dropown
    vm.selectOptions = [{
        value: 1,
        label: "High Priority"
      },
      {
        value: 2,
        label: "Medium Priority"
      },
      {
        value: 3,
        label: "Low Priority"
      }
    ];

    activate(); //Run on ready.
    function activate() {
      vm.priority = vm.selectOptions[0];
      //vm.GetTask();
    }

//function called upon a double click
    function DoubleClick(taskItem) {
      toastr.success("Dub click" + taskItem.keyId);
      vm.priority = vm.selectOptions[taskItem.priority - 1];
      // console.log(vm.priority.value);
      vm.taskText = taskItem.toDoText;
      editingTask = taskItem;
      // console.log(editingTask);
    };

//maps to GET
    function GetTask() {

      //Call the factory:
      VSTDAFactory.getTask().then(
        //Good response
        function(response) {
          var taskettes = response.data;    //Get the data into a local var
          vm.items.length = 0;              //Clear the array that hold the UI list data.
          //Go through the local var's array data and prepare it for UI display.
          for (var index = 0; index < taskettes.length; index++) {
            var newNode = {
              keyId: taskettes[index].keyId,
              toDoText: taskettes[index].toDoText,
              priority: taskettes[index].priority,
              creationDate: taskettes[index].creationDate,
              dateAndText: taskettes[index].creationDate + ": " + taskettes[index].toDoText
            };
            vm.items.push(newNode);  //Push to UI list
          }
        },
        function(error) {  //Error handler
          $log.error('Failure getting task', error);
        });
    }

    //postTask sends a new task to the DB.
    function PostTask(node) {
      //console.log(node);
      VSTDAFactory.postTask(node).then(
        function(response) {
          toastr.success('Success setting task');
          GetTask();
        },
        function(error) {
          $log.error('Failure getting task', error);
          toastr.error('Failure getting task', error);
        });
    }

    //Delete task. Zap a task!!
    function DeleteTask() {
    //console.log(taskToDelete);
      VSTDAFactory.deleteTask(editingTask).then(
        function(response) {
          toastr.success('Success deleting task');
          GetTask();
          vm.taskText = "";
        },
        function(error) {
          $log.error('Failure deleting task', error);
          toastr.error('Failure deleting task', error);
        });
    }

    //Put task for updates, and the like!!
    function PutTask() {
      editingTask.toDotext = vm.taskText;
      editingTask.priority = vm.priority.value;

      var date = new Date();
      var datestring = date.toISOString();
      editingTask.creationDate = datestring;

      VSTDAFactory.putTask(editingTask).then(
        function(response) {
          toastr.success('Success Putting task');
          GetTask();
        },
        function(error) {
          if (error.status !== 204) {
          $log.error('Failure Putting task', error);
          toastr.error('Failure Putting task', error);
        }
        else {
          toastr.success('Success Putting task');
          GetTask();
        }
        });
    }

    // Add items reads the task text properties and sets the selected priority.
    vm.AddItem = function() {
      if (vm.taskText === "" || vm.taskText === null || vm.taskText === undefined) {
        toastr.error('Then hit the add item button', 'Enter a task in the input box');
        return;  //Don't save the blank line!
      }
      var date = new Date();  //Capture the date timestamp as
      var datestring = date.toISOString();
      var newNode = {
        toDoText: vm.taskText,
        priority: vm.priority.value,
        creationDate: datestring
      };
      // console.log("The new node is ");
      // console.log(newNode);
      // console.log(vm.priority);
      PostTask(newNode);

      vm.taskText = "";  //Clear the text box for the enxt entry.
    }

    // These are for the sorting predicates in HTML code.
    vm.order = function(predicate) {
      vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
      vm.predicate = predicate;
    }

    // I am just returning these classes to each item so they show the right color.
    vm.getClassInfo = function(index) {
      switch (index) {
        case 1:
          return "list-group-item-danger";
          break;
        case 2:
          return "list-group-item-warning";
          break;
        case 3:
          return "list-group-item-info";
          break;
        default:
          return "None";
          break;
      }
    }
  }
})();
