export async function getProductList(category) {
  try {
    let response;
    if (category === "features") {
      response = await fetch("./data.json");
    } else if (category === "all") {
      response = await fetch("../data.json");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch product list");
    }

    const data = await response.json();
    const productList = [];

    data.products.forEach((product) => {
      productList.push(product);
    });

    return productList;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export function createProduct(product) {
  return `<div class="product">
            <img
              src=".${product.image}"
              alt="${product.name}"
            />
            <div class="product-text">
              <h5>${product.name}</h5>
              <p>${product.price}$</p>
            </div>
          </div>`;
}
