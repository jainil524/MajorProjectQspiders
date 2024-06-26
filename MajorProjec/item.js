
document.addEventListener('DOMContentLoaded', function () {
    let w = window.localStorage.getItem("wishlist");
    let c = window.localStorage.getItem("cartlist");

    if (w == null) {
        window.localStorage.setItem("wishlist", JSON.stringify([]));
    } else {
        if (JSON.parse(w).length > 0) {
            document.querySelector(".wish.listicon").setAttribute("data-count", JSON.parse(w).length);
        }
    }

    if (c == null) {
        window.localStorage.setItem("cartlist", JSON.stringify([]));
    } else {
        if (JSON.parse(c).length > 0) {
            document.querySelector(".cart.listicon").setAttribute("data-count", JSON.parse(c).length);
        }
    }
});

function getProducts(category) {

    let linkToFetch = 'https://dummyjson.com/products';

    if (category) {
        linkToFetch += '/category/' + category;
    }

    fetch(linkToFetch)
        .then(res => res.json())
        .then(
            (result) => {
                setProducts(result);
            },
            (error) => {
                console.log(error);
            }
        );
}

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

function setProducts(products, forPopup = false) {

    let productsCont = document.querySelector('.item-container');

    let wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
    let cartlist = JSON.parse(window.localStorage.getItem("cartlist"));

    if (forPopup) {
        productsCont = document.querySelector('.popup .popup-body');
    }

    let ProductsFragment = document.createDocumentFragment();

    products.products.forEach(product => {
        let imagesElement = ``;
        let reviewElement = ``;
        let isWishlisted = false;
        let isCartlisted = false;
        product.images.forEach((image, index) => {
            imagesElement += `<div class="${index==0?'visible-img':''}"><img src="${image}" alt="${product.title}" class="img${index}"></div>`;
        });

        if (forPopup == true) {
            reviewElement = `<div class="reviews">
                                <h2>Reviews</h2>
                                <hr/>`;
            product.reviews.forEach(review => {
                reviewElement += `<div class="review">
                                     <h3><a href="mailto:${review.reviewerEmail}">${review.reviewerName}</a></h3>
                                    <div class="reviewer-info">
                                        <div class="item-rating">
                                            <span class="star"><img src="../img/star.svg" alt=""></span>
                                            <span class="rate">${review.rating}</span>
                                        </div>
                                        <div class="review-comment">
                                            ${review.comment}
                                        </div>
                                        <div class="review-date">
                                            ${review.date.split("T")[0]}
                                        </div>
                                    </div>
                                </div>`;
            });

            reviewElement += `</div>`;
        }

        let productElement = document.createElement('div');
        productElement.classList.add("item");
        productElement.setAttribute("data-title", product.title);
        productElement.setAttribute("data-id", product.id);
        if (wishlist.find(item => item.id == product.id)) {
            isWishlisted = true;
        }

        if (cartlist.find(item => item.id == product.id)) {
            isCartlisted = true;
        }

        productElement.innerHTML = `<div class="item-img ${(product.images.length > 1 ? 'multiple' : '')}">
                                            <div class="image-container">
                                                ${imagesElement}
                                                <button class="prev-button" onclick="imageSlide('prev', this)">&lt;</button>
                                                <button class="next-button" onclick="imageSlide('next', this)">&gt;</button>
                                            </div>
                                        </div>

                                        <div class="item-info">
                                            <div class="item-name">
                                                <p>${product.title}</p>
                                            </div>
                                            <div class="item-brand">
                                                ${product.brand || ""}
                                            </div>
                                            ${forPopup == true ? `<div class="item-desc">
                                                ${product.description || ""}
                                            </div>` : ""}
                                            <div class="item-price">
                                                <div class="item-discounted-price">
                                                    <span>$${parseFloat(product.price - ((product.price * product.discountPercentage) / 100)).toFixed(2)}</span>
                                                </div>
                                                <div class="item-original-price">
                                                    <span>$${product.price}</span>
                                                </div>
                                            </div>
                                            <div class="item-rating">
                                                <span class="star"><img src="../img/star.svg" alt=""></span>
                                                <span class="rate">${product.rating}</span>
                                            </div>
                                            <div class="item-btns">
                                                <div class="addwishlist">
                                                    <button ${isWishlisted ? 'class="wishlisted"' : ''} onclick='${isWishlisted ? "RemoveFromList(this, `wishlist`," + product.id + ")" : 'AddtoList(this, "wishlist")'}'><img src="${isWishlisted ? '../img/WishListed.png' : '../img/AddToWishlist.svg'}" alt="">${isWishlisted ? 'Wished' : 'Add to Wishlist'}</button>
                                                </div>
                                                <div class="addcart">
                                                    <button ${isCartlisted ? 'class="cartlisted"' : ''} onclick='${isCartlisted ? "RemoveFromList(this, `cartlist`," + product.id + ")" : 'AddtoList(this, "cartlist")'}'><img src="${isCartlisted ? '../img/Carted.png' : '../img/Cart.svg'}" alt="">${isCartlisted ? 'Carted' : 'Add to cart'}</button>
                                                </div>
                                            </div>
                                            ${forPopup == true ? reviewElement : ""}
                                        </div>`;

        productElement.querySelector(".image-container img:first-child").classList.add("visible-img");
        productElement.addEventListener('dblclick', viewProduct);

        ProductsFragment.appendChild(productElement);
        imagesElement = null;
        reviewElement = null;
    });

    productsCont.innerHTML = '';

    productsCont.appendChild(ProductsFragment);
    if (forPopup == true)
        productsCont.closest(".popup-container").classList.add("active-popup");
}

async function viewProduct(e) {
    let product = e.target.closest(".item");

    let res = await fetch("https://dummyjson.com/products/search?q=" + product.dataset.title);
    let productData = await res.json();

    setProducts(productData, true);

}

function imageSlide(direction, target) {

    let currImage = target.closest(".image-container").querySelector("div.visible-img");
    let ResultElement = (direction == "prev" ? currImage.previousElementSibling: currImage.nextElementSibling);

    console.log(ResultElement);

    if (ResultElement instanceof HTMLElement) {
        currImage.classList.remove("visible-img");
        ResultElement.classList.add("visible-img")
    }

}


function AddtoList(target, place) {
    let item = target.closest(".item");
    let lists = JSON.parse(window.localStorage.getItem(place));
    let newItem = {
        id: item.dataset.id,
        title: item.dataset.title
    }

    lists.push(newItem);

    window.localStorage.setItem(place, JSON.stringify(lists));

    if (place == "wishlist") {
        target.querySelector("img").src = "../img/WishListed.png";
        target.innerHTML = target.querySelector("img").outerHTML + "Wished";
        target.classList.add("wishlisted");

        let onclickprop = target.getAttribute("onclick");
        onclickprop = onclickprop.replace("RemoveFromList", "AddtoList");

        target.setAttribute("onclick", onclickprop);

        document.querySelector(".wish.listicon").setAttribute("data-count", lists.length);
    } else {
        target.querySelector("img").src = "../img/Carted.png";
        target.innerHTML = target.querySelector("img").outerHTML + "Carted";
        target.classList.add("cartlisted");

        let onclickprop = target.getAttribute("onclick");
        onclickprop = onclickprop.replace("AddtoList", "RemoveFromList");

        target.setAttribute("onclick", onclickprop);

        document.querySelector(".cart.listicon").setAttribute("data-count", lists.length);
    }

}


function RemoveFromList(target, place, id) {
    let item = target.closest(".item");
    let lists = JSON.parse(window.localStorage.getItem(place));

    console.log("Before", lists);

    lists = lists.filter(item => item.id != id);

    console.log("After", lists, lists.length);

    window.localStorage.setItem(place, JSON.stringify(lists));
    if (place == pagename) {
        item.remove();
    } else if (pagename == "home") {
        if (place == "wishlist") {
            target.querySelector("img").src = "../img/AddToWishlist.svg";
            target.innerHTML = target.querySelector("img").outerHTML + "Add to Wishlist";
            target.classList.remove("wishlisted");

            let onclickprop = target.getAttribute("onclick");
            onclickprop = onclickprop.replace("RemoveFromList", "AddtoList");

            target.setAttribute("onclick", onclickprop);

        } else {
            target.querySelector("img").src = "../img/AddtoCart.png";
            target.innerHTML = target.querySelector("img").outerHTML + "Add to cart";
            target.classList.remove("cartlisted");

            let onclickprop = target.getAttribute("onclick");
            onclickprop = onclickprop.replace("AddtoList", "RemoveFromList");

            target.setAttribute("onclick", onclickprop);

        }

    }
    let icon;
    if (place == "wishlist") {
        icon = document.querySelector(".wish.listicon");
    } else {
        icon = document.querySelector(".cart.listicon");
    }

    if (lists.length == 0) {
        icon.removeAttribute("data-count");
    } else {
        icon.setAttribute("data-count", lists.length);
    }
}