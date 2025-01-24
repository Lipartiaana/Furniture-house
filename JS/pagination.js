import { getProductList } from "./script.js";
import { createProductLinks } from "./products.js";

const itemsPerPage = 6; // Number of products per page
export let currentPage = 1;
export let totalItems = 0;
export let totalPages = 0;
let currentCategory;

window.addEventListener("popstate", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "all";
  const page = parseInt(urlParams.get("page")) || 1;

  currentCategory = category;
  currentPage = page;

  await initializeProducts(currentCategory);
});

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "all";
  const page = parseInt(urlParams.get("page")) || 1;

  currentCategory = category;
  currentPage = page;

  await initializeProducts(currentCategory);
});

const productsContainerWrapper = document.querySelector(
  ".products-container-wrapper"
);
const paginationElement = document.querySelector(".pagination");

async function initializeProducts(category) {
  currentCategory = category;
  try {
    const productList = await getProductList(currentCategory);
    totalItems = productList.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);

    renderProducts(productList);
    renderPagination();
  } catch (error) {
    console.error("Error initializing products:", error);
    productsContainerWrapper.innerHTML = "<p>Failed to load products.</p>";
  }
}

function renderProducts(productList) {
  productsContainerWrapper.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const productsToShow = productList.slice(startIndex, endIndex);

  if (productsToShow.length === 0) {
    productsContainerWrapper.innerHTML = "<p>No products available.</p>";
    return;
  }

  productsToShow.forEach((product) => {
    createProductLinks(product, productsContainerWrapper);
  });
}

//////// Pagination buttons
function renderPagination() {
  paginationElement.innerHTML = "";

  if (totalPages <= 1) return;

  //Previous button
  const prevButton = createPaginationButton("<", currentPage > 1, () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
      scrollToTop();
    }
  });
  paginationElement.appendChild(prevButton);

  // Numbered buttons
  for (let i = 1; i <= totalPages; i++) {
    const isActive = currentPage === i;
    const pageButton = createPaginationButton(
      i,
      true,
      () => {
        currentPage = i;
        updatePage();
        scrollToTop();
      },
      isActive
    );
    paginationElement.appendChild(pageButton);
  }

  //Next button
  const nextButton = createPaginationButton(
    ">",
    currentPage < totalPages,
    () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePage();
        scrollToTop();
      }
    }
  );
  paginationElement.appendChild(nextButton);
}

function createPaginationButton(label, isEnabled, onClick, isActive = false) {
  const button = document.createElement("button");
  button.textContent = label;
  button.className = `pagination-button ${isActive ? "active" : ""}`;
  button.disabled = !isEnabled;

  if (isEnabled) {
    button.addEventListener("click", onClick);
  }

  return button;
}

async function updatePage() {
  try {
    const productList = await getProductList(currentCategory);
    renderProducts(productList);
    renderPagination();

    const newUrl = new URL(window.location);
    newUrl.searchParams.set("category", currentCategory);
    newUrl.searchParams.set("page", currentPage);
    window.history.pushState({}, "", newUrl);
  } catch (error) {
    console.error("Error updating page:", error);
    productsContainerWrapper.innerHTML = "<p>Failed to update products.</p>";
  }
}

//////////Category buttons
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const category = button.dataset.category;
    currentPage = 1;
    window.location.href = `products.html?category=${category}`;
  });
});

document.querySelector(".feat").addEventListener("click", async () => {
  currentPage = 1;
  window.location.href = `products.html?category=feat`;
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
