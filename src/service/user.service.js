import { axiosShop } from "../util/axios";

//goi Api
export function searchRoleAPI(search) {
  let data = JSON.stringify(search);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/role/search/',
    headers: {
      'Content-Type': 'application/json',
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
}

export const meAPI = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/me',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  };

  return axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
}

export function searchUserAPI(searchUser) {
  let data = JSON.stringify(searchUser);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/user/search/',
    headers: {
      'Content-Type': 'application/json',
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
}

export let addUserAPI = (data) => {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/user/',
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

export let updateUserAPI = (data) => {
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/admin/user/',
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

export const deleteUserAPI = (id) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: '/admin/user/' + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
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

export const getUserAPI = (id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "/admin/user/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
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

export let forgotPass = (username) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/forgot-pass',
    headers: {
    },
    data: urlencoded
  };

  axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

}

export const updatePasswordAPI = (passNew) => {
  let data = JSON.stringify(passNew);
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/admin/user/password',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    data: data
  };
  axiosShop
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}