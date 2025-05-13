let countriesContainer = document.getElementById("countries-container");
let searchInput = document.getElementById("search-input");
let sortSelect = document.getElementById("sort-select");
let themeToggle = document.getElementById("theme-toggle");
let body = document.body;
let countries = [];

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    countries = data;
    displayCountries(countries);
  });

function displayCountries(countries) {
  countriesContainer.innerHTML = countries
    .map(
      (country) => `
      <div class="card-item">
        <img src="${country.flags.svg}" alt="${country.name.common}">
        <p>${country.name.common}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    `
    )
    .join("");
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  displayCountries(filteredCountries);
});

sortSelect.addEventListener("change", (e) => {
  const sort = e.target.value;
  let sortedCountries = [...countries];

  if (sort === "a-z") {
    sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } else if (sort === "z-a") {
    sortedCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
  } else if (
    ["africa", "europe", "asia", "americas", "oceania"].includes(sort)
  ) {
    sortedCountries = countries.filter(
      (country) => country.region.toLowerCase() === sort
    );
  }

  displayCountries(sortedCountries);
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});

countriesContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card-item");
  if (!card) return;

  const countryName = card.querySelector("p").textContent;
  const country = countries.find(
    (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
  );

  if (country) {
    window.location.href = `flag.html?code=${country.cca3}`;
  }
});
