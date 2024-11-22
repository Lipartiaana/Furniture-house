import { getProductList } from "./script.js";
import { createProduct } from "./script.js";

const closeProductBtn = document.querySelector(".close");
const productModal = document.querySelector(".product-modal-layout");
const productContainer = document.querySelector(".products-container-wrapper");

closeProductBtn.addEventListener("click", () => {
  productModal.classList.add("hidden");
});

async function createProductLinks() {
  const productList = await getProductList("all");

  productList.forEach((product) => {
    const productLink = document.createElement("a");
    productLink.className = "product-link";
    productLink.href = "#";

    productLink.dataset.product = JSON.stringify(product);
    productLink.innerHTML = createProduct(product);
    productContainer.appendChild(productLink);

    productLink.addEventListener("click", (event) => {
      event.preventDefault();

      const productData = JSON.parse(productLink.dataset.product);

      document.getElementById("productImage").src = `.${productData.image}`;
      document.getElementById("productName").textContent = productData.name;
      document.getElementById("productDescription").textContent =
        productData.description;
      document.getElementById(
        "productPrice"
      ).textContent = `Price: $${productData.price}`;
      document.getElementById(
        "productColor"
      ).textContent = `Color: ${productData.color}`;
      document.getElementById(
        "productSize"
      ).textContent = `Size: ${productData.size}`;
      document.getElementById(
        "productRoomType"
      ).textContent = `Room Type: ${productData.category}`;

      productModal.classList.remove("hidden");
    });
  });
}

createProductLinks();
