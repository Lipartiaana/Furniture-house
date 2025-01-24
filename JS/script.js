export async function getProductList(category) {
  try {
    let response;
    if (category === "features") {
      response = await fetch("./data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch product list");
      }
      const data = await response.json();
      let productList = data.products;
      return productList;
    } else {
      response = await fetch("../data.json");

      if (!response.ok) {
        throw new Error("Failed to fetch product list");
      }

      const data = await response.json();
      let productList = data.products.filter((product) => {
        if (category === "all") {
          return true;
        }
        return product.category === category;
      });

      if (category === "feat") {
        productList = data.products.slice(0, 12);
      }
      return productList;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export function createProduct(product) {
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";
  const imagePath = isIndexPage ? product.image : `.${product.image}`;

  return `<div class="product">
            <img
              src="${imagePath}"
              alt="${product.name}"
            />
            <div class="product-text">
              <h5>${product.name}</h5>
              <p>${product.price}$</p>
            </div>
          </div>`;
}
