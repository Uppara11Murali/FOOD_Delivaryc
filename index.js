/* ================= CART STORAGE ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");


/* ================= CREATE CART PANEL ================= */

let cartPanel = document.createElement("div");

cartPanel.id = "cart-panel";

cartPanel.style.position = "fixed";
cartPanel.style.right = "0";
cartPanel.style.top = "70px";
cartPanel.style.width = "300px";
cartPanel.style.height = "400px";
cartPanel.style.background = "#0b0a0a";
cartPanel.style.color = "white";
cartPanel.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
cartPanel.style.padding = "15px";
cartPanel.style.display = "none";
cartPanel.style.overflowY = "auto";
cartPanel.style.zIndex = "1000";

cartPanel.innerHTML = `
<h3>🛒 Your Cart</h3>
<div id="cart-list"></div>
<hr>
<p id="cart-total"></p>

<button onclick="clearCart()" 
style="width:100%;padding:8px;background:red;color:white;border:none;margin-bottom:5px;cursor:pointer;">
Clear Cart
</button>

<button onclick="goToCheckout()" 
style="width:100%;padding:10px;background:#ff6b00;color:white;border:none;cursor:pointer;">
Checkout
</button>
`;

document.body.appendChild(cartPanel);


/* ================= MESSAGE BAR ================= */

let messageBar = document.createElement("div");

messageBar.style.position = "fixed";
messageBar.style.bottom = "20px";
messageBar.style.left = "50%";
messageBar.style.transform = "translateX(-50%)";
messageBar.style.background = "#28a745";
messageBar.style.color = "white";
messageBar.style.padding = "10px 20px";
messageBar.style.borderRadius = "5px";
messageBar.style.display = "none";
messageBar.style.zIndex = "2000";

document.body.appendChild(messageBar);

function showMessage(text){

messageBar.innerText = text;
messageBar.style.display = "block";

setTimeout(()=>{
messageBar.style.display="none";
},2000);

}


/* ================= ADD TO CART ================= */

let addButtons = document.querySelectorAll(".btn");

addButtons.forEach(button => {

button.addEventListener("click", function(){

let item = this.parentElement;

let name = item.querySelector("h3").innerText;
let price = parseInt(item.querySelector(".price").innerText.replace("₹",""));

let existing = cart.find(food => food.name === name);

if(existing){
existing.quantity += 1;
}else{
cart.push({
name: name,
price: price,
quantity: 1
});
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
renderCart();

showMessage(name + " added to cart 🛒");

});

});


/* ================= UPDATE CART COUNT ================= */

function updateCartCount(){

let total = 0;

cart.forEach(item => total += item.quantity);

if(cartCount){
cartCount.innerText = total;
}

}

updateCartCount();


/* ================= RENDER CART ================= */

function renderCart(){

let list = document.getElementById("cart-list");
let total = 0;

list.innerHTML = "";

if(cart.length === 0){
list.innerHTML = "<p>Your cart is empty 🛒</p>";
document.getElementById("cart-total").innerText = "Total: ₹0";
return;
}

cart.forEach((item,index) => {

let itemTotal = item.price * item.quantity;
total += itemTotal;

let div = document.createElement("div");

div.style.marginBottom = "10px";

div.innerHTML = `
<b>${item.name}</b><br>
Qty: ${item.quantity} × ₹${item.price}<br>
Item Total: ₹${itemTotal}

<button onclick="removeItem(${index})"
style="float:right;background:red;color:white;border:none;padding:3px 6px;cursor:pointer;">
❌
</button>
<hr>
`;

list.appendChild(div);

});

document.getElementById("cart-total").innerHTML =
"<strong>Total: ₹" + total + "</strong>";

}


/* ================= REMOVE ITEM ================= */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
renderCart();

showMessage("Item removed");

}


/* ================= CLEAR CART ================= */

function clearCart(){

cart = [];

localStorage.removeItem("cart");

updateCartCount();
renderCart();

showMessage("Cart cleared");

}


/* ================= SHOW / HIDE CART ================= */

function showCart(){

if(cartPanel.style.display === "none"){
renderCart();
cartPanel.style.display = "block";
}else{
cartPanel.style.display = "none";
}

}


/* ================= CHECKOUT ================= */

function goToCheckout(){

if(cart.length === 0){
showMessage("Your cart is empty");
return;
}

window.location.href = "../Contact/contact.html";

}


/* ================= MOBILE MENU ================= */

let hamburger = document.getElementById("hamburger");
let navLinks = document.querySelector(".nav-links");

if(hamburger){

hamburger.addEventListener("click", () => {
navLinks.classList.toggle("show");
});

}


/* ================= SEARCH FOOD ================= */

let searchInput = document.getElementById("search-input");

if(searchInput){

searchInput.addEventListener("keyup", function(){

let filter = searchInput.value.toLowerCase();
let items = document.querySelectorAll(".item");

items.forEach(item => {

let name = item.querySelector("h3").innerText.toLowerCase();

if(name.includes(filter)){
item.style.display = "block";
}else{
item.style.display = "none";
}

});

});

}

/* ================= CUSTOMER REVIEWS ================= */

let reviewForm = document.getElementById("reviewForm");
let reviewsContainer = document.getElementById("reviewsContainer");

/* Load saved reviews */
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];


/* Display Reviews */

function displayReviews(){

reviewsContainer.innerHTML = "";

reviews.forEach((review) => {

let li = document.createElement("li");

li.style.marginBottom = "10px";

li.innerHTML = `
<b>${review.name}</b> - ${"⭐".repeat(review.rating)} <br>
${review.comment}
<hr>
`;

reviewsContainer.appendChild(li);

});

}

displayReviews();


/* Add New Review */

if(reviewForm){

reviewForm.addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("name").value;
let rating = document.getElementById("rating").value;
let comment = document.getElementById("comment").value;

/* Save Review */

let review = {
name: name,
rating: rating,
comment: comment
};

reviews.push(review);

/* Save to localStorage */

localStorage.setItem("reviews", JSON.stringify(reviews));

/* Reset Form */

reviewForm.reset();

/* Show Reviews */

displayReviews();

});

}