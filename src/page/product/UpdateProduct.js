import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { searchCategoryAPI } from "../../service/category.service";
import { updateProductAPI } from "../../service/product.service";

function UpdateProduct() {
  let { id } = useParams()
  let [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    categoryId: "",
    file: null,
  });
  // Lưu giữ giá trị id riêng lẻ
  // const productId = id;
  let navigate = useNavigate()
  let { products } = useSelector((store) => store.product)

  let getData = async () => {
    // let body = await getProductAPI(id)
    const body = products.find(item => item.id === parseInt(id))
    setProduct(body)
  }
  useEffect(() => { getData() }, [id])

  // category select
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
      setCategories(body.contents);
    } catch (e) {
      console.log(e);
    }
  };

  //product
  let handleChangeText = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  let handleChangeFile = (e) => {
    setProduct({ ...product, file: e.target.files[0] });
  };

  let handleSubmit = async () => {
    let data = new FormData();
    data.append('id', product.id);
    data.append('name', product.name);
    data.append('description', product.description);
    data.append('price', product.price);
    data.append('category.id', product.categoryId);
    data.append('file', product.file);
    await updateProductAPI(data);
    toast("Update thanh cong!")
    navigate("/products");
  };

  return (
    <div>
      <h1>Update Product</h1>
      <div>
        <div>
          <label>ID: </label>
          <input value={id} name="id" readOnly />
        </div>
        <div>
          <label>Name: </label>
          <input value={product.name} name="name" onChange={handleChangeText} />
        </div>
        <div>
          <label>Description: </label>
          <input value={product.description} name="description" onChange={handleChangeText} />
          {/* <ReactQuill
            style={{ height: 200 }}
            theme="snow"
            value={product.description}
            onChange={(text) => setProduct({ ...product, description: text })}
          /> */}
        </div>
        <div>
          <label>Price: </label>
          <input value={product.price} name="price" onChange={handleChangeText} />
        </div>
        <div >
          <label >CategoryId: </label>
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

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
export default UpdateProduct;
