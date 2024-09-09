import { View, ScrollView } from "react-native";
import { styles, cardStyles } from "../styles/Styles";
import { useEffect, useState } from "react";
import { getCocktailsByName } from "../services/cocktailService";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import useDebounce from "../hooks/useDebounce";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // useEffect para buscar cócteles cuando cambia el searchQuery
  useEffect(() => {
    const fetchCocktails = async () => {
      if (debouncedSearchQuery) {
        try {
          const drinks = await getCocktailsByName(debouncedSearchQuery);
          if (drinks && drinks.length > 0) {
            setCocktails(drinks);
          } else {
            console.log("No drinks found");
            setCocktails([]);
          }
        } catch (error) {
          console.log("Error fetching drinks", error);
        }
      }
    };

    fetchCocktails();
  }, [debouncedSearchQuery]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <ScrollView contentContainerStyle={cardStyles.cardContainer}>
        {cocktails.map((cocktail) => (
          <Card key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
