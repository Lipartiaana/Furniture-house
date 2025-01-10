import {
  itemCountfull,
  itemsCost,
  shippingSelect,
  totalCost,
  cartTable,
  emptyCart,
  itemCount,
  itemCountElement,
  itemCountFullElement,
  itemsCostElement,
  totalCostElement,
  resetCartState,
} from "./cart.js";

/////////////////////// Checkout Modal ///////////////////////
const checkoutLink = document.querySelector(".checkout-link");
const ckechoutModal = document.querySelector(".checkout-modal-layout");
const closeProductBtn = document.querySelector(".close");
const checkoutItemCountElement = document.getElementById("checkoutItemCount");
const checkoutItemsPriceElement = document.getElementById("checkoutItemsPrice");
const checkoutShippingPriceElement = document.getElementById(
  "checkoutShippingPrice"
);
const checkoutTotalPriceElement = document.getElementById("CheckoutTotalPrice");

function updateCheckoutButtonState() {
  checkoutLink.disabled = itemCountfull === 0;
}

updateCheckoutButtonState();

function fillCheckout() {
  const checkoutSelectedOption =
    shippingSelect.options[shippingSelect.selectedIndex];
  const checkoutShippingCost = parseFloat(checkoutSelectedOption.value);
  checkoutItemCountElement.textContent = `Total items (${itemCountfull})`;
  checkoutItemsPriceElement.textContent = `${itemsCost.toFixed(2)}$`;
  checkoutShippingPriceElement.textContent = `${checkoutShippingCost}.00$`;
  checkoutTotalPriceElement.textContent = `${totalCost.toFixed(2)}$`;
}

checkoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  ckechoutModal.classList.remove("hidden");
  checkoutModalContent.style = "display:block";
  fillCheckout();
});

closeProductBtn.addEventListener("click", () => {
  ckechoutModal.classList.add("hidden");
});

/////////////////////// Checkout Form ///////////////////////
const yearDropdown = document.getElementById("year-dropdown");
const startYear = 2024; // Starting year
const endYear = 2040; // Ending year
const monthDropdown = document.getElementById("month-dropdown");

for (let year = startYear; year <= endYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearDropdown.appendChild(option);
}

for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  option.value = i.toString().padStart(2, "0");
  option.textContent = option.value;
  monthDropdown.appendChild(option);
}

/////////////////////// Order Confirm Modal ///////////////////////
const checkoutSubmitBtn = document.querySelector(".checkout-submit");
const checkoutModalContent = document.querySelector(".checkout-modal");
const orderConfirmed = document.querySelector(".order-confirmed");
const closeConfirm = document.querySelector(".close-confirm");
const checkoutForm = document.querySelector(".checkout-form");

checkoutSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkoutForm.checkValidity()) {
    checkoutModalContent.style = "display:none";
    orderConfirmed.classList.remove("hidden");
  } else {
    checkoutForm.reportValidity();
  }
});

closeConfirm.addEventListener("click", () => {
  ckechoutModal.classList.add("hidden");
  orderConfirmed.classList.add("hidden");
  sessionStorage.clear();

  cartTable.innerHTML = "";
  emptyCart.style.display = "block";

  resetCartState();

  itemCountElement.textContent = `${itemCount}`;
  itemCountFullElement.textContent = `${itemCountfull}`;
  itemsCostElement.textContent = `${itemsCost.toFixed(2)}$`;
  totalCostElement.textContent = `${totalCost.toFixed(2)}$`;

  shippingSelect.selectedIndex = 0;

  updateCheckoutButtonState();
});
