
const axios = require('axios');

exports.getUsdToMxn = async () => {
  
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=MXN';
  const r = await axios.get(url);
  return r.data?.rates?.MXN ?? null;
};