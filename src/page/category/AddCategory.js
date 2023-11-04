import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { addCategoryAPI } from "../../service/category.service";


function AddCategory() {
  let [category, setCategory] = useState({ name: "" });

  let handleChangeName = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  let navigate = useNavigate()

  let handleSubmit = async () => {
    await addCategoryAPI(category)
    toast("Them thanh cong!")
    navigate("/categories")
  };

  return (
    <div>

      <h1>New Category</h1>

      <div>
        <label>Name: </label>
        <input name="name" onChange={handleChangeName} />

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
export default AddCategory;
