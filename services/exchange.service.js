// services/exchange.service.js
const axios = require('axios');

exports.getUsdToMxn = async () => {
  // ejemplo con exchangerate.host (gratuito, sin key) — puedes cambiar a tu API
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=MXN';
  const r = await axios.get(url);
  return r.data?.rates?.MXN ?? null;
};