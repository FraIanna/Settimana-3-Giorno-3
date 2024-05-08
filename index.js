const getArray = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        console.log("bravo hai capito qualcosa!!", response);
        return response.json();
      }
      throw new Error("Il server non risponde");
    })
    .then((arrayOfBook) => {
      console.log("il mio array:", arrayOfBook);
      generateCard(arrayOfBook);
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getArray();

const generateCard = function (arrayOfBook) {
  const cards = document.getElementsByClassName("card");

  arrayOfBook.forEach((book, i) => {
    if (i < cards.length) {
      const card = cards[i];
      const cardImage = card.getElementsByClassName("card-img-top")[0];
      const cardBody = card.getElementsByClassName("card-body")[0];
      cardImage.src = book.img;
      cardBody.innerHTML = `<h5 class="card-title">${book.title} </h5> 
      <p> Price: ${book.price} <br> 
      <span class= "fw-bold">Category: ${book.category} </span> </p> 
      <button class = "btn btn-primary" onclick="generateList('${book.title}')">COMPRA</button>
      <button class = "btn btn-danger" onclick="deleteBook(event)">SCARTA</button>`;
    }
  });
};

const deleteBook = function (e) {
  e.target.closest(".col").remove();
};

const generateList = function (title) {
  const list = document.querySelector("ul");
  const newLi = document.createElement("li");
  newLi.classList.add(
    "list-group-item",
    "text-bg-dark",
    "mt-2",
    "d-flex",
    "justify-content-between",
    "w-50"
  );
  newLi.textContent = title;
  list.appendChild(newLi);
  const newButton = document.createElement("button");
  newButton.classList.add("btn", "btn-danger");
  newButton.innerText = "Delete";
  newLi.appendChild(newButton);
  newButton.addEventListener("click", function () {
    newLi.remove();
  });
  localStorage.setItem("Carrello", list);
};
