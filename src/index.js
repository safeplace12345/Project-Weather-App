console.log('Running......')
const country = document.querySelector('#country');
const city = document.querySelector('#city');
const search = document.querySelector('.search');
const countryName = document.querySelector('.countryname')
const description = document.querySelector('.description')
const temp = document.querySelector('.temp')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const speed = document.querySelector('.speed')
const deg = document.querySelector('.deg')
const img = document.querySelector('img')
search.addEventListener('click', function (e) {
    e.preventDefault();
    getGif()
})
async function getGif() {
    const weather = await getCountryWeather();
    const gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=lqK0zQE4DNeoht6DkbPI7pOq1oP8us8S&s=${weather}`
    const data = await fetch(gifURL);
    const res = await data.json();
    const gif = res.data.images.downsized_medium.url
    appendData.weather();
    return appendData.gif(gif);
}

function checkWeather() {
    let weatherURL;
    let con = country.value;
    let cit = city.value;
    let x = con.slice(0, 1).toUpperCase() + con.substr(1)
    if (con === '') {
        return;
    } else if (cit === '') {
        weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${x}&APPID=18c71bd9206ecf208842e382fc0c73bf`
    } else if (cit !== '') {
        weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${x},${cit}&APPID=18c71bd9206ecf208842e382fc0c73bf`
    }
    return weatherURL;
}
async function getCountryWeather() {
    const weatherURL = checkWeather()
    const get = await fetch(weatherURL)
    const response = await get.json()
    const main = response.weather[0].main
    return main;
}
const appendData = {
    gif (image){
        img.setAttribute('src', image);
    },
    async weather() {
        const weatherURL = checkWeather()
        const get = await fetch(weatherURL)
        const response = await get.json()
        const main = response
        countryName.innerText = main.name;
        description.innerText = main.weather[0].description;
        temp.innerText = main.main.temp;
        humidity.innerText = main.main.humidity;
        pressure.innerText = main.main.pressure;
        speed.innerText = main.wind.speed;
        deg.innerText = main.wind.deg;
    }
}