
"use strict";

let apiKeys={};
let uid = "";

function putTodoInDom(){
	 FbAPI.getTodos(apiKeys, uid).then(function(items, uid){
      console.log("items from Firebase", items);
      $("#completed-tasks").html("");
      $("#incomplete-tasks").html("");

      items.forEach(function(item){
      
      if(item.isCompleted ===true){

      let newListItem = `<li data-completed="${item.isCompleted}">`;
      newListItem+='<div class="col-xs-6">';
      newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;

      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+='<button class="btn btn-default col-xs-6 edit">Edit</button>';
      newListItem+='<button class="btn btn-danger col-xs-6 delete">Delete</button> ';
      newListItem+='</div>';
      newListItem+='</li>';
      //apend to list
      $('#completed-tasks').append(newListItem);
       }else {
      let newListItem = `<li data-completed="${item.isCompleted}">`;
      newListItem+=`<div class="col-xs-6" data-fbid="${item.id}">`;
      newListItem+='<input class="checkboxStyle" type="checkbox">';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+=`<button class="btn btn-default col-xs-6 edit" data-fbid="${item.id}">Edit</button>`;
      newListItem+=`<button class="btn btn-danger col-xs-6 delete" data-fbid="${item.id}">Delete</button> `;
      newListItem+='</div>';
      newListItem+='</li>';
      $('#incomplete-tasks').append(newListItem);

      }
    });
  });
}

$(document).ready(function(){
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys=keys;
    firebase.initializeApp(apiKeys);
   });

  $("#clicky-button").on("click", function(){
  	let newItem = {
  		"task": $("#toDoInput").val(),
  		"isCompleted": false
  	};

FbAPI.addTodo(apiKeys, newItem).then(function(){
	putTodoInDom();
			});

  	});

$("ul").on("click", ".delete", function(){
	let itemId = $(this).data("fbid");
	FbAPI.deleteTodo(apiKeys, itemId).then(function(){
		putTodoInDom();
		});

	});

$('ul').on("click", ".edit", function(){
	let parent = $(this).closest("li");
			let itemId = $(this).data("fbid");

	if (!parent.hasClass("editMode")){
		parent.addClass("editMode");
	} else {
		let editedItem = {

			"task": parent.find("inputTask").val(),
			"isCompleted": false

		};
			FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(respone){
				parent.removeClass("editMode");
				putTodoInDom();
			});
		}
	});
$('ul').on("change", 'input[type="checkbox"]', function(){
	let updatedIsCompleted = $(this).closest("li").data("completed");
	let itemId = $(this).parent().data("fbid");
	let task = $(this).siblings(".inputLabel").html();
	let editedItem = {
		"task": task,
		"isCompleted":!updatedIsCompleted
		};
	FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(){
		putTodoInDom();
	});

});

$('#registerButton').on('click', function(){
	let email = $("#inputEmail").val();
	let password = $("#inputPassword").val();
	let user = {
		"email": email,
		"password": password
	};
	FbAPI.registerUser(user).then(function(response){
		console.log("register response", response);
		return FbAPI.loginUser(user);
	}).then(function(loginResponse){
		console.log("login response", loginResponse);
		uid = loginResponse.uid;
		putTodoInDom();
		$("login-container").addClass("hide");
		$("todo-container").removeClass("hide");
	});

});

$("#loginButton").on("click", function(){
	let email = $("#inputEmail").val();
	let password = $("#inputPassword").val();
	let user = {
		"email": email,
		"password": password
};

FbAPI.loginUser(user).then(function(loginResponse){
	uid = loginResponse.uid;
	putTodoInDom();
	$("#login-container").addClass("hide");
	$("#todo-container").removeClass("hide");
		});

	});
});
// "use strict";

// let apiKeys = {};

// $(document).ready(function(){
// 	FbAPI.firebaseCredentials().then(function(keys){
// 		console.log("keys", keys);
// 		apiKeys = keys;
// 			firebase.initializeApp(apiKeys);
// 			FbAPI.getTodos(apiKeys).then(function(items){
// 				console.log("items from FB", items);
// 			});
// 	});

// });

























// "use strict";

// let input = $(".form-control");
// let todo = $("#todoOutput");
// let submit = $("#clicky-button");
// let messages = [];
// let completedTasks = [];

// $(document).ready(function() {
// 	$(submit).on("click", function(event){
// 		event.preventDefault();
// 		let output = `<div class="messageDiv"><span>${input.val()}</span>`;
// 		output += `<button class="btn btn-info  spacing complete">completed</button>`; 
// 		output += `<button class="btn btn-success spacing edit">edit</button>`;
// 		output += `<button class="btn btn-warning spacing delete">delete</button>`;
// 		output += `<button class="btn btn-danger spacing un-complete">un-complete</button></div>`;
// 		todo.append(output);
// 	});

// $(document).on("click", ".complete", function(){
// 	console.log("complete");
// 	$('#todoOutput').appendTo('#completeOutput');
// });

// // $(document).on('click', '.edit-btn', function(){
// //     $("#todo-input").focus();
// //     $("#todo-input").val("");
// //     let editItem = $("#todo-input").val();
// //     console.log($(this).siblings('span').text(editItem));
// //   });
// $(document).on("click", ".edit", function(){
// 	console.log("edit");
// });

// $(document).on("click", ".delete", function(){
// 	$(this).closest("div").remove();
// 	});

// $(document).on("click", ".un-complete", function(){
// 	console.log("un-complete");
// 	});


// });	

