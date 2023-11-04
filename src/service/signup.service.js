import { axiosShop } from "../util/axios";

export const signupAPI = (member) => {
  let data = JSON.stringify(member);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/createMember",
    headers: {
      'Content-Type': 'application/json'
    },
    data: data,
  };

  return axiosShop
    .request(config).then((response) => {
      return (response.data);
    });
};
