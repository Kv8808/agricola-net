

export async function getUsdMxn() {
 
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


export async function geocodeCity(city) {
  const q = encodeURIComponent(city);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  
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
  
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current_weather=true&timezone=auto`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error open-meteo: ' + res.status);
    const json = await res.json();
    
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