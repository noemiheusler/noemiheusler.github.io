const departureHome = () => {
  const url = "https://transport.opendata.ch/v1/stationboard?station=Wallisellen,Neugut&limit=10"
  
  let today = new Date();
  today.toISOString().substring(0, 10);

  console.log(today);

  let hours = today.getHours();
  let minutes = today.getMinutes();

  const h2 = document.querySelector("h2");
  h2.innerHTML = '';


  if (minutes < 10) {
    h2.insertAdjacentHTML("afterbegin", `${hours}:0${minutes}`)
  } else {
    h2.insertAdjacentHTML("afterbegin", `${hours}:${minutes}`)
  }

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const stationboard = data.stationboard.reverse();

      stationboard.forEach((station) => {
        ziel = station.to
        abfahrt = new Date(station.stop.departure)
        abfahrt.toISOString().substring(0, 10)
        bisAbfahrt = ((abfahrt.getTime() - today.getTime())/(1000*60)).toFixed(2);
        if (bisAbfahrt < 6) {
          row = `<tr><th scope="row"></th><td>Linie 12</td><td>${ziel}</td><td class="time">${bisAbfahrt} min</td></tr`
          tbody.insertAdjacentHTML("afterbegin", row)
        } else {
          row = `<tr><th scope="row"></th><td>Linie 12</td><td>${ziel}</td><td>${bisAbfahrt} min</td></tr`
          tbody.insertAdjacentHTML("afterbegin", row)
        }
      });

      const times = document.querySelectorAll(".time");
      times.forEach((time) =>{
        time.classList.add("bold-font");
      });
    });
};

window.setInterval(departureHome, 10000);
