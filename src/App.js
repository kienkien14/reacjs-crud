import { useContext } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./component/shared/Footer";
import Menu from "./component/shared/Menu";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./page/auth/ForgotPassword";
import Login from "./page/auth/Login";
import Signup from "./page/auth/Signup";
import AddBill from "./page/bill/AddBill";
import ListBill from "./page/bill/ListBill";
import UpdateBill from "./page/bill/UpdateBill";
import AddCategory from "./page/category/AddCategory";
import ListCategory from "./page/category/ListCategory";
import UpdateCategory from "./page/category/UpdateCategory";
import AddProduct from "./page/product/AddProduct";
import ListProduct from "./page/product/ListProduct";
import UpdateProduct from "./page/product/UpdateProduct";
import AddUser from "./page/user/AddUser";
import ListUser from "./page/user/ListUser";
import UpdateUser from "./page/user/UpdateUser";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer position="bottom-right" autoClose={5000} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>

              <Route path="/users" element={<ListUser />}></Route>
              <Route path="/user/create" element={<AddUser />}></Route>
              <Route path="/user/update/:id" element={<UpdateUser />}></Route>

              <Route path="/categories" element={<ListCategory />}></Route>
              <Route path="/category/create" element={<AddCategory />} ></Route>
              <Route path="/category/update/:id" element={<UpdateCategory />}></Route>

              <Route path="/products" element={<ListProduct />}></Route>
              <Route path="/product/create" element={<AddProduct />}></Route>
              <Route path="/product/update/:id" element={<UpdateProduct />}></Route>

              <Route path="/bills" element={<ListBill />}></Route>
              <Route path="/bill/create" element={<AddBill />}></Route>
              <Route path="/bill/update/:id" element={<UpdateBill />}></Route>

            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="*" element={<div>404 Not Found.....</div>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

function DashboardLayout() {
  let { auth } = useContext(AuthContext);

  if (auth)
    return (
      <div>
        <Menu />

        <Outlet />

        <Footer />
      </div>
    );
  return <Navigate to="/Login" />;
}

export default App;
