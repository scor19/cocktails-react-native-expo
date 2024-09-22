import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVS_KEY = 'favourites';

export const favsService = {

  async getFavourites() {
    try {
      const favourites = await AsyncStorage.getItem(FAVS_KEY);
      return favourites ? JSON.parse(favourites) : [];
    } catch (error) {
      console.error("Error fetching favourites", error);
      return [];
    }
  },

  async addFavourite(cocktail: object) {
    try {
      const favourites = await this.getFavourites();
      const updatedFavs = [...favourites, cocktail];
      await AsyncStorage.setItem(FAVS_KEY, JSON.stringify(updatedFavs));
    } catch (error) {
      console.error("Error adding to favourites", error);
    }
  },

  async removeFavourite(cocktailId: string) {
    try {
      const favourites = await this.getFavourites();
      const updatedFavs = favourites.filter(
        (item: any) => item.idDrink !== cocktailId
      );
      await AsyncStorage.setItem(FAVS_KEY, JSON.stringify(updatedFavs));
    } catch (error) {
      console.error("Error removing from favourites", error);
    }
  },

  async isFavourite(cocktailId: string) {
    try {
      const favourites = await this.getFavourites();
      return favourites.some((item: any) => item.idDrink === cocktailId);
    } catch (error) {
      console.error("Error checking if favourite", error);
      return false;
    }
  },
};
