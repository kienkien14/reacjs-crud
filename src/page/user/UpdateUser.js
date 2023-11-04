import { Button } from "@mui/material";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { searchRoleAPI, updateUserAPI } from "../../service/user.service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function UpdateUser() {
  let { id } = useParams()
  let [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    password: "",
    birthdate: "",
    file: null,
    roles: ""
  });

  // Lưu giữ giá trị id riêng lẻ
  // const userId = id;

  let navigate = useNavigate()
  let { users } = useSelector((store) => store.user)

  let getData = async () => {
    // let body = await getUserAPI(id)
    const body = users.find(item => item.id === parseInt(id))
    setUser(body)
  }

  useEffect(() => { getData() }, [id])

  //role select
  let [roles, setRoles] = useState([]);
  let [search, setSearch] = useState({
    keyword: "",
    currentPage: 0,
    size: 5
  });

  // load component thi goi callback
  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      let body = await searchRoleAPI(search);
      console.log(body.totalElements);
      setRoles(body.contents);
    } catch (e) {
      console.log(e);
    }
  };

  let handleChangeText = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let handleChangeFile = (e) => {
    setUser({ ...user, file: e.target.files[0] });
  };
  const handleSelectDate = (value) => {
    const formattedDate = dayjs(value).format('DD/MM/YYYY');
    setUser({ ...user, birthdate: formattedDate });
  }

  let handleSubmit = async () => {
    let data = new FormData();
    data.append('id', user.id);
    data.append('name', user.name);
    data.append('email', user.email);
    data.append('username', user.username);
    data.append('password', user.password);
    data.append('birthdate', user.birthdate);
    data.append('file', user.file);
    data.append('roles[0].id', user.roles);
    await updateUserAPI(data)
    navigate("/users")
  };

  return (
    <div>
      <h1>Update User</h1>
      <div>
        <div>
          <label>Id: </label>
          <input value={id} name="id" readOnly />
        </div>
        <div>
          <label>Name: </label>
          <input value={user.name} name="name" onChange={handleChangeText} />
        </div>
        <div>
          <label>Email: </label>
          <input value={user.email} name="email" onChange={handleChangeText} />
        </div>
        <div>
          <label>Username: </label>
          <input value={user.username} name="username" onChange={handleChangeText} />
        </div>
        <div>
          <label>Password: </label>
          <input value={user.password} name="password" onChange={handleChangeText} />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="birthdate"
              views={['year', 'month', 'day']}
              onChange={(newValue) => handleSelectDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div>
          <label>File: </label>
          <input type="file" accept="image/*" onChange={handleChangeFile} />
        </div>
        <div >
          <label>Role: </label>
          <select name="roles" onChange={handleChangeText}>
            {roles.map((r) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
export default UpdateUser;
