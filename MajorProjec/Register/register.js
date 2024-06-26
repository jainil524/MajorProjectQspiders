let registerbtn = document.querySelector("#register");

registerbtn.addEventListener("click", function () {
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let users = JSON.parse(localStorage.getItem("users"));
    let conditionCheckArray = [" ",null,""];
    if(conditionCheckArray.includes(email) || conditionCheckArray.includes(password)){
        alert("Field cannot be empty or only spaces");
        return;
    }


    if (users == null) {
        users = [];
    }else{
        let isUserExist = users.find(user => user.email === email);

        if(isUserExist){
            alert("Already register email, try different email or login with that");
            return;
        } 
            
    }



    let user = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim()
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully");
    window.location.assign("../Login/login.html");
});