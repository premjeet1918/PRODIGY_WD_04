const apikey = "c593563c80975b2661f5bf4d9d1394ca";


const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
const locationBtn = document.querySelector(".location-btn");

function displayWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";


  const weatherCondition = data.weather[0].main;

  if (weatherCondition == "Clouds") {
    weathericon.src = "images/clouds.png";
  } else if (weatherCondition == "Clear") {
    weathericon.src = "images/clear.png";
  } else if (weatherCondition == "Rain") {
    weathericon.src = "images/rain.png";
  } else if (weatherCondition == "Mist") {
    weathericon.src = "images/mist.png";
  } else if (weatherCondition == "Drizzle") {
    weathericon.src = "images/drizzle.png";
  } else if (weatherCondition == "Snow") {
    weathericon.src = "images/snow.png"; 
  }


  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}


async function checkWeather(city) {
  if (!city) return; // 

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    );

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();
      displayWeather(data); 
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


function getWeatherByLocation() {
  if (navigator.geolocation) {
   
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          displayWeather(data); 
        } catch (err) {
          alert("Mausam ka data nahi mil raha.");
        }
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("Location access blocked. Please allow location.");
      },
      options
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
}


searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});


if (locationBtn) {
  locationBtn.addEventListener("click", getWeatherByLocation);
}
