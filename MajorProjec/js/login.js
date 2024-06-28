let loginbtn = document.querySelector("#login");

// set the click event on the login button
loginbtn.addEventListener("click", function () {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let users= JSON.parse(localStorage.getItem("users"));

    let conditionCheckArray = [" ",null,""];

    // check if the fields are empty or only spaces
    // if the fields are empty or only spaces, an alert will be displayed
    if(conditionCheckArray.includes(email) || conditionCheckArray.includes(password)){
        alert("Field cannot be empty or only spaces");
        return;
    }

    // if the there is no user add to the local storage
    // it will display an alert that the user is not found
    if(users == null){
        alert("User not found");
    }
    // falls under here if the users array is not empty in the local storage
    else{

        // check if the email and password is correct
        // if the email and password is correct, an alert will be displayed
        // and the user will be redirected to the home page
        // else an alert will be displayed that the email or password is incorrect
        users.forEach(user => {
            if(user.email == email && user.password == password){
                alert("Login successful");

                localStorage.setItem("currentUser", JSON.stringify(user));

                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "./index.html";
            }else{
                alert("Incorrect email or password");
            }
        });
    }

    
});
