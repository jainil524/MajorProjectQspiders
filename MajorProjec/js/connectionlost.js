// Check if the browser supports the necessary features
// Listener for when the user goes offline
window.addEventListener("offline", () => {
    console.log("offline");
    try {
        localStorage.setItem("previousPage", window.location.href);
        window.location.assign("./connectionlost.html");
    } catch (e) {
        console.error("Failed to set item in localStorage:", e);
    }
});

// Listener for when the user comes back online
window.addEventListener("online", () => {
    try {
        let previousPage = localStorage.getItem("previousPage");
        alert("You are now back online!");
        if (previousPage) {
            window.location.assign(previousPage);
            localStorage.removeItem("previousPage");
        }
    } catch (e) {
        console.error("Failed to get or remove item from localStorage:", e);
    }
});
