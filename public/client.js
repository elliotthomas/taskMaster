console.log("in JS");

$(document).ready (function (){
  console.log("in JQ");

  enableButtons();
});

function enableButtons () {
  $(document).on('click', '#submitNewTask', getUserTask);

};//end clicks

function getUserTask (){
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
};//end get user task
