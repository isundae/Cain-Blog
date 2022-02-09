import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3001/",
});

// Axios.interceptors.request.use(
//   (conflg) => {
//     return conflg;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// Axios.interceptors.response.use(
//   (conifg) => {
//     console.log(conifg);
//   },
//   (error) => {
//   }
// );

export { Axios };
