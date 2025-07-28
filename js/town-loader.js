(async function() {
  const params = new URLSearchParams(window.location.search);
  const town = params.get("town") || "bromyard";
  const sort = params.get("sort") || "overview";

  const response = await fetch(`uk-travellers-website/data/${town}.json`);
  const data = await response.json();

  document.title = data.name + " - UK Town Guide";
  document.getElementById("town-name").textContent = data.name;
  document.getElementById("description").textContent = data.description;

  // Populate walking routes
  const routeList = document.getElementById("routes-list");
  data.walking_routes.forEach(route => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${route.name}</strong>: ${route.description}`;
    routeList.appendChild(li);
  });

  // Populate hotels
  const hotelList = document.getElementById("hotels-list");
  data.hotels.forEach(hotel => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${hotel.name}</strong>: ${hotel.description}`;
    hotelList.appendChild(li);
  });

  // Build Leaflet map
  const map = L.map("map").setView(data.coordinates, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker(data.coordinates).addTo(map).bindPopup(`${data.name}`).openPopup();

  // Highlight tab
  document.querySelectorAll(".sort-tabs a").forEach(tab => {
    if (tab.id === `tab-${sort}`) tab.classList.add("active");
    tab.href = `?town=${town}&sort=${tab.id.replace("tab-", "")}`;
  });

  // Scroll to section
  const scrollTo = document.getElementById(sort === "map" ? "map-section" : sort);
  if (scrollTo) scrollTo.scrollIntoView({ behavior: "smooth" });
})();