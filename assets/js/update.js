let url = `http://localhost:3000/data/`;
const id = new URLSearchParams(window.location.search).get("id");
const form = document.querySelector("#form");
let nameInp = document.querySelector("#name");
let descriptionInp = document.querySelector("#description");
let costInp = document.querySelector("#cost");
let image = document.querySelector(".image img");
const imageInp = document.querySelector("#img");

axios.get(url + id).then((res) => {
  let data = res.data;
  console.log(data.image);

  image.src = data.image;
  nameInp.value = data.name;
  descriptionInp.value = data.description;
  costInp.value = data.cost;
});

imageInp.addEventListener("input", (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      image.src = reader.result;
    };
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs = [nameInp, descriptionInp, costInp];

  if (
    nameInp.value.trim() &&
    descriptionInp.value.trim() &&
    costInp.value.trim()
  ) {
    let obj = {
      image: image.src,
      name: nameInp.value,
      description: descriptionInp.value,
      cost: costInp.value,
    };
    axios.put(url + id, obj);
    window.location = `./index.html`;
  }
  else{
    inputs.forEach(element => {
        let display = element.value.trim() ==  ""? "block":"none";
        element.nextElementSibling.style.display = display;
    });
  }
}
);
