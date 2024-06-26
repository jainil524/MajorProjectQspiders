

window.addEventListener("offline", () => {
    localStorage.setItem("previousPage", window.location.href);
    window.location.assign("../connectionlost.html");
})

window.addEventListener("online", () => {
    let previousPage = localStorage.getItem("previousPage");
    
    if(!previousPage) return;

    window.location.assign(localStorage.getItem("previousPage"));
    localStorage.removeItem("previousPage");
});