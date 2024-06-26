// function to modify the quantity of the items in the cart
function QuantityModifer(target, type) {
    let quantity = target.closest(".item-quantity").querySelector("label");
    let quantityValue = parseInt(quantity.innerText);

    if (type == "increment") {
        quantityValue++;
    } else {
        if (quantityValue > 1) {
            quantityValue--;
        }
    }

    let id = target.closest(".item").getAttribute("data-id");
    let lists = JSON.parse(localStorage.getItem("cartlist"));

    lists = lists.filter((item) => {
        if (item.id == id) {
            item.quantity = quantityValue;
            console.log(item);
        }
        return item;
    });

    console.log(lists);
    localStorage.setItem("cartlist", JSON.stringify(lists));
    quantity.innerText = quantityValue;
}

// function to set the price and total items in the cart
function setCartDetails(totalprice) {
    let discount = 2.6;

    let discountedprice = parseFloat(totalprice - ((totalprice * discount) / 100)).toFixed(2);

    document.querySelector("#cart-subtotal").innerText = "$"+totalprice;
    console.log(totalprice);
    document.querySelector("#discountedprice").innerText = "$"+discountedprice;

    document.querySelector("#total-amount").innerText = "$"+discountedprice;
}

