import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Button, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useMe } from "../../hook/useAuth";

function Menu() {
  let { setAuth, user } = useContext(AuthContext)

  const u = useMe()

  const counter = useSelector((store) => store.counter) //doc thuoc tinh store
  const dispatch = useDispatch(); // goi ham reducer

  console.log(counter);


  let handleLogOut = () => {
    setAuth(false)
    localStorage.removeItem("token")
  }

  return (

    <div>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          centered

        >
          <Tab label="Home" to="/" component={Link} />
          <Tab label="Categories" to="/categories" component={Link} />
          <Tab label="Products" to="/products" component={Link} />
          <Tab label="Bills" to="/bills" component={Link} />
          <Tab label="Users" to="/users" component={Link} />
          <Button onClick={handleLogOut} endIcon={<ExitToAppIcon style={{ color: 'black' }} />}></Button>
        </Tabs>
      </AppBar>
      <Container>
        <Typography sx={{ mt: 2 }} variant="h5">Hello {user.name}</Typography>

      </Container>

    </div >
  );

}

export default Menu;
