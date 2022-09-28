// update counter
const plusEl = document.querySelector(".plus");
const minusEl = document.querySelector(".minus");
const counter = document.querySelector(".counter");
let num = parseInt(counter.textContent);

function increaseCounter() {
	num++;
	counter.innerText = num.toString();
}

function decreaseCounter() {
	if (num > 1) {
		num--;
		counter.innerText = num.toString();
	}
}

plusEl.addEventListener("click", () => increaseCounter());
minusEl.addEventListener("click", () => decreaseCounter());

//click avatar, cart icon or add button pop out cart page
const addToCartEl = document.querySelector(".add-button");
const avatarEl = document.querySelector(".avatar");
const cartIconEl = document.querySelector(".cart-icon");
const cartEl = document.querySelector(".cart");
const numberEl = document.querySelector(".number");
const totalEl = document.querySelector(".total");
const priceEl = document.querySelector(".current-price");

addToCartEl.addEventListener("click", () => triggerCart());
avatarEl.addEventListener("click", () => triggerCart());
cartIconEl.addEventListener("click", () => triggerCart());

function triggerCart() {
    const priceStr = priceEl.innerText.substring(1);
    const price = parseFloat(priceStr);
    numberEl.innerText = '$' + priceStr + ' x ' + num.toString()
    totalEl.innerText = '$' + (price*num).toString();
	if (cartEl.style.display === "none") {
		cartEl.style.display = "block";
	}
    else {
        cartEl.style.display = "none";
    }
}
