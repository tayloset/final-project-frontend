import { FormEvent, useContext, useState } from "react";
import "./Pantry.css";
import AuthContext from "../context/AuthContext";

const Pantry = () => {
  const { profile, updateProfileHandler } = useContext(AuthContext);
  const [foodItem, setFoodItem] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const updatedProfile: any = { ...profile };
    updatedProfile.pantry.push(foodItem);
    delete updatedProfile._id;
    updateProfileHandler(updatedProfile);
  };

  const deleteFoodHandler = (index: number) => {
    const updatedProfile: any = { ...profile };
    updatedProfile.pantry.splice(index, 1);
    delete updatedProfile._id;
    updateProfileHandler(updatedProfile);
  };

  return (
    <div className="Pantry">
      <form onSubmit={submitHandler}>
        <label htmlFor="foodItem">Add Items to your Pantry!</label>
        <input
          type="text"
          name="foodItem"
          id="foodItem"
          placeholder="Add Item"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {profile?.pantry.map((item, index) => (
          <li key={`${item}${index}`}>
            {item}
            <button onClick={() => deleteFoodHandler(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pantry;
