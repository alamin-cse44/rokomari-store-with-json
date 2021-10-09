const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // console.log(product.id);
    // console.log(product.rating.count);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = 
    `<div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
      <p>${product.title}</p>
      <p class="text-left">Category: ${product.category}</p>
      <h4 class="text-left">Price: $ ${product.price}</h4>
      <h4 class="text-left">Total Ratings:  ${product.rating.count}</h4>
      <h4 class="text-left">Average Ratings:  ${product.rating.rate}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadSingleData(${product.id})" id="details-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// load single data 
const loadSingleData = productID => {
  const url = `https://fakestoreapi.com/products/${productID}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showDetails(data));
}

// show single data
const showDetails = data => {
  console.log(data);
  const productDetails = document.getElementById('product-details');
  productDetails.textContent = "";
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
     <div class="single-product margin">
      <h1>Product ID : ${data.id}</h1>
      <p class="card-text">Description : ${data.description.slice(0,150)}</p>
     </div>
    `;
    productDetails.appendChild(div);
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // total.toFixed(2)
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  let oldValueText = document.getElementById(id).innerText 
  const oldValue = parseFloat(oldValueText);
  oldValueText = (oldValue + value).toFixed(2);
  document.getElementById(id).innerText = oldValueText;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    let tx = parseFloat(priceConverted * 0.2);
    setInnerText("total-tax", tx);
    // getChargeTax(30+(priceConverted * 0.2))
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    let tx = parseFloat(priceConverted * 0.3);
    setInnerText("total-tax", tx);
    // setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    let tx = parseFloat(priceConverted * 0.4);
    setInnerText("total-tax", tx);
    // setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
