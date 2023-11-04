import { axiosShop } from "../util/axios";

//chuyen toan bo ham goi API
export const getProductAPI = (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/admin/product/?id=' + id,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
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

export let addProductAPI = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/product/',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
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

export let updateProductAPI = (data) => {
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/admin/product/',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
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

export const deleteProductAPI = (id) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: '/admin/product/' + id,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    }
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

export function searchProductAPI(search) {
  let data = JSON.stringify(search);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/product/search/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    data: data
  };

  return axiosShop
    .request(config)
    .then((response) => {
      let body = response.data;
      return body;
    })
    .catch((error) => {
      console.log(error);
    });
}
