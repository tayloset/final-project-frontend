import Recipes from "../models/Recipes";
import "./Favorites.css";
import RecipeItem from "./RecipeItem";

interface Props {
  recipie: Recipes[];
}

const Favorites = ({ recipie }: Props) => {
  return (
    <ul className="Favorites">
      {recipie.map((item) => (
        <RecipeItem item={item} key={item?._id} />
      ))}
    </ul>
  );
};

export default Favorites;
