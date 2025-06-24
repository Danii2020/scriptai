import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_HEADER_API_KEY;

const axiosInstance = axios.create({
  headers: {
    "X-API-KEY": apiKey,
  },
});

export default axiosInstance; 