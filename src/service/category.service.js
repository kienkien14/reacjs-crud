import { axiosShop } from "../util/axios";

//chuyen toan bo ham goi API
export const getCategoryAPI = (id) => {
  let data = '';
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "/admin/category/?id=" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    data: data
  };
  return axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export let addCategoryAPI = (category) => {
  let data = JSON.stringify(category);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/category/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':
        'Bearer ' + localStorage.getItem("token")
    },
    data: data
  };

  return axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

};

export let updateCategoryAPI = (category) => {
  let data = JSON.stringify(category);

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/admin/category/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':
        'Bearer ' + localStorage.getItem("token")
    },
    data: data
  };
  return axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCategoryAPI = (id) => {
  let data = '';

  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: '/admin/category/' + id,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    data: data
  };

  return axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error
    });
};

export function searchCategoryAPI(search) {
  let data = JSON.stringify(search);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/category/search',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    data: data
  };

  return axiosShop
    .request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}
