const bedroomLinks = document.querySelectorAll(".bedroom-link");
const officeLinks = document.querySelectorAll(".office-link");
const livingRoomLinks = document.querySelectorAll(".living-room-link");
const kitchenLinks = document.querySelectorAll(".kitchen-link");

function handleCategoryClick(links, category) {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      window.location.href = `./html/products.html`;
    });
  });
}

handleCategoryClick(bedroomLinks, "Bedroom");
handleCategoryClick(officeLinks, "Office");
handleCategoryClick(livingRoomLinks, "Living Room");
handleCategoryClick(kitchenLinks, "Kitchen");
