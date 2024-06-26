if(window.localStorage.getItem("currentUser") == null){
    alert("Please login to continue");
    window.location.href = "../Login/login.html";
}