// Purpose: To check if the user is logged in or not
// if the user is not logged in, the user will be redirected to the login page
if(window.localStorage.getItem("currentUser") == null){
    alert("Please login to continue");
    window.location.href = "./login.html";
}