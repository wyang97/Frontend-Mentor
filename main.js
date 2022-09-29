// update counter
const plusEl = document.querySelector(".plus");
const minusEl = document.querySelector(".minus");
const counter = document.querySelector(".counter");
getCartCounter();

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

//cart part
const addToCartEl = document.querySelector(".add-button");
const avatarEl = document.querySelector(".avatar");
const cartIconEl = document.querySelector(".cart-icon");
const cartEl = document.querySelector(".cart");
const numberEl = document.querySelector(".number");
const totalEl = document.querySelector(".total");
const priceEl = document.querySelector(".current-price");
const deleteBtn = document.querySelector(".delete");
const emptyCartNotice = document.querySelector(".empty-cart-notice");
const cartInfoEl = document.querySelector(".cartItem");
const checkoutBtn = document.querySelector(".checkout-btn");

window.addEventListener(
	"click",
	function (e) {
		if (cartEl.contains(e.target)) {
			return;
		} else {
			if (cartEl.style.display === "block") {
				cartEl.style.display = "none";
			}
		}
	},
	true
);
addToCartEl.addEventListener("click", () => addToCart());
avatarEl.addEventListener("click", () => triggerCart());
cartIconEl.addEventListener("click", () => triggerCart());
deleteBtn.addEventListener("click", () => emptyCart());

function emptyCart() {
	cartInfoEl.style.display = "none";
	document.querySelector(".empty-cart-notice").style.display = "block";
	checkoutBtn.style.display = "none";
	localStorage.setItem("counter", 0);
}

function getCartCounter() {
	let localStorageNum = 0;
	if (localStorage.getItem("counter")) {
		localStorageNum = parseInt(localStorage.getItem("counter"));
	} else {
		localStorage.setItem("counter", 0);
	}
	return localStorageNum;
}

function addToCart() {
	emptyCartNotice.style.display = "none";
	const localNum = getCartCounter();
	const priceStr = priceEl.innerText.substring(1);
	const price = parseFloat(priceStr);
	numberEl.innerText = "$" + priceStr + " x " + (num + localNum).toString();
	totalEl.innerText = "$" + (price * (num + localNum)).toString();
	cartEl.style.display = "block";
	checkoutBtn.style.display = "block";
	cartInfoEl.style.display = "flex";
	localStorage.setItem("counter", localNum + num);
}

function triggerCart() {
	const localNum = getCartCounter();
	if (localNum < 1) {
		cartInfoEl.style.display = "none";
		emptyCartNotice.style.display = "block";
	}
	const priceStr = priceEl.innerText.substring(1);
	const price = parseFloat(priceStr);
	numberEl.innerText = "$" + priceStr + " x " + localNum.toString();
	totalEl.innerText = "$" + (price * localNum).toString();
	cartEl.style.display === "block"
		? (cartEl.style.display = "none")
		: (cartEl.style.display = "block");
}

// change image gallery
const galleryEl = document.querySelector(".gallery");
const mainImgEl = document.querySelector(".main-img");
const thumbnailsContainerEl = document.querySelector(".thumbnails");
const thumbnailsEl = document.querySelectorAll(".thumbnail-img");

const mainImgs = [
	"./images/image-product-1.jpg",
	"./images/image-product-2.jpg",
	"./images/image-product-3.jpg",
	"./images/image-product-4.jpg",
];

const thumbImgs = [
	"./images/image-product-1-thumbnail.jpg",
	"./images/image-product-2-thumbnail.jpg",
	"./images/image-product-3-thumbnail.jpg",
	"./images/image-product-4-thumbnail.jpg",
];

for (let i = 0; i < thumbnailsEl.length; i++) {
	thumbnailsEl[i].addEventListener("click", (e) => {
		for (let thumbnail of thumbnailsEl) {
			thumbnail.classList.remove("selected");
		}
		mainImgEl.src = mainImgs[i];
		thumbnailsEl[i].classList.add("selected");
	});
}

// floating gallery
const airGalleryEl = document.querySelector(".air");
const shadowEl = document.querySelector(".shadow");
const closeGalleryEl = document.querySelector(".air .close");
const airThumbnailsEl = document.querySelectorAll(".air .thumbnail-img");
const airMainImgEl = document.querySelector(".air .main-img");
var globalMainImgSrc = "";

mainImgEl.addEventListener("click", (e) => {
	airGalleryEl.style.display = "block";
	shadowEl.style.display = "block";
	airMainImgEl.src = mainImgEl.src;
	globalMainImgSrc = mainImgEl.src;

	const selectedThumbEl = document.querySelector(".selected");
	const selectedSrc = selectedThumbEl.src;
	for (let thumbnail of airThumbnailsEl) {
		if (thumbnail.src === selectedSrc) {
			thumbnail.classList.add("selected");
		}
	}
});

closeGalleryEl.addEventListener("click", () => {
	airGalleryEl.style.display = "none";
	shadowEl.style.display = "none";
});

for (let i = 0; i < airThumbnailsEl.length; i++) {
	airThumbnailsEl[i].addEventListener("click", (e) => {
		for (let thumbnail of airThumbnailsEl) {
			thumbnail.classList.remove("selected");
		}
		airMainImgEl.src = mainImgs[i];
		mainImgEl.src = globalMainImgSrc;
		airThumbnailsEl[i].classList.add("selected");
	});
}

// next, prev image in air gallery
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

function getImageIndex(image) {
	const replaced = image.replace(/\D/g, "");
	return parseInt(replaced.charAt(replaced.length - 1));
}

nextBtn.addEventListener("click", () => {
	let nextIndex = 0;
	const currentIndex = getImageIndex(
		document.querySelector(".air .main-img").src
	);
	if (currentIndex >= 4) {
		nextIndex = 1;
	} else {
		nextIndex = currentIndex + 1;
	}
	airMainImgEl.src = mainImgs[nextIndex - 1];
});

prevBtn.addEventListener("click", () => {
	let prevIndex = 0;
	const currentIndex = getImageIndex(
		document.querySelector(".air .main-img").src
	);
	if (currentIndex <= 1) {
		prevIndex = 4;
	} else {
		prevIndex = currentIndex - 1;
	}
	airMainImgEl.src = mainImgs[prevIndex - 1]
});
