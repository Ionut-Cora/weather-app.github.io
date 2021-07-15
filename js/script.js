
const inputText = document.querySelector('.input-text');
const submitButton = document.querySelector('.submit');
const content = document.querySelector('.content');
const bigContent = document.querySelector('.big-content');

const apiKey = config.API_KEY;

window.addEventListener('load', () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=" + apiKey)
        .then((response) => response.json())
        .then((data) => {

            displayContent(data);

        });
});

submitButton.addEventListener('click', submitDisplay = () => {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputText.value + "&units=metric&appid=" + apiKey)
        .then((response) => response.json())
        .then((data) => {

            inputText.value = '';

            displayContent(data);

        });
});

displayContent = data => {
    const { name, visibility } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, temp_min, temp_max, pressure } = data.main;
    const { speed } = data.wind;
            
    content.innerHTML = `
        <div>
            <h2>` + name + `</h2>
            <h4>` + country + `</h4>
            <h1>` + temp + `°C</h1>
            <img src = https://openweathermap.org/img/wn/` + icon + `.png >
        </div>
        <div>
            <h3>` + description + `</h3>     
            <p>Humidity: ` + humidity + `%</p>
            <p>Wind speed: ` + speed + `km/h</p>
            <p>Feels like: ` + feels_like + `°C</p>
            <p>Pressure: ` + pressure + `hPa</p>
            <p>Visibility: ` + visibility + `km</p>
            <p>Low: ` + temp_min + `°C</p>
            <p>High: ` + temp_max + `°C</p>    
        </div>
        
    `;

    bigContent.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
}

inputText.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        submitDisplay();
    }
});
