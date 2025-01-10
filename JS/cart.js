export let cartTable = document.querySelector(".cart-items");
export const emptyCart = document.querySelector(".empty");

export let itemCountElement = document.querySelector(".item-count");
export let itemCountFullElement = document.querySelector(".item-count-full");
export let itemsCostElement = document.querySelector(".items-cost");
export let totalCostElement = document.querySelector(".total-cost");
export const shippingSelect = document.getElementById("shipping-method");

export let itemCount = 0;
export let itemCountfull = 0;
export let itemsCost = 0;
export let totalCost = 0;

export function resetCartState() {
  itemCount = 0;
  itemCountfull = 0;
  itemsCost = 0;
  totalCost = 0;
}

function createCartItem(product) {
  const cartRow = document.createElement("tr");
  cartRow.className = "item";

  if (!product.quantity) {
    product.quantity = 1;
    sessionStorage.setItem(product.id, JSON.stringify(product));
  }

  const initialQuantity = product.quantity;

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
      <span class="item-quantity">${initialQuantity}</span>
      <button class="increase">+</button>
    </td>
    <td id="cartItemPrice">${product.price}$</td>
    <td class="product-total-price">${(initialQuantity * product.price).toFixed(
      2
    )}$</td>
  `;
  const quantityElement = cartRow.querySelector(".item-quantity");
  const totalPriceElement = cartRow.querySelector(".product-total-price");
  const decreaseButton = cartRow.querySelector(".decrease");
  const increaseButton = cartRow.querySelector(".increase");
  const checkoutLink = document.querySelector(".checkout-link");

  const updateSessionStorage = (quantity) => {
    product.quantity = quantity;
    sessionStorage.setItem(product.id, JSON.stringify(product));
  };

  cartRow.querySelector(".remove-item").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem(product.id);
    let quantity = parseInt(quantityElement.textContent);
    cartRow.remove();
    itemCount--;
    itemCountfull -= quantity;
    itemsCost -= product.price * quantity;
    itemCountElement.textContent = `${itemCount} `;
    itemCountFullElement.textContent = `${itemCountfull}`;
    itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
    updateTotalCost();
    emptyCart.style.display = itemCount > 0 ? "none" : "block";
    checkoutLink.disabled = itemCount === 0;
  });

  decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity -= 1;
      quantityElement.textContent = quantity;
      totalPriceElement.textContent = `${(quantity * product.price).toFixed(
        2
      )}$`;
      itemCountfull--;
      itemsCost -= product.price;
      itemCountFullElement.textContent = `${itemCountfull}`;
      itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
      updateSessionStorage(quantity);
      updateTotalCost();
      emptyCart.style.display = itemCount > 0 ? "none" : "block";
    }
  });

  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
    totalPriceElement.textContent = `${(quantity * product.price).toFixed(2)}$`;
    itemCountfull++;
    itemsCost += product.price;
    itemCountFullElement.textContent = `${itemCountfull}`;
    itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
    updateSessionStorage(quantity);
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

shippingSelect.addEventListener("change", () => {
  const selectedOption = shippingSelect.value;
  sessionStorage.setItem("selectedShippingMethod", selectedOption);
  updateTotalCost();
});

function loadShippingMethod() {
  const savedShippingMethod = sessionStorage.getItem("selectedShippingMethod");
  if (savedShippingMethod) {
    shippingSelect.value = savedShippingMethod;
    updateTotalCost();
  }
}

loadShippingMethod();

export function loadCartItems() {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);

    if (!isNaN(key)) {
      const productData = JSON.parse(sessionStorage.getItem(key));
      createCartItem(productData);

      const quantity = productData.quantity || 1;
      itemCount++;
      itemCountfull += quantity;
      itemsCost += productData.price * quantity;
      itemCountElement.textContent = `${itemCount} `;
      itemCountFullElement.textContent = `${itemCountfull}`;
      itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
      updateTotalCost();
    }
    emptyCart.style.display = itemCount > 0 ? "none" : "block";
  }
}

loadCartItems();
