let searchTimeout;

document.addEventListener('DOMContentLoaded', function () {
    let hash = window.location.hash;

    getCategories();
    if (hash != null) {
        getProducts(hash.split("#")[1]);
    } else {
        getProducts();

    }


    // Event listener for search input
    document.getElementById('search').addEventListener('input', debounce(function () {
        performSearch(this.value);
    }, 30));

    // Event listener for close button in popup
    document.querySelector(".popup-container").addEventListener('click', (e) => {
        if (
            e.target.classList.contains("popup")
            ||
            e.target.closest(".popup") != null
        ) {
            return;
        } else {
            closePopup();
        }
    });

});


// Debounce function
function debounce(func, delay) {
    return function () {
        clearTimeout();
        searchTimeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

function getCategories() {

    fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then(
            (result) => {
                setCategory(result);
            },
            (error) => {
                console.log(error);
            }
        );
}


function performSearch(query) {
    const Products = document.querySelectorAll(".item");

    if (["", " ", null].includes(query)) {
        Products.forEach(product => product.style.display = "flex");
        return;
    }



    Array.from(Products).forEach(product => {
        if (
            product.querySelector(".item-name p").textContent.toLowerCase().includes(query.toLowerCase()) == false
            &&
            product.querySelector(".item-brand").textContent.toLowerCase().includes(query.toLowerCase()) == false
            &&
            product.querySelector(".item-discounted-price span").textContent.includes("$" + query.toLowerCase()) == false
        ) {
            product.style.display = "none";
        }
    })

}


function closePopup() {
    let popupcon = document.querySelector(".popup-container");
    popupcon.classList.remove("active-popup");

    popupcon.querySelector(".popup .popup-body").innerHTML = "";

}
