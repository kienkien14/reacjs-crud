import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { searchCategoryAPI } from "../../service/category.service";
import { addProductAPI } from '../../service/product.service';
import { toast } from 'react-toastify';

function AddProduct() {
  let navigate = useNavigate();

  //product
  let [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    file: null,
  });

  //category select
  let [categories, setCategories] = useState([]);
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
      let body = await searchCategoryAPI(search);
      console.log(body.totalElements);
      setCategories(body.contents);
    } catch (e) {
      console.log(e);
    }
  };

  let handleChangeText = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  let handleChangeFile = (e) => {
    setProduct({ ...product, file: e.target.files[0] });
  };


  let handleSubmit = async () => {
    let data = new FormData();
    data.append('name', product.name);
    data.append('description', product.description);
    data.append('price', product.price);
    data.append('category.id', product.categoryId);
    data.append('file', product.file);

    await addProductAPI(data);
    toast("Them thanh cong!")
    navigate("/products");
  };

  return (
    <div>
      <h1>New Product</h1>
      <div>
        <div>
          <label>Name: </label>
          <input name="name" onChange={handleChangeText} />
        </div>
        <div>
          <label>Description: </label>
          <input name="description" onChange={handleChangeText} />
        </div>
        <div >
          <label>Price: </label>
          <input name="price" onChange={handleChangeText} />
        </div>
        <div >
          <label>Categorys: </label>
          <select name="categoryId" onChange={handleChangeText}>
            {categories.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>File: </label>
          <input type="file" accept="image/*" onChange={handleChangeFile} />
        </div>
        <div>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
