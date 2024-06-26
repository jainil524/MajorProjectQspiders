let loginbtn = document.querySelector("#login");

loginbtn.addEventListener("click", function () {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let users= JSON.parse(localStorage.getItem("users"));

    let conditionCheckArray = [" ",null,""];

    if(conditionCheckArray.includes(email) || conditionCheckArray.includes(password)){
        alert("Field cannot be empty or only spaces");
        return;
    }

    if(users == null){
        alert("User not found");
    }

    else{
        users.forEach(user => {
            if(user.email == email && user.password == password){
                alert("Login successful");

                localStorage.setItem("currentUser", JSON.stringify(user));

                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "../Home/home.html";
            }else{
                alert("Incorrect email or password");
            }
        });
    }

    
});
