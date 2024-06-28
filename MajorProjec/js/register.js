let registerbtn = document.querySelector("#register");

// set the click event on the register button
registerbtn.addEventListener("click", function () {
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let users = JSON.parse(localStorage.getItem("users"));
    let conditionCheckArray = [" ",null,""];
    
    // check if the fields are empty or only spaces
    // if the fields are empty or only spaces, an alert will be displayed
    if(conditionCheckArray.includes(email) || conditionCheckArray.includes(password)){
        alert("Field cannot be empty or only spaces");
        return;
    }

    // if the there is no user add to the local storage
    if (users == null) {
        users = [];
    }
    // falls under here if the users array is not empty in the local storage
    else{

        // check if the email is already registered
        let isUserExist = users.find(user => user.email === email);

        // if the email is already registered, an alert will be displayed
        if(isUserExist){
            alert("Already register email, try different email or login with that");
            return;
        } 
            
    }


    // create a user object with the input values
    let user = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim()
    };

    // push the user object to the users array
    users.push(user);

    // set the users array to the local storage
    // and display an alert that the user is registered successfully
    // and redirect to the login page
    
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully");
    window.location.assign("./login.html");
});