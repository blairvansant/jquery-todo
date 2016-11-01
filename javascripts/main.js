
"use strict";

let apiKeys={};

function putTodoInDom(){
	 FbAPI.getTodos(apiKeys).then(function(items){
      console.log("items from Firebase", items);
      $("#completed-tasks").html("");
      $("#incomplete-tasks").html("");

      items.forEach(function(item){
      
      if(item.isCompleted ===true){


      let newListItem = '<li>';
      newListItem+='<div class="col-xs-8">';
      newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+='<button class="btn btn-default col-xs-6 edit">Edit</button>';
      newListItem+='<button class="btn btn-danger col-xs-6 delete">Delete</button> ';
      newListItem+='</div>';
      newListItem+='</li>';
      //apend to list
      $('#completed-tasks').append(newListItem);
       }else {
      let newListItem = '<li>';
      newListItem+='<div class="col-xs-8">';
      newListItem+='<input class="checkboxStyle" type="checkbox">';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+='<button class="btn btn-default col-xs-6 edit">Edit</button>';
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
    putTodoInDom();
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

