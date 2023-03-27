import axios from 'axios';

//all this function does is take a url and return data from api request
const Fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default Fetcher;