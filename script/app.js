const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    // const cityDet = data.cityDet
    // const weather = data.weather

    console.log(data)

    //destructure properties
    const { cityDet, weather } = data

    //update deatils template
    details.innerHTML = `
        <h6 class="my-3">${cityDet.EnglishName}, ${cityDet.Country.EnglishName}</h6>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `

    //update the night/day & icon image
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let timeSrc =  weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc)

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

const updateCity = async (city) => {
    const cityDet = await getCity(city); 
    const weather = await getWeather(cityDet.Key)

    return {cityDet, weather}
}

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault()

    //get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    //update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
})
