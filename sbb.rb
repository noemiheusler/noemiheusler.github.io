require "json"
require "rest-client"
require "open-uri"
require "time"


response = RestClient.get "http://transport.opendata.ch/v1/stationboard?station=Wallisellen,%20Neugut&limit=10"
repos = JSON.parse(response)
# => repos is an `Array` of `Hashes`.

repos["stationboard"].each do |abfahrt|
  departure = Time.parse(abfahrt["stop"]["departure"])
  jetzt = Time.now
  wohin = abfahrt["to"]
  puts "In #{((departure - jetzt)/60).round} nach #{wohin}"
end
