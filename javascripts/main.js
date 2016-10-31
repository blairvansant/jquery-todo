"use strict";

let input = $(".form-control");
let todo = $("#todoOutput");
let submit = $("#clicky-button");
let messages = [];
let completedTasks = [];

$(document).ready(function() {
	$(submit).on("click", function(event){
		event.preventDefault();
		let output = `<div class="messageDiv"><span>${input.val()}</span>`;
		output += `<button class="btn btn-info  spacing complete">completed</button>`; 
		output += `<button class="btn btn-success spacing edit">edit</button>`;
		output += `<button class="btn btn-warning spacing delete">delete</button>`;
		output += `<button class="btn btn-danger spacing un-complete">un-complete</button></div>`;
		todo.append(output);
	});

$(document).on("click", ".complete", function(){
	console.log("complete");
	$('#todoOutput').appendTo('#completeOutput');
});

// $(document).on('click', '.edit-btn', function(){
//     $("#todo-input").focus();
//     $("#todo-input").val("");
//     let editItem = $("#todo-input").val();
//     console.log($(this).siblings('span').text(editItem));
//   });
$(document).on("click", ".edit", function(){
	console.log("edit");
});

$(document).on("click", ".delete", function(){
	$(this).closest("div").remove();
	});

$(document).on("click", ".un-complete", function(){
	console.log("un-complete");
	});


});	

