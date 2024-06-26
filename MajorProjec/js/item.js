
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

// function to get products from the API
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

// function to set products in the page and popup in item format
function setProducts(products, forPopup = false) {

    let productsCont = document.querySelector('.item-container');

    let totalProducts = products.products.length;
    let totalprice = 0;
    if (pagename == "cartlist") {
        if (totalProducts == 0) {
            productsCont.innerHTML = `<div class="no-products">No products found</div>`;
            return;
        } else {
            productsCont.innerHTML = '';
            document.querySelector(".total-items span").innerHTML = totalProducts + " items";
        }
    }

    let wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
    let cartlist = JSON.parse(window.localStorage.getItem("cartlist"));

    if (forPopup) {
        productsCont = document.querySelector('.popup .popup-body');
    }

    let ProductsFragment = document.createDocumentFragment();

    // iterate through the products and create the product element
    products.products.forEach(product => {
        let imagesElement = ``;
        let reviewElement = ``;
        let isWishlisted = false;
        let isCartlisted = false;

        // iterate through the images of the product and create the image element
        product.images.forEach((image) => {
            imagesElement += `<div><img src="${image}" alt="${product.title}"></div>`;
        });

        // iterate through the reviews of the product and create the review element if the setting function is called for the popup
        if (forPopup == true) {
            reviewElement = `<div class="reviews">
                                <h2>Reviews</h2>
                                <hr/>`;
            product.reviews.forEach(review => {
                reviewElement += `<div class="review">
                                     <h3><a href="mailto:${review.reviewerEmail}">${review.reviewerName}</a></h3>
                                    <div class="reviewer-info">
                                        <div class="item-rating">
                                            <span class="star"><img src="./img/star.svg" alt=""></span>
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

        // create the product element
        let productElement = document.createElement('div');
        productElement.classList.add("item");
        productElement.setAttribute("data-title", product.title);
        productElement.setAttribute("data-id", product.id);

        // check if the product is already in the wishlis
        if (wishlist.find(item => item.id == product.id)) {
            isWishlisted = true;
        }

        // check if the product is already in the cartlist
        if (cartlist.find(item => item.id == product.id)) {
            isCartlisted = true;
        }

        let Discountedprice = parseFloat(product.price - ((product.price * product.discountPercentage) / 100)).toFixed(2);

        let TotalPriceWithQuantity = Discountedprice * (getItemByIdFromLocalStorage(product.id, "cartlist")?.quantity || 1);

        // set the innerHTML of the product element
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
                                                    <span>$${Discountedprice}</span>
                                                </div>
                                                <div class="item-original-price">
                                                    <span>$${product.price}</span>
                                                </div>
                                            </div>
                                            <div class="item-rating">
                                                <span class="star"><img src="./img/star.svg" alt=""></span>
                                                <span class="rate">${product.rating}</span>
                                            </div>
                                            
                                            ${pagename == "cartlist"
                ?
                `<div class="item-quantity">
                                                        <span>Quantity</span>
                                                        <button  onclick="QuantityModifer(this,'decrement')">-</button>
                                                        <label>${getItemByIdFromLocalStorage(product.id, "cartlist").quantity || "1"}</label>
                                                        <button onclick="QuantityModifer(this,'increment')">+</button>                                                    
                                                    </div>`
                :
                ""
            }

                                            <div class="item-btns">
                                                <div class="addwishlist">
                                                    <button ${isWishlisted ? 'class="wishlisted"' : ''} onclick='${isWishlisted ? "RemoveFromList(event,this, `wishlist`," + product.id + ")" : 'AddtoList(event,this, "wishlist")'}'><img src="${isWishlisted ? './img/WishListed.png' : './img/AddToWishlist.svg'}" alt="">${isWishlisted ? 'Wished' : 'Add to Wishlist'}</button>
                                                </div>
                                                <div class="addcart">
                                                    <button ${isCartlisted ? 'class="cartlisted"' : ''} onclick='${isCartlisted ? "RemoveFromList(event,this, `cartlist`," + product.id + ")" : 'AddtoList(event,this, "cartlist")'}'><img src="${isCartlisted ? './img/Carted.png' : './img/Cart.svg'}" alt="">${isCartlisted ? 'Carted' : 'Add to cart'}</button>
                                                </div>
                                            </div>
                                            ${forPopup == true ? reviewElement : ""}
                                        </div>`;


        productElement.querySelector(".image-container div:first-child").classList.add("visible-img");
        if (pagename == "home") {
            productElement.addEventListener('dblclick', viewProduct);
        }

        ProductsFragment.appendChild(productElement);
        imagesElement = null;
        reviewElement = null;

        totalprice += TotalPriceWithQuantity
    });

    productsCont.innerHTML = '';

    if (pagename == "cartlist") {
        setCartDetails(parseFloat(totalprice).toFixed(2));
    }

    productsCont.appendChild(ProductsFragment);
    if (forPopup == true)
        productsCont.closest(".popup-container").classList.add("active-popup");
}

// function to view the product in the popup
async function viewProduct(e) {
    let product = e.target.closest(".item");

    let res = await fetch("https://dummyjson.com/products/search?q=" + product.dataset.title);
    let productData = await res.json();

    setProducts(productData, true);

}

//function to change images if multiple images are present in the product
function imageSlide(direction, target) {

    let currImage = target.closest(".image-container").querySelector("div.visible-img");
    let ResultElement = (direction == "prev" ? currImage.previousElementSibling : currImage.nextElementSibling);

    console.log(ResultElement);

    if (ResultElement instanceof HTMLElement && ResultElement.tagName == "DIV") {
        currImage.classList.remove("visible-img");
        ResultElement.classList.add("visible-img")
    }

}

// function to add the product to the wishlist or cartlist
function AddtoList(e, target, place) {
    e.stopPropagation();
    let item = target.closest(".item");
    let lists = JSON.parse(window.localStorage.getItem(place));
    let newItem = {
        id: item.dataset.id,
        title: item.dataset.title
    }

    lists.push(newItem);

    window.localStorage.setItem(place, JSON.stringify(lists));

    if (place == "wishlist") {
        target.querySelector("img").src = "./img/WishListed.png";
        target.innerHTML = target.querySelector("img").outerHTML + "Wished";
        target.classList.add("wishlisted");

        let onclickprop = target.getAttribute("onclick");
        onclickprop = onclickprop.replace("RemoveFromList", "AddtoList");

        target.setAttribute("onclick", onclickprop);

        document.querySelector(".wish.listicon").setAttribute("data-count", lists.length);
    } else {
        target.querySelector("img").src = "./img/Carted.png";
        target.innerHTML = target.querySelector("img").outerHTML + "Carted";
        target.classList.add("cartlisted");

        let onclickprop = target.getAttribute("onclick");
        onclickprop = onclickprop.replace("AddtoList", "RemoveFromList");

        target.setAttribute("onclick", onclickprop);

        document.querySelector(".cart.listicon").setAttribute("data-count", lists.length);
    }

}


// function to remove the product from the wishlist or cartlist
function RemoveFromList(e, target, place, id) {
    e.stopPropagation();

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
            target.querySelector("img").src = "./img/AddToWishlist.svg";
            target.innerHTML = target.querySelector("img").outerHTML + "Add to Wishlist";
            target.classList.remove("wishlisted");

            let onclickprop = target.getAttribute("onclick");
            onclickprop = onclickprop.replace("RemoveFromList", "AddtoList");

            target.setAttribute("onclick", onclickprop);

        } else {
            target.querySelector("img").src = "./img/AddtoCart.png";
            target.innerHTML = target.querySelector("img").outerHTML + "Add to cart";
            target.classList.remove("cartlisted");

            let onclickprop = target.getAttribute("onclick");
            onclickprop = onclickprop.replace("RemoveFromList", "AddtoList");

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

function getItemByIdFromLocalStorage(id, place) {
    let lists = JSON.parse(window.localStorage.getItem(place));

    return lists.find(item => item.id == id);
}