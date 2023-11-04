import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchThunk } from "../../redux/productSlice";
import { deleteProductAPI } from "../../service/product.service";
import { toast } from 'react-toastify';

function ListProduct() {
  let navigate = useNavigate()
  const dispatch = useDispatch();

  let { products, totalElements, totalPage }
    = useSelector((store) => store.product)

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
        await deleteProductAPI(id);
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
      <Button to='/product/create' component={Link} variant="outlined" startIcon={<AddCircleIcon />}>Product</Button>
      <div>
        <input onChange={handleSearch} />
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  {
                    p.image &&
                    <img src={`http://localhost:8080/product/download/${p.image}`} width={100} />
                  }
                </td>
                <td>{p.price}</td>
                <td>{p.category.name}</td>
                <td>{p.createdAt}</td>
                <td>
                  <IconButton onClick={() => navigate(`/product/update/${p.id}`)} variant="outlined"><EditIcon /></IconButton>|
                  <IconButton onClick={() => handleDelete(p.id)} variant="outlined" ><DeleteIcon /></IconButton>
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
        {/* <p>Tong so trang: {totalPage}</p> */}
      </Stack>
    </div>
  );
}
export default ListProduct;
