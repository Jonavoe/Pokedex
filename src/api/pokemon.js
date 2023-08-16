import axios from "axios";
import { API_HOST } from "../utils/constants";

export async function getPokemonApi(pagina) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=${pagina}0`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsByUrlApi(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
