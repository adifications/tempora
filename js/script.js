function loadf() {
  document.getElementById("load").style.display = "none";
}
document.getElementById("submitBtn").addEventListener("click", async () => {
  document.getElementById("load").style.display = "block";
  const selectedDate = fp.selectedDates[0];
  if (!selectedDate) return;

  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
  const data = await res.json();
  if (data.events.length === 0) {
    alert("No events found for this date.");
    return;
  } else {
    console.log("kitti");
    document.getElementById("load").style.display = "none";
  }
  const eventsDiv = document.getElementById("events");
  eventsDiv.innerHTML = "";

  data.events.forEach(ev => {
    const el = document.createElement("p");
    el.innerHTML = `<strong>${ev.year}</strong> – ${ev.text}<br><br>`;
    eventsDiv.appendChild(el);
  });
});


document.getElementById("submitBtn2").addEventListener("click", async () => {
  document.getElementById("load").style.display = "block";
  const selectedDate = fp.selectedDates[0];
  if (!selectedDate) return;
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const isoDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  const nasaKey = "tQ5E4DmNplMsn9H66x1egCzR5GeelogxXUc0l17R"; 
  const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${isoDate}`);
  const nasaData = await nasaRes.json();
console.log(isoDate)

  const nasaDiv = document.getElementById("events");
  nasaDiv.innerHTML = `
    <h3>NASA – ${nasaData.title}</h3>
    ${nasaData.media_type === "image"
      ? `<img src="${nasaData.url}" alt="${nasaData.title}" style="max-width:100%; border-radius:10px;"/>`
      : `<iframe src="${nasaData.url}" frameborder="0" allowfullscreen style="width:100%; height:400px; border-radius:10px;"></iframe>`}
    <p>${nasaData.explanation}</p>
  `;

  document.getElementById("load").style.display = "none";
});

document.getElementById("submitBtn3").addEventListener("click", async () => {
  document.getElementById("load").style.display = "block";

  const selectedDate = fp.selectedDates[0];
  if (!selectedDate) return;

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  const countryCode = "IN"; 

  try {
  const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const text = await res.text();

  if (!text || text.trim() === "") {
    document.getElementById("load").style.display = "none";
    document.getElementById("events").innerHTML = "No special holidays today.";
    return; 
  }

  const holidays = JSON.parse(text);

  document.getElementById("load").style.display = "none";
  const specialtyDiv = document.getElementById("events");
  specialtyDiv.innerHTML = "";

  const todayHoliday = holidays.filter(h => {
    const date = new Date(h.date);
    return date.getDate() === day && date.getMonth() + 1 === month;
  });

  if (todayHoliday.length === 0) {
    specialtyDiv.innerHTML = "No special holidays today.";
    return;
  }

  todayHoliday.forEach(h => {
    const el = document.createElement("p");
    el.innerHTML = `<strong>${h.localName}</strong> - ${h.name}`;
    specialtyDiv.appendChild(el);
  });

} catch (error) {
  console.error("Error fetching holiday data:", error);
  document.getElementById("load").style.display = "none";
  document.getElementById("events").innerHTML = "Error fetching data.";
}
});

function down() {
  window.scrollBy(0, 420, { behavior: "smooth" });
}
function about() {
  alert("Tempora is a unique calendar remix that blends the past & present into one seamless experience. Instead of showing only your daily events, Tempora uncovers historic milestones, cosmic wonders, and visionary future forecasts tied to each date. From NASA space launches to pivotal world events, Tempora transforms time into a story — making every day feel meaningful, inspiring, and connected to something greater. -Ondago");
}
