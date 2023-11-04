import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchThunk } from "../../redux/billSlice";
import { deleteBillAPI, downloadFile } from "../../service/bill.service";
import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';

function ListBill() {
  let navigate = useNavigate()
  const dispatch = useDispatch();

  let { bills, totalElements, totalPage }
    = useSelector((store) => store.bill)

  let [search, setSearch] = useState({
    keyword: "",
    currentPage: 0,
    size: 5
  });

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    dispatch(searchThunk(search))
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      try {
        await deleteBillAPI(id);
        fetchData();

        toast("Xoa thanh cong!", {
          type: 'success'
        });
      } catch (e) {
        console.log(e);
        toast("Xoa that bai!", {
          type: 'error'
        })
      }
    }
  }

  const handleDownloadFile = async (id) => {
    try {
      await downloadFile(id);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSearch = (e) => {
    setSearch({
      ...search,
      keyword: e.target.value,
    });
  };

  const handlePage = (index) => {
    setSearch({
      ...search,
      currentPage: index,
    });
  };

  const handleChangeSize = (e) => {
    const sizes = e.target.value;
    setSearch({
      ...search,
      size: parseInt(sizes),
    });
  };

  return (
    <div>
      <Button to='/bill/create' component={Link} variant="outlined" startIcon={<AddCircleIcon />}>Bill</Button>
      <div>
        <input onChange={handleSearch} />
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>ID Bill</th>
            <th>Create Date</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Category Name</th>
            <th>Quantity</th>
            <th>Bill Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => {
            return (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.createdAt}</td>
                <td>{b.user.name}</td>
                <td>{b.user.email}</td>
                <td>{b.user.roles[0].name}</td>
                <td>{b.billItems[0].product.name}</td>
                <td>
                  {b.billItems[0].product.image && <img src={`http://localhost:8080/product/download/${b.billItems[0].product.image}`} width={100} />}
                </td>
                <td>{b.billItems[0].product.price}</td>
                <td>{b.billItems[0].product.category.name}</td>
                <td>{b.billItems[0].quantity}</td>
                <td>{b.billItems[0].price}</td>
                <td>
                  <IconButton onClick={() => navigate(`/bill/update/${b.id}`)} variant="outlined"><EditIcon /></IconButton>|
                  <IconButton onClick={() => handleDelete(b.id)} variant="outlined" ><DeleteIcon /></IconButton>
                  <Link onClick={() => handleDownloadFile(b.id)} variant="outlined" ><FileDownloadIcon /></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Stack direction={"row"} alignItems={"center"}>

        <select onChange={handleChangeSize}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <Pagination
          count={totalPage}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          onChange={(e, value) => handlePage(value - 1)}
        />
      </Stack>
    </div>
  );
}
export default ListBill;
