const cartTable = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty");

let itemCountElement = document.querySelector(".item-count");
let itemCountFullElement = document.querySelector(".item-count-full");
let itemsCostElement = document.querySelector(".items-cost");
let totalCostElement = document.querySelector(".total-cost");
const shippingSelect = document.getElementById("shipping-method");

let itemCount = 0;
let itemcountfull = 0;
let itemsCost = 0;
let totalCost = 0;

function createCartItem(product) {
  const cartRow = document.createElement("tr");
  cartRow.className = "item";

  cartRow.innerHTML = `
    <td class="item-details">
      <img
        id="cartItemImg"
        src=".${product.image}"
      />
      <div class="item-details-text">
        <h5 id="cartItemTitle">${product.name}</h5>
        <p id="cartItemColor">Color: ${product.color}</p>
        <a class="remove-item" href="#">Remove</a>
      </div>
    </td>
    <td>
      <button class="decrease">-</button> 
      <span class="item-quantity">1</span>
      <button class="increase">+</button>
    </td>
    <td id="cartItemPrice">${product.price}$</td>
    <td class="product-total-price">${product.price}$</td>
  `;
  const quantityElement = cartRow.querySelector(".item-quantity");
  const totalPriceElement = cartRow.querySelector(".product-total-price");
  const decreaseButton = cartRow.querySelector(".decrease");
  const increaseButton = cartRow.querySelector(".increase");

  cartRow.querySelector(".remove-item").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem(product.id);
    let quantity = parseInt(quantityElement.textContent);
    cartRow.remove();
    itemCount--;
    itemcountfull -= quantity;
    itemsCost -= product.price * quantity;
    itemCountElement.textContent = `${itemCount} `;
    itemCountFullElement.textContent = `${itemcountfull}`;
    itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
    updateTotalCost();
    emptyCart.style.display = itemCount > 0 ? "none" : "block";
  });

  decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity -= 1;
      quantityElement.textContent = quantity;
      totalPriceElement.textContent = `${(quantity * product.price).toFixed(
        2
      )}$`;
      itemcountfull--;
      itemsCost -= product.price;
      itemCountFullElement.textContent = `${itemcountfull}`;
      itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
      updateTotalCost();
      emptyCart.style.display = itemCount > 0 ? "none" : "block";
    }
  });

  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
    totalPriceElement.textContent = `${(quantity * product.price).toFixed(2)}$`;
    itemcountfull++;
    itemsCost += product.price;
    itemCountFullElement.textContent = `${itemcountfull}`;
    itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
    updateTotalCost();
    emptyCart.style.display = itemCount > 0 ? "none" : "block";
  });

  cartTable.appendChild(cartRow);
}

function updateTotalCost() {
  const selectedOption = shippingSelect.options[shippingSelect.selectedIndex];
  const shippingCost = parseFloat(selectedOption.value);
  totalCost = itemsCost + shippingCost;
  totalCostElement.textContent = `${totalCost.toFixed(2)}$`;
}

shippingSelect.addEventListener("change", updateTotalCost);

function loadCartItems() {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);

    if (!isNaN(key)) {
      const productData = JSON.parse(sessionStorage.getItem(key));
      createCartItem(productData);
      itemCount++;
      itemcountfull = itemCount;
      itemsCost += productData.price;
      itemCountElement.textContent = `${itemCount} `;
      itemCountFullElement.textContent = `${itemcountfull}`;
      itemsCostElement.textContent = `${itemsCost}$`;
      updateTotalCost();
    }
    emptyCart.style.display = itemCount > 0 ? "none" : "block";
  }
}

loadCartItems();
