var request = new XMLHttpRequest()

request.open('GET', 'http://transport.opendata.ch/v1/stationboard?station=Wallisellen,%20Neugut&limit=10', true)
request.onload = function() {
  var data = JSON.parse(this.response)
  
   data.forEach(tram => {
      console.log(tram)
    }
  }
  
  request.send()
