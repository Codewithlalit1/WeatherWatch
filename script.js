let loc = document.getElementById("loc");

async function getWeather(){
    let userCity = loc.value;
    console.log(userCity);
    let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=e8b5a7144cbc61a70b9f18426dd9509e';

    const updatedUrl = baseUrl.replace("{city name}", encodeURIComponent(userCity));
    let weather = await fetch(updatedUrl);
    let format = await weather.json();
    console.log(format);
   

    // future Casting
    let futurebaseUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e8b5a7144cbc61a70b9f18426dd9509e';
    let temp = futurebaseUrl.replace("{lon}",encodeURIComponent(format.coord.lon));
    const futureURL = temp.replace("{lat}",encodeURIComponent(format.coord.lat)); 
    console.log(futureURL);
    let futureWeather = await fetch(futureURL);
    let futureFormat = await futureWeather.json();
    console.log(futureFormat);
}