let url = `http://localhost:3000/data/`;
const form = document.querySelector("#form");
const imageInp = document.querySelector("#img");
let nameInp = document.querySelector("#name");
let descriptionInp = document.querySelector("#description");
let costInp = document.querySelector("#cost");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  inputs = [imageInp, nameInp, descriptionInp, costInp];

  if (
    nameInp.value.trim() &&
    descriptionInp.value.trim() &&
    costInp.value.trim()
  ) {
    let src = imageInp.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = (e) => {
      let obj = {
        image: e.target.result,
        name: nameInp.value,
        description: descriptionInp.value,
        cost: costInp.value,
      };
      axios.post(url, obj).then((res) => {
        window.location = `./index.html`;
      });
    };
  } else {
    inputs.forEach((element) => {
      let display = element.value.trim() == "" ? "block" : "none";
      element.nextElementSibling.style.display = display;
    });
  }
});

// Table Crud
const table = document.querySelector("#table tbody");

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data  .forEach((element) => {
      table.innerHTML += `
      <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td>${element.cost}</td>
        <td><button onclick =deleteData((${element.id}))>Delete</button>
        </td>
        <td><button onclick="updateData(${element.id})">Update</button></td>
      </tr>
        `;
    });
  });

function deleteData(id) {
  axios.delete(url + id).then((res) => {
    alert("The Data was Successfully Deleted!");
    window.location.reload();
  });
}

