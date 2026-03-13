/* ================= CART STORAGE ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");


/* ================= CART PANEL ================= */

let cartPanel = document.createElement("div");

cartPanel.id = "cart-panel";

cartPanel.style.position = "fixed";
cartPanel.style.right = "0";
cartPanel.style.top = "70px";
cartPanel.style.width = "320px";
cartPanel.style.height = "450px";
cartPanel.style.background = "#111";
cartPanel.style.color = "#fff";
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


/* ================= ADD TO CART ================= */

let offerButtons = document.querySelectorAll(".offer-btn");

offerButtons.forEach(button => {

button.addEventListener("click", function(){

let item = this.parentElement;

let name = item.dataset.name;
let price = parseInt(item.dataset.price);

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

});

});


/* ================= UPDATE COUNT ================= */

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
${item.name}<br>
Qty: ${item.quantity} × ₹${item.price}<br>
Item Total: ₹${itemTotal}

<button onclick="removeItem(${index})"
style="float:right;background:white;color:white;border:none;padding:3px 6px;cursor:pointer;">
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

}


/* ================= CLEAR CART ================= */

function clearCart(){

cart = [];

localStorage.removeItem("cart");

updateCartCount();
renderCart();

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
alert("Your cart is empty!");
return;
}

localStorage.setItem("cart", JSON.stringify(cart));

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