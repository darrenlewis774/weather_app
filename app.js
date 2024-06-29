// Assign HTML elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
// Assign API key
const apiKey = "28a1a91f68bee0c22739e128774341d4";

// Form comprised of text element and submit button. This
// function will invoke when submit button is clicked
weatherForm.addEventListener("submit", async event => {

  event.preventDefault(); // Prevent page refresh

  const city = cityInput.value; // Assign value within text element

  if(city){
    try{
      // Await getWeatherData function to return weather data,
      // then assign
      const weatherData = await getWeatherData(city);
      // When weather data received, invoke displayWeatherInfo
      // function, and pass to it the weather data
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error); // Display error to user
    }
  }
  else{
    // Invoked if text element empty when submit button clicked
    displayError("Please enter a city");
  }
});

async function getWeatherData(city){

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Await fetch of above url, then assign
  const response = await fetch(apiUrl);

  // If response 'ok' property is false, throw new Error object.
  // Otherwise, return response object when it has been converted
  // to json format
  if(!response.ok){
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
};

function displayWeatherInfo(data){

  // Destructure required properties from data object
  const {name: city,
         main: {temp, humidity},
         weather: [{description, id}]} = data;

  // Clear text content for card element
  card.textContent = "";
  card.style.display = "flex";

  // Create elements for card
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Assign text content for elements
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Assign CSS for elements
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append elements to card
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
};

function getWeatherEmoji(weatherId){

  // Return emoji appropriate to weather ID
  switch(true){
    case (weatherId >= 200 && weatherId < 300):
      return "🌩";
    case (weatherId >= 300 && weatherId < 400):
      return "🌧";
    case (weatherId >= 500 && weatherId < 600):
      return "🌧";
    case (weatherId >= 600 && weatherId < 700):
      return "❄";
    case (weatherId >= 700 && weatherId < 800):
      return "🌫";
    case (weatherId === 800):
      return "☀";
    case (weatherId >= 801 && weatherId <810):
      return "☁";
    default:
      return "❔";
  }
};

function displayError(message){

  // Create error element, as a paragraph element
  const errorDisplay = document.createElement("p");
  // Populate error element with contents of message argument,
  // passed from text box check
  errorDisplay.textContent = message;
  // Apply CSS to error element
  errorDisplay.classList.add("errorDisplay");

  // Clear text content for card element
  card.textContent = "";
  // Change display setting to display card element
  card.style.display = "flex";
  // Append error element to card element
  card.appendChild(errorDisplay);
};