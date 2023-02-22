import axios from 'axios';

export default axios.create({
  baseURL: 'https://newsdata.io/api/1/',
  headers: {
    Accept: 'application/json',
  },
  params: {
    apikey: 'pub_1748209840e2c0162bbb55422329b500dc1a4',
  },
});
