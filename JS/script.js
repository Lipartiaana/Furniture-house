function createFeatureHtml(feature) {
  return `<div class="swiper-slide">
            <div class="feature-home">
              <img src=".${feature.image}" alt="${feature.name}" />
              <div class="feature-home-text">
                <h5>${feature.name}</h5>
                <p>${feature.price}$</p>
              </div>
            </div>`;
}

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const swiperContainer = document.querySelector(".swiper-wrapper");

    data.products.forEach((product) => {
      if (product.id <= 12) {
        const featureHtml = createFeatureHtml(product);
        swiperContainer.innerHTML += featureHtml;
      }
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

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
