import axios from "axios";
import Details from "../models/Details";
import Profile from "../models/Profile";
import SearchResult from "../models/SearchResult";

const baseURL: string = process.env.REACT_APP_API_URL || "";
const spoonacularBaseURL: string =
  process.env.REACT_APP_SPOONACULAR_API_URL || "";
const spoonacularApiKey: string =
  process.env.REACT_APP_SPOONACULAR_API_KEY || "";

export const getProfile = (uid: string): Promise<Profile[]> => {
  return axios
    .get(`${baseURL}/profiles/${encodeURIComponent(uid)}`)
    .then((response) => response.data);
};

export const addProfile = (uid: string): Promise<Profile> => {
  return axios
    .post(`${baseURL}/profiles/${encodeURIComponent(uid)}`)
    .then((response) => response.data);
};

export const updateProfile = (
  uid: string,
  category: string,
  updateData: any
): Promise<Profile> => {
  return axios
    .put(
      `${baseURL}/profiles/${encodeURIComponent(uid)}/${encodeURIComponent(
        category
      )}`,
      { updateData }
    )
    .then((response) => {
      console.log(response.data);
      console.log(updateData);
      return response.data;
    });
};

export const searchRecipes = (qsp: any): Promise<SearchResult> => {
  console.log(spoonacularApiKey);
  return axios
    .get(`${spoonacularBaseURL}/complexSearch`, {
      params: {
        apiKey: spoonacularApiKey,
        number: 2,
        //change back to 100 for final presentation
        ...(qsp.searchTerm ? { query: qsp.searchTerm } : {}),
        ...(qsp.searchCuisine ? { cuisine: qsp.searchCuisine } : {}),
        // ...(qsp.searchDiet ? { diet: qsp.searchDiet } : {}),
        ...(qsp.searchIntolerances
          ? { intolerances: qsp.searchIntolerances }
          : {}),
        // ...(qsp.searchEquipment ? { equipment: qsp.searchEquipment } : {}),
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

export const getRecipeDetails = (recipeId: any): Promise<Details> => {
  return axios
    .get(`${spoonacularBaseURL}/${encodeURIComponent(recipeId)}/information`, {
      params: {
        apiKey: spoonacularApiKey,
        id: recipeId,
        includeNutrition: false,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

export const updateProfileV2 = (updatedProfile: Profile): Promise<Profile> => {
  console.log(updatedProfile);
  return axios
    .put(
      `${baseURL}/profiles/${encodeURIComponent(updatedProfile.uid!)}`,
      updatedProfile
    )
    .then((response) => response.data);
};
