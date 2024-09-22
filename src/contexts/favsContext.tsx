import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { favsService } from "../services/favsService";
import { Cocktail } from "../services/cocktailService";

// Definir el tipo del contexto
interface FavouritesContextType {
  favourites: Cocktail[];
  addFavourite: (cocktail: Cocktail) => void;
  removeFavourite: (cocktailId: string) => void;
  loadFavourites: () => void;
}

// Definir el tipo de las props del FavouritesProvider
interface FavouritesProviderProps {
  children: ReactNode;
}

// Crear el contexto
const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

// Hook para usar el contexto
export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites debe estar dentro de FavouritesProvider");
  }
  return context;
};

// Proveedor del contexto
export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  const [favourites, setFavourites] = useState<Cocktail[]>([]);

  // Función para cargar favoritos desde el servicio
  const loadFavourites = async () => {
    const favs = await favsService.getFavourites();
    setFavourites(favs || []);
  };

  // Función para agregar un cóctel a los favoritos
  const addFavourite = (cocktail: Cocktail) => {
    setFavourites((prevFavourites) => [...prevFavourites, cocktail]);
    favsService.addFavourite(cocktail); // Guarda el favorito en el servicio
  };

  // Función para eliminar un cóctel de los favoritos
  const removeFavourite = (cocktailId: string) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.idDrink !== cocktailId)
    );
    favsService.removeFavourite(cocktailId); // Elimina el favorito del servicio
  };

  // Cargar los favoritos al iniciar
  useEffect(() => {
    loadFavourites();
  }, []);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, loadFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
