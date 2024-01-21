let url =  `http://localhost:3000/data/`
const section = document.querySelector("#menu");
const searchInp = document.querySelector("#search")
const sort = document.querySelector("#sort")
let filterArr = [];
let copyArr = [];


async function GetAll(){
    let res = await axios.get(url);
    let data = await res.data;
    copyArr = data;
    section.innerHTML = "";

    filterArr = filterArr.length || searchInp.value ? filterArr:data;

    filterArr.forEach(element => {
        section.innerHTML+= `
        <div class="cards">
        <div class="img">
          <img src="${element.image}" alt="" />
        </div>

        <div class="text">
          <div class="left">
            <h4>${element.name}</h4>
            <p>${element.description}</p>
          </div>
          <h3>$${element.cost}</h3>
        </div>
      </div>
        `
    });
}
GetAll();


searchInp.addEventListener("input" , (e)=>{
    filterArr = copyArr;
    filterArr = filterArr.filter(element =>{
        return element.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    GetAll();
})

sort.addEventListener("change" , (e)=>{
    if(e.target.value ==="ascending"){
        filterArr.sort((a , b)=> a.cost-b.cost)
    }
    else if(e.target.value ==="descending"){
        filterArr.sort((a , b)=> b.cost-a.cost)
    }
    else{
        filterArr = [];
    };
    GetAll();
})