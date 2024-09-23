let allCities = [];

function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

async function fetchCities() {
  try {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
    if (!response.ok) throw new Error("Network response was not ok");
    const cities = await response.json();
    allCities = cities.map(city => city.nome);
  } catch (error) {
    console.error("Failed to fetch cities:", error);
  }
}

window.onload = () => {
  fetchCities();
};

function filterCities() {
  const input = document.getElementById("cidade").value.toLowerCase();
  const cityList = document.getElementById("city-list");
  const inputField = document.getElementById("cidade");
  
  cityList.innerHTML = "";
  if (input.length > 0) {
    const citiesStartingWithInput = allCities.filter(city => city.toLowerCase().startsWith(input));
    const citiesContainingInput = allCities.filter(city => 
      city.toLowerCase().includes(input) && !city.toLowerCase().startsWith(input)
    );
    const orderedCities = [...citiesStartingWithInput, ...citiesContainingInput];
    orderedCities.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      li.onclick = () => selectCity(city);
      cityList.appendChild(li);
    });

    inputField.setAttribute("aria-expanded", "true");
    cityList.setAttribute("aria-expanded", "true");
  } else {
    inputField.setAttribute("aria-expanded", "false");
    cityList.setAttribute("aria-expanded", "false");
  }
}

function selectCity(city) {
  document.getElementById("cidade").value = city;
  document.getElementById("city-list").innerHTML = "";
  document.getElementById("cidade").setAttribute("aria-expanded", "false");
  document.getElementById("city-list").setAttribute("aria-expanded", "false");
}

const debouncedFilterCities = debounce(filterCities, 300);

document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".form-container select");
  
  selects.forEach(select => {
    select.addEventListener("change", () => {
      if (select.value) {
        select.classList.add("selected");
      } else {
        select.classList.remove("selected");
      }
    });
  });
});



function animateBlocks() {
    document.querySelector('.bloco-left').classList.add('move');
    document.querySelector('.bloco-right').classList.add('move');
  }

document.querySelector('.submit-btn').addEventListener('click', function() {
    document.querySelector('.image-logo').classList.add('invisivel');
    document.querySelector('.produto-escolhido').classList.add('visivel');
});
  