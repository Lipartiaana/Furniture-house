import { getProductList } from "./script.js";
import { createProduct } from "./script.js";

const swiperContainer = document.querySelector(".swiper-wrapper");

async function showFeatures() {
  try {
    const productList = await getProductList("features");

    productList.forEach((product) => {
      if (product.id <= 12) {
        const productCard = document.createElement("div");
        productCard.classList.add("swiper-slide");
        const featureHtml = createProduct(product);
        productCard.innerHTML = featureHtml;
        swiperContainer.appendChild(productCard);
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showFeatures();
});

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 4,
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    1360: {
      slidesPerView: 4,
      grid: {
        rows: 2,
      },
    },
    1170: {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
    },
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
    },
    0: {
      slidesPerView: 1,
      grid: {
        rows: 2,
      },
    },
  },
});
