// js/external-api.js
// Módulo para consumir APIs públicas sin API key.
// Uso: import { getUsdMxn, getWeatherByCity } from './js/external-api.js'

export async function getUsdMxn() {
  // exchangerate.host - no key
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=MXN';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener cotización: ' + res.status);
    const json = await res.json();
    const rate = json?.rates?.MXN ?? null;
    return { rate, date: json?.date ?? null };
  } catch (err) {
    console.error('getUsdMxn error', err);
    throw err;
  }
}

/*
  getWeatherByCity:
  - hace una búsqueda a Nominatim (OpenStreetMap) para convertir ciudad -> lat/lon (sin key)
  - luego consulta Open-Meteo para obtener current_weather
  - devuelve { name, latitude, longitude, temperature, windspeed, weathercode, time }
*/
export async function geocodeCity(city) {
  const q = encodeURIComponent(city);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  // Nominatim pide User-Agent o Referer; fetch from browser includes Referer.
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
    if (!res.ok) throw new Error('Error geocoding: ' + res.status);
    const arr = await res.json();
    if (!arr || !arr.length) return null;
    const { lat, lon, display_name } = arr[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon), display_name };
  } catch (err) {
    console.error('geocodeCity error', err);
    throw err;
  }
}

export async function getWeatherByCoords(lat, lon) {
  // open-meteo (no key) - solicitamos current_weather
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current_weather=true&timezone=auto`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error open-meteo: ' + res.status);
    const json = await res.json();
    // current_weather has temperature, windspeed, weathercode, time
    return { 
      current: json.current_weather ?? null,
      timezone: json.timezone ?? null,
      raw: json
    };
  } catch (err) {
    console.error('getWeatherByCoords error', err);
    throw err;
  }
}

export async function getWeatherByCity(city) {
  const geo = await geocodeCity(city);
  if (!geo) throw new Error('Ciudad no encontrada');
  const weather = await getWeatherByCoords(geo.lat, geo.lon);
  return {
    city: geo.display_name,
    lat: geo.lat,
    lon: geo.lon,
    weather: weather.current,
    tz: weather.timezone
  };
}