const departureHome = () => {
  const url = "http://transport.opendata.ch/v1/stationboard?station=Wallisellen,Neugut&limit=10"
  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()

  const h2 = document.querySelector("h2");
  h2.insertAdjacentHTML("afterbegin", `${hours}:${minutes}`)

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(hours)
      console.log(minutes)
      const stationboard = data.stationboard.reverse();
      const tbody = document.querySelector("tbody");

      stationboard.forEach((station) => {
        ziel = station.to
        abfahrt = new Date(station.stop.departure)
        today = new Date()
        zeit = Math.round(Math.abs(today - abfahrt) / 60000)
        if (zeit < 6) {
          row = `<tr><th scope="row"></th><td>Linie 12</td><td>${ziel}</td><td class="time">${zeit} min</td></tr`
          tbody.insertAdjacentHTML("afterbegin", row)
        } else {
          row = `<tr><th scope="row"></th><td>Linie 12</td><td>${ziel}</td><td>${zeit} min</td></tr`
          tbody.insertAdjacentHTML("afterbegin", row)
        }
      });

      const times = document.querySelectorAll(".time");
      times.forEach((time) =>{
        time.classList.add("bold-font");
      });
    });
};

departureHome();

const lager = () => {
      const tbody = document.querySelector("tbody")
      const row = '<tr><th scope="row"></th><td>Linie 12</td><td>Ziel</td><td>Abfahrt in</td></tr>'
      tbody.insertAdjacentHTML("afterbegin", row);
} 
