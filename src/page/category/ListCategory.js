import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { searchThunk } from "../../redux/categorySlice";
import {
  deleteCategoryAPI
} from "../../service/category.service";

function ListCategory() {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  let { categories, totalElements, totalPage }
    = useSelector((store) => store.category)

  // let [categories, setCategories] = useState([]);
  let [search, setSearch] = useState({
    keyword: "",
    currentPage: 0,
    size: 5
  });

  // let [totalPage, setTotalPage] = useState(0);

  // load component thi goi callback
  useEffect(() => {
    fetchData();
    // console.log("online");
    // //unmount
    // return () => {
    //   console.log("offline");
    // };
  }, [search]);

  const fetchData = async () => {
    dispatch(searchThunk(search))
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      try {
        await deleteCategoryAPI(id);
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
  };

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
      <Button to='/category/create' component={Link} variant="outlined" startIcon={<AddCircleIcon />}>Category</Button>
      <div>
        <input onChange={handleSearch} />
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => {
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>
                  <IconButton onClick={() => navigate(`/category/update/${c.id}`)} variant="outlined"><EditIcon /></IconButton>|
                  <IconButton onClick={() => handleDelete(c.id)} variant="outlined" ><DeleteIcon /></IconButton>
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
export default ListCategory;
