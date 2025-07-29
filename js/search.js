const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");

async function fetchTownList() {
  try {
    const response = await fetch("search/data/towns.json");
    if (!response.ok) throw new Error("Could not load towns");
    return await response.json();
  } catch (err) {
    console.error("Error loading towns:", err);
    return [];
  }
}

function createSuggestionItem(town) {
  const li = document.createElement("li");
  li.textContent = town.charAt(0).toUpperCase() + town.slice(1);
  li.onclick = () => {
    window.location.href = `/search/?town=${encodeURIComponent(town)}`;
  };
  return li;
}

async function initSearch() {
  const towns = await fetchTownList();

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    suggestions.innerHTML = "";
    if (query.length === 0) return;

    const filtered = towns.filter(town => town.toLowerCase().includes(query));
    filtered.forEach(town => suggestions.appendChild(createSuggestionItem(town)));
  });
}

initSearch();
