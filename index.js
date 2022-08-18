import data from "./data.js";

let filteredData = data.results.filter((item) => item.imageurl[0]);
let favArr = [];

let searchInpt = document.querySelector(".searchInpt");
let favoritesBtn = document.querySelector(".favorites");
let modal = document.querySelector(".modal");
let favDiv = document.querySelector(".favDiv");
let closeBtn = document.querySelector(".close");

window.addEventListener("load", () => {
  render(filteredData);

  closeBtn.addEventListener("click", () => {
    modal.toggleAttribute("hidden");
  });
  favoritesBtn.addEventListener("click", () => {
    modal.toggleAttribute("hidden");
    renderModal(favArr);
  });
  searchInpt.addEventListener("input", () => {
    search();
  });
});

function renderModal(dataToRender) {
  favDiv.innerHTML = "";

  favArr.forEach((item, i) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let description = document.createElement("p");
    let btnFav = document.createElement("button");
    let div = document.createElement("div");

    btnFav.innerHTML = "💔";
    description.innerHTML = item.synopsis;
    card.className = "favCard";
    img.src = item.imageurl[0];
    name.innerHTML = item.title;

    btnFav.addEventListener("click", () => {
      favArr = favArr.filter((el) => el != dataToRender[i]);
      btnFav.src = "./disliked.png";
      renderModal(favArr);
      render(filteredData);
    });

    favDiv.append(card);
    card.append(img, div);
    div.append(name, description, btnFav);
  });
}

function render(dataToRender) {
  let cardDiv = document.querySelector(".cardDiv");
  cardDiv.innerHTML = "";

  dataToRender.forEach((item, i) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let btnFav = document.createElement("img");

    btnFav.src = favArr.includes(dataToRender[i])
      ? "./media/liked.png"
      : "./media/disliked.png";
    btnFav.className = "favImg";
    card.className = "card";
    img.src = item.imageurl[0];
    name.innerHTML = item.title;

    btnFav.addEventListener("click", () => {
      console.log(favArr);
      if (!favArr.includes(dataToRender[i])) {
        favArr.push(dataToRender[i]);
        btnFav.src = "./media/liked.png";
      } else {
        favArr = favArr.filter((el) => el != dataToRender[i]);
        btnFav.src = "./media/disliked.png";
      }
    });

    cardDiv.append(card);
    card.append(btnFav, img, name);
  });
}

function search() {
  let searched = filteredData.filter((item) =>
    item.title.toLowerCase().includes(searchInpt.value.toLowerCase())
  );
  render(searched);
}
