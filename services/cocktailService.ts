import axios from "axios";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

/**
 * Esta función toma un nombre como parámetro y devuelve los tragos con ese nombre de la API.
 * @param {string} name - El nombre del trago a buscar.
 * @returns {Promise<Array<Object>>} - Una Promise que resuelve con un arreglo de objetos de trago.
 */
export const getCocktailsByName = async (name: string) =>
  axios
    .get(`${BASE_URL}/search.php?s=${name}`)
    .then(({ data }) => data.drinks)
    .catch((error) => {
      console.error("Error fetching cocktails", error);
      return []; // Retorna un array vacío si ocurre un error
    });

/**
 * Esta función toma una letra como parámetro y devuelve los tragos que comiencen con esa letra de la API.
 * @param {string} letter - La letra de la que se quieren obtener los tragos.
 * @returns {Promise<Array<Object>>} - Una Promise que resuelve con un arreglo de objetos de trago.
 */
export const getCocktailsByLetter = async (letter: string) =>
  axios
    .get(`${BASE_URL}/search.php?f=${letter}`)
    .then(({ data }) => data.drinks)
    .catch((error) => {
      console.log("Error al obtener los tragos por letra: ", error);
      return [];
    });

export const getCocktailDetails = async (id: string) =>
  axios
    .get(`${BASE_URL}/lookup.php?i=${id}`)
    .then(({ data }) => data.drinks[0])
    .catch((error) => {
      console.log("Error al obtener los detalles del trago: ", error);
      return null;
    });

export const getPreviewImages = async () =>
  axios
    .get(`${BASE_URL}/list.php?i=list`)
    .then(({ data }) => data.drinks)
    .catch((error) => {
      console.log("Error al obtener las imagenes previas: ", error);
      return [];
    });
