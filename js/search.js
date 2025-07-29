// js/search.js

// Simulated list of towns — eventually load from JSON or API
let towns = [];

fetch('data/towns.json')
  .then(res => res.json())
  .then(data => {
    towns = data;
  });

const input = document.getElementById("searchBox");
const suggestionsBox = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (query === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = towns.filter(town => town.name.toLowerCase().startsWith(query));

  if (matches.length > 0) {
    matches.forEach(town => {
      const div = document.createElement("div");
      div.classList.add("suggestion");
      div.textContent = town.name;
      div.addEventListener("click", () => {
        window.location.href = `towns.html?town=${encodeURIComponent(town.slug)}&sort=overview`;
      });
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none";
  }
});

const input = document.getElementById("searchBox");
const suggestionsBox = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  
  if (query === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = towns.filter(town => town.toLowerCase().startsWith(query));

  if (matches.length > 0) {
    matches.forEach(town => {
      const div = document.createElement("div");
      div.classList.add("suggestion");
      div.textContent = town;
      div.addEventListener("click", () => {
        window.location.href = `towns.html?town=${encodeURIComponent(town.toLowerCase())}&sort=overview`;
      });
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none";
  }
});
