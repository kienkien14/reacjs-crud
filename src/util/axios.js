import axios from "axios";
import nProgress from "nprogress";

export const axiosShop = axios.create({
  baseURL: "http://localhost:8080"
})

axiosShop.interceptors.request.use(function (config) {
  nProgress.start();

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosShop.interceptors.response.use(function (resp) {
  nProgress.done();
  return resp;
}, function (error) {
  nProgress.done();
  // Do something with request error
  return Promise.reject(error);
});