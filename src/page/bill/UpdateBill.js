import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { updateBillAPI } from "../../service/bill.service";
import { searchProductAPI } from "../../service/product.service";
import { searchUserAPI } from "../../service/user.service";


function UpdateBill() {
  let { id } = useParams()
  //bill
  let [bill, setBill] = useState({
    id: "",
    user: {
      id: ""
    },
    billItems: [
      {
        id: "",
        product: {
          id: ""
        },
        quantity: "",
        price: ""
      }
    ]
  });

  let navigate = useNavigate()
  let { bills } = useSelector((store) => store.bill)

  let getData = async () => {
    // let body = await getBillAPI(id)
    const body = bills.find(item => item.id === parseInt(id))
    setBill(body)
  }
  useEffect(() => { getData() }, [id])

  //user select
  let [users, setUsers] = useState([]);
  let [searchUser, setSearchUser] = useState({
    keyword: "",
    currentPage: 0,
    size: 10
  });

  // load component thi goi callback
  useEffect(() => {
    fetchDataUser();
  }, [searchUser]);

  const fetchDataUser = async () => {
    try {
      let body = await searchUserAPI(searchUser);
      setUsers(body.contents);
    } catch (e) {
      console.log(e);
    }
  };

  //product select
  let [products, setProducts] = useState([]);
  let [searchProduct, setSearchProduct] = useState({
    keyword: "",
    currentPage: 0,
    size: 10
  });

  // load component thi goi callback
  useEffect(() => {
    fetchDataProduct();
  }, [searchProduct]);

  const fetchDataProduct = async () => {
    try {
      let body = await searchProductAPI(searchProduct);
      setProducts(body.contents);
      console.log(body);
    } catch (e) {
      console.log(e);
    }
  };

  // let handleChangeText = (e) => {
  //   const updatedBillItems = [...bill.billItems];
  //   updatedBillItems[0][e.target.name] = e.target.value;
  //   setBill({ ...bill, billItems: updatedBillItems });
  // };

  let handleChangeText = (e) => {
    const updatedBillItems = [{ ...bill.billItems[0], [e.target.name]: e.target.value }];
    setBill({ ...bill, billItems: updatedBillItems });
  };


  let handleChangeUser = (e) => {
    setBill({ ...bill, user: { ...bill.user, id: e.target.value } });
    // setBill({ ...bill, user: { id: e.target.value } })
  };

  let handleChangeProduct = (e) => {
    setBill({
      ...bill,
      billItems: [
        {
          ...bill.billItems[0],
          product: {
            ...bill.billItems[0].product,
            id: e.target.value
          }
        }
      ]
    });

  };

  let handleSubmit = async () => {

    await updateBillAPI(bill);
    toast("Update thanh cong!")
    navigate("/bills");
  };

  return (
    <div>
      <h1>Update Bill</h1>
      <div>
        <div>
          <label>ID Bill: </label>
          <input value={id} readOnly />
        </div>
        <div>
          <label>User: </label>
          <select onChange={handleChangeUser}>
            {users.map((u) => {
              return (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div>
            <label>ID Product: </label>
            <input value={bill.billItems[0].id} readOnly />
          </div>
          <label>Product: </label>
          <select onChange={handleChangeProduct}>
            {products.map((b) => {
              return (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Quantity: </label>
          <input name="quantity" value={bill.billItems[0].quantity} onChange={handleChangeText} />
        </div>
        <div>
          <label>Price: </label>
          <input name="price" value={bill.billItems[0].price} onChange={handleChangeText} />
        </div>
        <div>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
export default UpdateBill;
