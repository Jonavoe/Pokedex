import axios from "axios";
import { API_HOST } from "../utils/constants";

export async function getPokemonApi() {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
}
