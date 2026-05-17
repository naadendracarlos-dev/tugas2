const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m";

const loading = document.getElementById("loading");
const table = document.getElementById("weatherTable");
const tbody = document.getElementById("tableBody");

// Sembunyikan tabel awal
table.style.display = "none";

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;

    for (let i = 0; i < 24; i++) {
      const row = document.createElement("tr");

      const date = new Date(times[i]).toLocaleString("id-ID");

      row.innerHTML = `
        <td>${date}</td>
        <td>${temps[i]} °C</td>
      `;

      tbody.appendChild(row);
    }

    loading.style.display = "none";
    table.style.display = "table";
  })
  .catch(err => {
    loading.textContent = "Gagal mengambil data.";
    console.error(err);
  });

/* 🌍 Peta Jakarta */
const map = L.map('map').setView([-6.2, 106.8], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([-6.2, 106.8])
  .addTo(map)
  .bindPopup("Jakarta")
  .openPopup();