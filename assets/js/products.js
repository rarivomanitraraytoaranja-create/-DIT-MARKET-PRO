const products = [
  {
    id: 1,
    title: "Motion Pack Premium",
    price: "$29",
    video: "assets/video/previews/demo.mp4"
  },
  {
    id: 2,
    title: "UI Kit Glass",
    price: "$19",
    video: "assets/video/previews/demo.mp4"
  }
];

const grid = document.getElementById("productsGrid");

if(grid){
  products.forEach(p => {
    grid.innerHTML += `
      <div class="glass" onclick="openProduct(${p.id})">
        <h3>${p.title}</h3>
        <p>${p.price}</p>
      </div>
    `;
  });
}

function openProduct(id){
  localStorage.setItem("productId", id);
  window.location.href = "product-details.html";
}
