<script>
import axios from "axios";

const apikey = "218f5333b2770b7bef0ae65c17b5cbb0";

export default {
    name: "App",
    data() {
        return {
            city: "",
            weatherData: null,
            hourlyForecast: [],
            dailyForecast: [],
        };
    },
    computed: {
        temperature() {
            return this.weatherData
                ? Math.floor(this.weatherData.main.temp - 273)
                : null;
        },
        iconUrl() {
            return this.weatherData
                //Get the current weather icon using the API link
                ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
                : null;
        },
    },
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        //Async in a easy to understand way means the method will run in backend thread, 
        //And it won't occupy the main thread, so the user experience is still smooth
        async fetchCurrentLocationWeather() {
            //The navigator.geolocation object is part of the Web API provided by modern web browsers
            //Please note this function is not belongs to Vue or openweather.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    //API link to obtain the current weather based on the current location browser identified 
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                    //await means wait for the fetchWeatherData method to complete before proceeding
                    await this.fetchWeatherData(url);
                });
            }
        },
        async fetchWeatherData(url) {
            try {
                const response = await axios.get(url);
                //Returned data from API is stored as JSON file in weatherData
                this.weatherData = response.data;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        // --- added: minimal method to search by city name (e.g., "Clayton, AU") ---
        async searchByCity() {
            if (!this.city) return;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                this.city
            )}&appid=${apikey}`;
            await this.fetchWeatherData(url);
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="header text-center my-4">
            <h1>Weather App</h1>
            <div class="search-bar">
                <input class="search-input" type="text" placeholder="Enter city name" v-model="city" />
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>
    </div>
    <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->
    <main>
        <!--If there are no data returned, then skip rendering the information-->
        <div v-if="weatherData" class="text-center">
            <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->
            <h2>
                {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
                <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div>
            <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>

<style scoped></style>