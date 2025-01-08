/////////////////////// Checkout Modal ///////////////////////
const checkoutLink = document.querySelector(".checkout-link");
const ckechoutModal = document.querySelector(".checkout-modal-layout");
const closeProductBtn = document.querySelector(".close");

checkoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  ckechoutModal.classList.remove("hidden");
  checkoutModalContent.style = "display:block";
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

checkoutSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkoutModalContent.style = "display:none";
  orderConfirmed.classList.remove("hidden");
});

closeConfirm.addEventListener("click", () => {
  ckechoutModal.classList.add("hidden");
  orderConfirmed.classList.add("hidden");
});
