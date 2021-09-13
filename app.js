const selection = document.getElementById("selection");
const mainCard = document.getElementById("main-card");
const searchBtn = document.getElementById("search-btn");
const chevronDown = document.getElementById("chevron-down");
console.log(selection.value);
// function for fetch APi
const fetchApi = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// get the  data from api
const getInfo = () => {
    fetchApi(`https://coronavirus-19-api.herokuapp.com/countries`)
        .then(res => showOnUi(res));
}
getInfo();

// Show on the ui
const showOnUi = (data) => {
    data.forEach((country) => {
        //console.log(country);
        // show using card
        const div = document.createElement("div");
        div.className = " p-4 rounded shadow border border-blue-300"
        div.innerHTML = `
    <h3 class="text-2xl"><span class="dark-gray font-black">Country: </span> ${country.country} </h3>
    <h3 class="text-xl mt-3"> deaths: ${country.deaths}  </h3>
    <h3 class="text-xl">Recoverd: ${country.recovered} </h3>
    `
        mainCard.appendChild(div);

        const option = document.createElement("option");
        option.innerText = `${country.country}`
        selection.appendChild(option);
    });
}

// Fetch clicked country Data
searchBtn.addEventListener("click", () => {
    console.log(selection.value);
    if (selection.value === "country") {
        console.log(selection.value);
        getInfo();
    }
    fetchApi(`https://coronavirus-19-api.herokuapp.com/countries/${selection.value}`)
        .then(res => displayClickedItem(res));
});

// Show Clicked Item on UI 
const displayClickedItem = (res) => {
    console.log(res);
    mainCard.innerHTML = "";
    const div = document.createElement("div");
    div.className = " p-4 rounded shadow border border-blue-300"
    div.innerHTML = `
    <h3 class="text-2xl"><span class="dark-gray font-black">Country: </span> ${res.country} </h3>
    <h3 class="text-xl mt-3"> deaths: ${res.deaths}  </h3>
    <h3 class="text-xl">Recoverd: ${res.recovered} </h3>
    `
    mainCard.appendChild(div);
}

selection.addEventListener("click", () =>{    
    isClicked ? inActive() : active();
});

let isClicked;    
const inActive = () => {
    isClicked = false;
    chevronDown.classList.replace("fa-chevron-down", "fa-chevron-up")
}

const active = () => {
    isClicked = true;
    chevronDown.classList.replace("fa-chevron-up", "fa-chevron-down")
}