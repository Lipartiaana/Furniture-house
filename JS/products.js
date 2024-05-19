import { getProductList } from "./script.js";
import { createProduct } from "./script.js";

const featuresSidebarBtn = document.getElementById("sidebar-features-btn");
const allSidebarBtn = document.getElementById("sidebar-all-btn");
const productsContainer = document.querySelector(".products-container-wrapper");

async function showProducts() {
  try {
    const productList = await getProductList();

    productList.forEach((product) => {
      const productHTML = createProduct(product);
      productsContainer.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showProducts();
});
