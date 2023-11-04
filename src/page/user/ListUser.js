import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { searchThunk } from "../../redux/userSlice";
import { deleteUserAPI } from "../../service/user.service";

function ListUser() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let { users, totalElements, totalPage }
    = useSelector((store) => store.user)

  // let [users, setUsers] = useState([]);
  let [search, setSearch] = useState({
    keyword: "",
    currentPage: 0,
    size: 5
  });

  // let [totalPage, setTotalPage] = useState(0);
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
        await deleteUserAPI(id);
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
  console.log(search);
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
      <Button to='/user/create' component={Link} variant="outlined" startIcon={<AddCircleIcon />}>User</Button>
      <div>
        <input onChange={handleSearch} />
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Avatar</th>

            <th>BirthDate</th>
            <th>CreatedAt</th>
            <th>Roles</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>
                  {
                    // p.avatar &&
                    <img src={`http://localhost:8080/user/download/${u.avatar}`} width={100} />
                  }
                </td>
                <td>{u.birthdate}</td>
                <td>{u.createdAt}</td>
                <td>{u.roles[0].name}</td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>{u.password}</td>
                <td>
                  <IconButton onClick={() => navigate(`/user/update/${u.id}`)} variant="outlined"><EditIcon /></IconButton>|
                  <IconButton onClick={() => handleDelete(u.id)} variant="outlined" ><DeleteIcon /></IconButton>
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

export default ListUser;
