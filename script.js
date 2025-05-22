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


    // code to show 5 days date on div with id="day-1 to 5"
    const list = futureFormat.list;
    const groupedByDate = {};
    list.forEach(item=>{
        const date = item.dt_txt.split(' ')[0];
        if(!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(item);
    });
    const dates = Object.keys(groupedByDate).slice(0, 5);
    dates.forEach((date, index) => {
        const container = document.getElementById(`day-${index + 1}`);
        if (!container) return;
    
        // Add a date heading
        const heading = document.createElement('h3');
        const formattedDate = new Date(date).toDateString(); // e.g., Mon May 20 2025
        heading.textContent = formattedDate;
        heading.style.textAlign = 'center';
        heading.style.marginBottom = '10px';
        container.appendChild(heading);
    
        groupedByDate[date].forEach(entry => {
            const time = entry.dt_txt.split(' ')[1].slice(0, 5);
            const temp = (entry.main.temp - 273.15).toFixed(1);
            const weather = entry.weather[0].description;
    
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<strong>${time}</strong> - ${temp}°C - ${weather}`;
            container.appendChild(itemDiv);
        });
    });
}