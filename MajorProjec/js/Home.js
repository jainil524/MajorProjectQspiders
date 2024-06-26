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


// function which stops the search function to run multiple times
// and only runs the search function after the user stops typing for 30ms
function debounce(func, delay) {
    return function () {
        clearTimeout();
        searchTimeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// function to get products catogories from the API 
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


// function to set categories in the page home
function setCategory(categoies) {
    let categoiesCont = document.querySelector('.categories ul');

    let categoryElement = document.createElement('li');
    categoryElement.className = 'category';
    categoryElement.innerHTML = "All";
    categoiesCont.appendChild(categoryElement);

    categoryElement.addEventListener('click', function () {
        getProducts();
        window.location.hash = "";
    });

    categoies.forEach(category => {

        let categoryElement = document.createElement('li');
        categoryElement.className = 'category';
        categoryElement.innerHTML = category;
        categoiesCont.appendChild(categoryElement);

        categoryElement.addEventListener('click', function () {
            getProducts(category);
            window.location.hash = category;
        });

    });

}

// function to search the products from the existing product list
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

// function to closen the popup
function closePopup() {
    let popupcon = document.querySelector(".popup-container");
    popupcon.classList.remove("active-popup");

    popupcon.querySelector(".popup .popup-body").innerHTML = "";

}
