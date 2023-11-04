import Button from '@mui/material/Button';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { addUserAPI, searchRoleAPI } from '../../service/user.service';

function AddUser() {
  let navigate = useNavigate();
  //User
  let [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    birthdate: "",
    file: null,
    roles: ""
  });

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
    data.append('name', user.name);
    data.append('email', user.email);
    data.append('username', user.username);
    data.append('password', user.password);
    data.append('birthdate', user.birthdate);
    if (user.file) {
      data.append('file', user.file);
    }
    data.append('roles[0].id', user.roles);
    await addUserAPI(data);
    toast("Them thanh cong!")
    navigate("/Users");
  };

  return (
    <div>
      <h1>New User</h1>
      <div>
        <div>
          <label>Name: </label>
          <input name="name" onChange={handleChangeText} />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" onChange={handleChangeText} />
        </div>
        <div>
          <label>Username: </label>
          <input name="username" onChange={handleChangeText} />
        </div>
        <div>
          <label>Password: </label>
          <input name="password" onChange={handleChangeText} />
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
export default AddUser;
