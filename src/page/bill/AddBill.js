import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { addBillAPI } from '../../service/bill.service';
import { searchProductAPI } from '../../service/product.service';
import { searchUserAPI } from '../../service/user.service';

function AddBill() {
  let navigate = useNavigate();

  //bill
  let [bill, setBill] = useState({
    user: {
      id: ""
    },
    billItems: [
      {
        product: {
          id: ""
        },
        quantity: "",
        price: ""
      }
    ]
  });

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
    } catch (e) {
      console.log(e);
    }
  };

  let handleChangeText = (e) => {
    const updatedBillItems = [...bill.billItems];
    updatedBillItems[0][e.target.name] = e.target.value;
    // const updatedBillItems = [{ ...bill.billItems[0], [e.target.name]: e.target.value }];
    setBill({ ...bill, billItems: updatedBillItems });
  };

  console.log(bill);

  let handleChangeUser = (e) => {
    setBill({ ...bill, user: { id: e.target.value } })
  };

  let handleChangeProduct = (e) => {
    setBill({
      ...bill, billItems: [{ product: { id: e.target.value } }]
    })
  };

  let handleSubmit = async () => {

    await addBillAPI(bill);
    toast("Them thanh cong!")
    navigate("/bills");
  };

  return (
    <div>
      <h1>New Bill</h1>
      <div>
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
          <input name="quantity" onChange={handleChangeText} />
        </div>
        <div>
          <label>Price: </label>
          <input name="price" onChange={handleChangeText} />
        </div>
        <div>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
export default AddBill;
