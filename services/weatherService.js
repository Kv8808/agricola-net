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
            throw new Error("ciudad no encontrada o error en api externa");
        } else {
            throw new Error("error de conexión con servicio climático");
        }
    }
}

module.exports = { obtenerClima };