import { axiosShop } from "../util/axios";

//chuyen toan bo ham goi API
export const getBillAPI = (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/admin/bill/?id=' + id,
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

export let addBillAPI = (bill) => {
  let data = JSON.stringify(bill);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/bill/',
    headers: {
      'Content-Type': 'application/json',
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

export let updateBillAPI = (bill) => {
  let data = JSON.stringify(bill);
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/admin/bill/',
    headers: {
      'Content-Type': 'application/json',
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

export const deleteBillAPI = (id) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: '/admin/bill/' + id,
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

export function searchBillAPI(search) {
  let data = JSON.stringify(search);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/bill/search/',
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

export function searchBillItemAPI(search) {
  let data = JSON.stringify(search);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/admin/billItem/search/',
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

export const downloadFile = (id) => {
  axiosShop({
    url: '/admin/bill/pdf/' + id,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    responseType: 'blob', // important
  }).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `Bill_${id}.pdf`);
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });
};