const table = document.querySelector("table");
const baseURL = "http://94.176.235.3";
const notification = document.querySelector("div.notification");

if (table) {
  fetch(`${baseURL}/products`)
    .then(
      (response) => response.json(),
      (err) => console.log(err.message)
    )
    .then(
      (data) => {
        const search = document.querySelector("input[type=search]");

        displayTable(data, "");

        search.addEventListener("keyup", (event) => {
          if (search.value.length > 2) {
            displayTable(data, search.value);
          }
        });
      },
      (err) => console.log(err.message)
    );
} else {
  const number1 = Math.floor(Math.random() * 10 + 1);
  const number2 = Math.floor(Math.random() * 10 + 1);

  document.getElementById("captcha").textContent = `${number1} + ${number2}`;
  document.querySelector(
    "input[type=number]"
  ).placeholder = `${number1} + ${number2} =`;

  document.forms.add.addEventListener("submit", (event) => {
    event.preventDefault();

    const answer = Number(document.querySelector("input[type=number]").value);

    if (number1 + number2 === answer) {
      fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: event.target.elements.title.value,
          author: event.target.elements.author.value,
        }),
      }).then(
        () => {
          notification.textContent = "You have added a book";
          notification.style.backgroundColor = "rgba(0, 150, 0, 0.5)";
          notification.style.display = "block";
        },
        (error) => {
          notification.textContent = error.message;
          notification.style.backgroundColor = "rgba(150, 0, 0, 0.5)";
          notification.style.display = "block";
        }
      );
    } else {
      notification.textContent = "You don't know maths";
      notification.style.backgroundColor = "rgba(150, 0, 0, 0.5)";
      notification.style.display = "block";
    }
  });
}

function displayTable(data, filter) {
  table.innerHTML = "";
  data
    .filter(
      (book) =>
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.author > b.author)
    .forEach((book) => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.textContent = book.author;

      const td2 = document.createElement("td");
      td2.textContent = book.title;

      tr.append(td1, td2);
      table.append(tr);
    });
}
