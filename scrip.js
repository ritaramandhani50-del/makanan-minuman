// ================= ORDER LANGSUNG WA =================
function orderWA(name, price){
  let text = "Halo saya ingin pesan " + name + " - Rp " + price;
  let url = "https://wa.me/6281299892704?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}


// ================= SLIDER =================
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(){
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  index++;
  if(index >= slides.length){
    index = 0;
  }

  slides[index].classList.add("active");
}

setInterval(showSlide, 3000);


// ================= SCROLL ANIMATION =================
function revealOnScroll(){
  let reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    let windowHeight = window.innerHeight;
    let elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 100){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ================= FORM WA =================
function sendToWA(event){
  event.preventDefault();

  let nama = document.getElementById("nama").value;
  let pesan = document.getElementById("pesan").value;

  let nomor = "6281299892704";

  let text = `Halo, saya ${nama}. Pesan saya adalah ${pesan}`;
  let url = `https://wa.me/${nomor}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
  showToast("Pesan berhasil dikirim ✅");
}


// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// TAMBAH KE CART (PAKAI QTY)
function addToCart(name, price){
  let found = cart.find(item => item.name === name);

  if(found){
    found.qty += 1;
  } else {
    cart.push({name, price, qty: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(name + " ditambahkan ke keranjang 🛒");
}


// ================= LOAD CART =================
function loadCart(){
  let list = document.getElementById("cart-items");
  let total = 0;

  if(!list) return;

  list.innerHTML = "";

  cart.forEach((item, index) => {

    let div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="item-info">
        ${item.name} <br>
        Rp ${item.price}
      </div>

      <div class="qty-control">
        <button onclick="decreaseQty(${index})">➖</button>
        ${item.qty}
        <button onclick="increaseQty(${index})">➕</button>
      </div>

      <div>
        <button onclick="removeItem(${index})">Hapus</button>
      </div>
    `;

    list.appendChild(div);

    total += item.price * item.qty;
  });

  document.getElementById("total").innerText = "Total: Rp " + total;
}


// ================= QTY CONTROL =================
function increaseQty(index){
  cart[index].qty += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index){
  if(cart[index].qty > 1){
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}


// ================= HAPUS =================
function removeItem(index){
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}


// ================= CHECKOUT WA =================
function checkoutWA(){
  let nomor = "6281299892704";

  let text = "Halo saya dengan atas nama (...) saya ingin pesan:%0A";

  cart.forEach(item => {
    text += `- ${item.name} x${item.qty} (Rp ${item.price * item.qty})%0A`;
  });

  let url = `https://wa.me/${nomor}?text=${text}`;
  window.open(url, "_blank");
}


// ================= NOTIF =================
function showToast(text){
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = text;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}


// ================= AUTO LOAD =================
window.onload = function(){
  loadCart();
};