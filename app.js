mapISS();

        async function mapISS(){
            // wait for the lat, long data of ISS
            const issData = await getISS();

            // Use Leaflet js functions to load the map.
            const map = L.map('mapId').setView([issData.lat, issData.long], 13);

            // You will need to use openstreetmap API.

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFncGF0IiwiYSI6ImNrbmhzZGVxejA4OXkyb29hNmJwY3FieDUifQ.VEW3u3CNsySxzfCuB7qGEg', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                // Get access token from mapbox.com
                accessToken: 'pk.eyJ1IjoiamFncGF0IiwiYSI6ImNrbmhzZGVxejA4OXkyb29hNmJwY3FieDUifQ.VEW3u3CNsySxzfCuB7qGEg'
            }).addTo(map);

            L.marker([issData.lat, issData.long]).addTo(map)
                .bindPopup('Hey look! <br> There is ISS !!')
                .openPopup();
        }
       
       
        async function getISS(){
            // I am using wheretheiss.at API to get the lats and longs of ISS
            const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
            const response = await fetch(api_url);
            const data = await response.json();
           // console.log(data);
            const lat = data.latitude;
            const long = data.longitude;
            //const lats = 28.6139;
            //const longs = 77.2090;
            //document.getElementById('lat').textContent = lat;
            //document.getElementById('long').textContent = long;
            //console.log(lat, long);
            return {lat, long};
        }
        //setInterval(getISS, 1000);
        //getISS();