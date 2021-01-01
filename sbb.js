function goFullscreen() {
  // Must be called as a result of user interaction to work
  mf = document.getElementById("main_frame");
  mf.webkitRequestFullscreen();
  mf.style.display="";
}
function fullscreenChanged() {
  if (document.webkitFullscreenElement == null) {
      mf = document.getElementById("main_frame");
      mf.style.display="none";
  }
}

document.onwebkitfullscreenchange = fullscreenChanged;
document.documentElement.onclick = goFullscreen;
document.onkeydown = goFullscreen;

const departureHome = () => {
  const url = "https://transport.opendata.ch/v1/stationboard?station=Wallisellen,Neugut&limit=10"
  
  let today = new Date().getTime();
  console.log(today);

  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();

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
        //abfahrt = new Date(station.stop.departure).getTime();
        abfahrt = Date.parse('2021-01-01T18:30:00+0100');
        //console.log(abfahrt);
        bisAbfahrt = ((abfahrt-today)/(1000*60)).toFixed();
        if (bisAbfahrt <= 0) {
          row = `<tr><th scope="row"></th><td>Linie 12</td><td>${ziel}</td><td class="time">Zu spät</td></tr`
          tbody.insertAdjacentHTML("afterbegin", row)
        } else if (bisAbfahrt < 6) {
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


departureHome();
//window.setInterval(departureHome, 30000);
