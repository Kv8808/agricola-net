const axios = require("axios");

const API_KEY = process.env.WEATHER_API_KEY;

async function obtenerClima(ciudad) {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: ciudad,
                    appid: API_KEY,
                    units: "metric",
                    lang: "es"
                }
            }
        );

        return {
            ciudad: response.data.name,
            temperatura: response.data.main.temp,
            humedad: response.data.main.humidity,
            descripcion: response.data.weather[0].description
        };

    } catch (error) {
        if (error.response) {
            throw new Error("Ciudad no encontrada o error en API externa");
        } else {
            throw new Error("Error de conexión con servicio climático");
        }
    }
}

module.exports = { obtenerClima };