console.log("in JS");

$(document).ready (function (){
  console.log("in JQ");

  enableButtons();
});//end doc ready

function enableButtons () {
  $(document).on('click', '#submitNewTask', postUserTask);
  $(document).on('click', '.delete', deleteTask);

};//end enable buttons

function postUserTask (){
  var newTaskValue = $('#newTask').val();

  var objectToSend = {
    newTask: newTaskValue,
    complete: false
  };//end object to send

$.ajax ({
  type: 'POST',
  url: '/postTask',
  data: objectToSend,
  success: function ( response ) {
    console.log('back from the post call', response);
  },
  error: function () {
    console.log('error with ajax call');
  }
});//end ajax call
getTask();
};//end post user task

function getTask () {
  $.ajax ({
    type: 'GET',
    url: '/getTask',
    success: function ( response ) {
      console.log( 'back from database ', response);
      displayTask(response);
    },
    error: function () {
      console.log('error with ajax call');
    }//end error stmt
  });//end ajax call back from database
};//end get task

function deleteTask () {
  var deleteTask = {
    id: $()
  }
  $.ajax ({
    type: 'PUT',
    url: '/deleteTask',
    
  });//end ajax call
};//end delete task

function displayTask (array){
  console.log('in display task', array)
  var allTasks = '<tr><td>Task</td><td>Completed?</td><td>Complete Task<td>Delete Task</td>'
  for (var i = 0; i < array.length; i++) {
    if (array[i].complete == true) {
    allTasks += '<tr><td>' + array[i].task + '</td><td>&#9989;</td>';
    allTasks += '<td><button type="button" class = "complete" data ="'+ array[i].id + '">Complete</button>';
    allTasks += '<td><button type="button" class = "delete" data ="'+ array[i].id  + '">Delete</button>'
  } else {
    allTasks += '<tr><td>' + array[i].task + '</td><td>No</td>'
    allTasks += '<td><button type="button" class = "complete" data ="'+ array[i].id + '">Complete</button>';
    allTasks += '<td><button type="button" class = "delete" data ="'+ array[i].id  + '">Delete</button>'
  }
  $('#outputTable').html( allTasks );
  }//end for loop
};//end display task
