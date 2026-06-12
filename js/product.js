document.addEventListener("DOMContentLoaded", () => {

const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

fetch("data/products.json")
.then(response => response.json())
.then(products => {

const product = products.find(item => item.id === productId);

if(product){

productName.textContent = product.name;
productDescription.textContent = product.description;
productPrice.textContent = "$" + product.price;

}

})
.catch(error => console.error(error));

});
