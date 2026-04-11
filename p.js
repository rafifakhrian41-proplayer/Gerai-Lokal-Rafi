let cart = [];

function addToCart(nama, harga){
  let existing = cart.find(item => item.nama === nama);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({nama, harga, qty:1});
  }
  updateCart();
}

function updateCart(){
  let list = document.getElementById("cart-items");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.harga * item.qty;

    list.innerHTML += `
      <li class="flex justify-between items-center my-2">
        <div>
          <strong>${item.nama}</strong> - Rp ${item.harga}
        </div>
        <div class="flex items-center space-x-2">
          <input type="number" min="1" value="${item.qty}" onchange="setQty(${index}, this.value)" class="w-12 text-center border rounded"/>
          <button onclick="removeItem(${index})" class="bg-red-500 px-2 rounded text-white">×</button>
        </div>
      </li>
    `;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("cart-count").innerText = cart.reduce((a,b) => a + b.qty, 0);
}

function setQty(index, qty){
  qty = parseInt(qty);
  if(qty < 1) qty = 1;
  cart[index].qty = qty;
  updateCart();
}

function removeItem(index){
  cart.splice(index, 1);
  updateCart();
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("hidden");
}

function checkoutWA(){
  let noWA = "6281234567890";
  let text = "Halo, saya ingin memesan:%0A";

  cart.forEach(item => {
    text += `${item.nama} - Rp ${item.harga} x ${item.qty}%0A`;
  });

  window.open(`https://wa.me/${noWA}?text=${text}`);
}