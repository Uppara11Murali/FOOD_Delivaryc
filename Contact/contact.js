/* ================= LOAD CART ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cart-items");
let totalPrice = document.getElementById("total-price");

renderCart();



/* ================= RENDER CART ================= */

function renderCart(){

cartItems.innerHTML = "";

let total = 0;

if(cart.length === 0){

cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";

totalPrice.innerHTML = "<strong>Total:</strong> ₹0";

return;

}

cart.forEach((item,index)=>{

let itemTotal = item.price * item.quantity;

total += itemTotal;

let div = document.createElement("div");

div.classList.add("cart-item");

div.innerHTML = `
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">

<div>
<strong>${item.name}</strong><br>
<small>₹${item.price} × ${item.quantity}</small>
</div>

<div>₹${itemTotal}</div>

<button onclick="removeItem(${index})"
style="background:white;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">
❌
</button>

</div>
`;

cartItems.appendChild(div);

});

totalPrice.innerHTML = "<strong>Total:</strong> ₹" + total;

localStorage.setItem("cart", JSON.stringify(cart));

}



/* ================= REMOVE ITEM ================= */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

renderCart();

}



/* ================= GENERATE PDF ================= */

function generatePDF(name,phone,email,address,payment,cart,total){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let y = 20;

doc.setFontSize(18);
doc.text("Sandhya Food Kitchen",20,y);

y+=10;
doc.setFontSize(12);
doc.text("Order Invoice",20,y);

y+=10;
doc.text(`Customer: ${name}`,20,y);

y+=8;
doc.text(`Phone: ${phone}`,20,y);

y+=8;
doc.text(`Email: ${email}`,20,y);

y+=8;
doc.text(`Address: ${address}`,20,y);

y+=12;
doc.text("Order Details:",20,y);

y+=8;

cart.forEach(item=>{

let itemTotal = item.price * item.quantity;

doc.text(`${item.name} (₹${item.price} x ${item.quantity}) = ₹${itemTotal}`,20,y);

y+=8;

});

y+=6;

doc.text(`Grand Total: ₹${total}`,20,y);

y+=10;

doc.text(`Payment Method: ${payment}`,20,y);

doc.save("Food_Order_Invoice.pdf");

}



/* ================= ORDER FORM ================= */

let form = document.getElementById("order-form");

form.addEventListener("submit",function(e){

e.preventDefault();

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let address = document.getElementById("address").value;
let payment = document.getElementById("payment").value;



/* ================= BUILD ORDER ================= */

let orderList = "";
let total = 0;

cart.forEach(item=>{

let itemTotal = item.price * item.quantity;

total += itemTotal;

orderList += `${item.name} (₹${item.price} × ${item.quantity}) = ₹${itemTotal}\n`;

});


/* ================= GENERATE PDF ================= */

generatePDF(name,phone,email,address,payment,cart,total);



/* ================= UPI PAYMENT ================= */

if(payment === "upi"){

let upiID = "9951554072@ybI";   // CHANGE UPI ID

let merchant = "Sandhya Food Kitchen";

let ref = "ORD"+Date.now();

let upiURL =
`upi://pay?pa=${encodeURIComponent(upiID)}&pn=${encodeURIComponent(merchant)}&tr=${ref}&am=${total.toFixed(2)}&cu=INR`;

window.location.href = upiURL;

return;

}



/* ================= WHATSAPP ORDER ================= */

let whatsappNumber = "9951554072";   // CHANGE NUMBER

let message = `🍽️ NEW ORDER

Name: ${name}
Phone: ${phone}
Email: ${email}

Order:
${orderList}

Grand Total: ₹${total}

Address:
${address}

Payment: ${payment}
`;

let whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

window.open(whatsappURL,"_blank");



/* ================= CLEAR CART ================= */

localStorage.removeItem("cart");

cart = [];

renderCart();

});