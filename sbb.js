// function for fullscreen kiosk mode

function goFullscreen() {
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

// function to find out iOS version for our stupid old tablet

function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
}

ver = iOSversion()

// function to calculate shown time and destination

const departureHome = () => {
  const url = "https://transport.opendata.ch/v1/stationboard?station=Wallisellen,Neugut&limit=10"
  
  let today = new Date().getTime();
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
        departure_raw = station.stop.departure
        departure = departure_raw.slice(0, -5);
        console.log(departure);

        // making sure of ios version
        if (ver == `12,5,0`) {
          abfahrt = Date.parse(departure);
          bisAbfahrt = ((abfahrt-today)/(1000*60)).toFixed();
          bisAbfahrt = bisAbfahrt-60;
        } else {
          abfahrt = Date.parse(departure);
          bisAbfahrt = ((abfahrt-today)/(1000*60)).toFixed();
        }
        
        // diverent optics of time
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
    });
};

departureHome();

window.setInterval(departureHome, 30000);
