inloggen();

function inloggen(){
	document.querySelector("#inloggen_id").addEventListener("click", function(){
		
		var username = document.querySelector("#username_id").value;
		var password = document.querySelector("#password_id").value;
		sessionStorage.setItem('username', username);
		sessionStorage.setItem('password', password);
		
		var formData = new FormData(document.querySelector("#formuser"));
    	var encData = new URLSearchParams(formData.entries());
		
		fetch("restservices/authentication", {method:'POST', body: encData})
			.then(response => response)
			.then(function(token){
				sessionStorage.setItem("sessionToken", token);
				console.log(token);
			})
	});
}