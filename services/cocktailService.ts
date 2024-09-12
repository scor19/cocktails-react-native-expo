import axios from "axios";

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  // Agrega otros campos según la respuesta de la API
}

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export const getCocktailsByName = async (
  name: string,
  filter?: string
): Promise<Cocktail[]> => {
  let url = `${BASE_URL}/search.php?s=${name}`;

  try {
    // Realiza la búsqueda por nombre
    const { data } = await axios.get(url);
    const drinks = data?.drinks || []; // Verifica que data drinks sea un array

    // Si no hay filtro o el filtro es "Any", devuelve los resultados tal cual
    if (!filter || filter === "Any") {
      return drinks;
    }

    // Si hay un filtro, filtra los resultados de la búsqueda por nombre
    return drinks.filter((drink: any) => drink?.strAlcoholic === filter);
  } catch (error) {
    console.error("Error fetching cocktails", error);
    return [];
  }
};

/**
 * Esta función toma una letra como parámetro y devuelve los tragos que comiencen con esa letra de la API.
 * @param {string} letter - La letra de la que se quieren obtener los tragos.
 * @returns {Promise<Array<Object>>} - Una Promise que resuelve con un arreglo de objetos de trago.
 */
export const getCocktailsByLetter = async (letter: string, filter?: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
    const drinks = data?.drinks || [];

    // Si hay un filtro, aplicarlo a los resultados
    if (filter) {
      return drinks.filter((drink: any) => drink.strAlcoholic === filter);
    }

    return drinks;
  } catch (error) {
    console.log("Error al obtener los tragos por letra: ", error);
    return [];
  }
};


export const getPreviewImages = async () =>
  axios
    .get(`${BASE_URL}/list.php?i=list`)
    .then(({ data }) => data.drinks)
    .catch((error) => {
      console.log("Error al obtener las imagenes previas: ", error);
      return [];
    });
