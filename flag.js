const backButton = document.getElementById("back-button");
const countryFlag = document.getElementById("country-flag");
const countryName = document.getElementById("country-name");
const nativeName = document.getElementById("native-name");
const population = document.getElementById("population");
const region = document.getElementById("region");
const capital = document.getElementById("capital");

const params = new URLSearchParams(window.location.search);
const countryCode = params.get("code");

fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
  .then((response) => response.json())
  .then((data) => {
    const country = data[0];
    countryFlag.src = country.flags.svg;
    countryName.textContent = country.name.common;
    nativeName.textContent = country.name.nativeName
      ? Object.values(country.name.nativeName)[0].common
      : "N/A";
    population.textContent = country.population.toLocaleString();
    region.textContent = country.region;
    capital.textContent = country.capital ? country.capital[0] : "N/A";
  });

backButton.addEventListener("click", () => {
  window.history.back();
});
