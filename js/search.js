// search.js

let towns = [];

async function loadTowns() {
  try {
    const response = await fetch("towns.json"); // or the correct path to your JSON file
    if (!response.ok) throw new Error("Failed to fetch towns");
    towns = await response.json();
  } catch (error) {
    console.error("Error loading towns:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");

  loadTowns().then(() => {
    input.addEventListener("input", () => {
      const searchTerm = input.value.toLowerCase();
      suggestions.innerHTML = "";

      const filtered = towns.filter(town =>
        town.name.toLowerCase().includes(searchTerm)
      );

      filtered.forEach(town => {
        const item = document.createElement("div");
        item.classList.add("suggestion-item");

        const li = document.createElement("li");
        li.textContent = town.name;

        item.appendChild(li);
        item.addEventListener("click", () => {
          window.location.href = `search/?town=${town.slug}`;
        });
        suggestions.appendChild(item);
      });
    });
  });
});
