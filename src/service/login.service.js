import { axiosShop } from "../util/axios";

export const loginAPI = (username, password) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/login",
    headers: {},
    data: urlencoded,
  };

  return axiosShop
    .request(config).then((response) => {
      return (response.data);
    });
};
