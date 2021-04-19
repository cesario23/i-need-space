const searchBottom = document.querySelector("#search");
searchBottom.addEventListener ('click', function(){
const addressInput = document.querySelector('#address').value;
const mapBoxApiKey = document.querySelector("#api-key").value;
const composedUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressInput}.json?access_token=${mapBoxApiKey}`
const encoded = encodeURI (composedUrl); 
    fetch (encoded)
    .then (function (data){
        return data.json ();
    })
    .then (function (response){
     const longitude= response.features[0].center[0];
     const latitude = response.features[0].center[1];
     const satelliteNorad = document.querySelector('#norad').value;
     const satellitePasses = `https://satellites.fly.dev/passes/${satelliteNorad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`;
            fetch (satellitePasses)
            .then (function (data){
            console.log (data);
            return data.json ();
            })
            .then (function (response){
            console.log (response);
            const rise = document.querySelector ('#brise');
            const culmination = document.querySelector ('#bculmination');
            const set = document.querySelector ('#bset');
            rise.innerText = " " +response[0].rise.utc_datetime;
            culmination.innerText = " "+ response[0].culmination.utc_datetime;
            set.innerText = " " + response[0].set.utc_datetime;
            })
    })
})
