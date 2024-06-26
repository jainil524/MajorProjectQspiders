// if the user is offline, the user will be redirected to the connectionlost.html page
window.addEventListener("offline", () => {
    localStorage.setItem("previousPage", window.location.href);
    window.location.assign("./connectionlost.html");
})

// if the user is online, the user will be redirected to the previous page
window.addEventListener("online", () => {
    let previousPage = localStorage.getItem("previousPage");
    
    if(!previousPage) return;

    window.location.assign(localStorage.getItem("previousPage"));
    localStorage.removeItem("previousPage");
});