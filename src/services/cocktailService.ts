import axios from "axios";

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  ingredients?: { ingredient: string; measure: string }[];
}

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const extractIngredients = (drink: any) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure ? measure : "N/A", // Asegurarse de tener una medida
      });
    }
  }
  return ingredients;
};

export const getCocktailsByName = async (
  name: string,
  filter?: string
): Promise<Cocktail[]> => {
  const url = `${BASE_URL}/search.php?s=${name}`;

  try {
    // Realiza la búsqueda por nombre
    const { data } = await axios.get(url);
    const drinks = data?.drinks || []; // Verifica que data drinks sea un array

    // Si no hay filtro o el filtro es "Any", devuelve los resultados tal cual
    if (!filter || filter === "Any") {
      // Formatear las bebidas con ingredientes
      return drinks.map((drink: any) => ({
        ...drink,
        ingredients: extractIngredients(drink), // Agrega los ingredientes
      }));
    }

    // Si hay un filtro, filtra los resultados de la búsqueda por nombre
    return drinks
      .filter((drink: any) => drink?.strAlcoholic === filter)
      .map((drink: any) => ({
        ...drink,
        ingredients: extractIngredients(drink), // Agrega los ingredientes
      }));
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
export const getCocktailsByLetter = async (
  letter: string,
  filter?: string
): Promise<Cocktail[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
    const drinks = data?.drinks || [];

    // Si hay un filtro, aplicarlo a los resultados
    const filteredDrinks = filter
      ? drinks.filter((drink: any) => drink.strAlcoholic === filter)
      : drinks;

    // Formatear las bebidas con ingredientes
    return filteredDrinks.map((drink: any) => ({
      ...drink,
      ingredients: extractIngredients(drink), // Agrega los ingredientes
    }));
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

export const getCocktailsById = async (id: string) =>
  axios
    .get(`${BASE_URL}/lookup.php?i=${id}`)
    .then(({ data }) => data.drinks[0])
    .catch((error) => {
      console.log("Error al obtener el trago por ID: ", error);
      return null;
    });

export const getCocktailsByLetterPaginated = async (
  currentPage: number,
  pageSize: number,
  filter?: string
): Promise<Cocktail[]> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alfabeto completo
  const randomStart = Math.floor(Math.random() * (alphabet.length - pageSize));
  const letters = alphabet.slice(randomStart, randomStart + pageSize); // Obtener letras aleatorias

  const allDrinks: Cocktail[] = [];

  try {
    for (const letter of letters) {
      const { data } = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
      const drinks = data?.drinks || [];

      const filteredDrinks = filter
        ? drinks.filter((drink: any) => drink.strAlcoholic === filter)
        : drinks;

      allDrinks.push(
        ...filteredDrinks.map((drink: any) => ({
          ...drink,
          ingredients: extractIngredients(drink),
        }))
      );
    }

    return allDrinks;
  } catch (error) {
    console.log("Error al obtener los tragos paginados: ", error);
    return [];
  }
};
