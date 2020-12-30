import axios from 'axios';

/** For endpoints that do not require authentications.
 * such as, /api/signup, /api/authenticate
 */
const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export { publicFetch };
