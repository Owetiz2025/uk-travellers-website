document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");

  if (!input || !suggestions) {
    console.error("Missing #search or #suggestions in HTML");
    return;
  }

  const towns = [
    {
      "name": "Bromyard",
      "slug": "bromyard"
    },
    {
      "name": "Hereford",
      "slug": "hereford"
    },
    {
      "name": "Worcester",
      "slug": "worcester"
    }
  ];

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (query.length === 0) return;

    const matches = towns.filter(town => town.name.toLowerCase().includes(query));

    matches.forEach(town => {
      const item = document.createElement("div");
      item.classList.add("suggestion-item");

      const li = document.createElement("li");
      li.textContent = town.name;

      item.appendChild(li);
      item.addEventListener("click", () => {
        window.location.href = `?town=${town.slug}`;
      });

      suggestions.appendChild(item);
    });
  });
});
