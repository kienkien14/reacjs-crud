import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateCategoryAPI } from "../../service/category.service";

function UpdateCategory() {
  let { id } = useParams()
  let [category, setCategory] = useState({ id, name: "" });
  let navigate = useNavigate()

  let { categories } = useSelector((store) => store.category)

  let getData = async () => {
    // let body = await getCategoryAPI(id)
    const body = categories.find(item => item.id === parseInt(id))
    setCategory(body)
  }

  useEffect(() => { getData() }, [id])

  let handleChangeName = (e) => {
    setCategory({ ...category, name: e.target.value });
  };
  let handleSubmit = async () => {
    await updateCategoryAPI(category)
    navigate("/categories")
  };

  return (
    <div>
      <div>
        <label>ID: </label>
        <input value={id} readOnly />

        <label>Name: </label>
        <input name="name" value={category.name} onChange={handleChangeName} />

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
export default UpdateCategory;
