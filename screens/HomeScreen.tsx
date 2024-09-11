import { View, FlatList, ActivityIndicator } from "react-native";
import { styles } from "../styles/Styles";
import { useEffect, useState } from "react";
import {
  getCocktailsByName,
  getCocktailsByLetter,
} from "../services/cocktailService";

import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import useDebounce from "../hooks/useDebounce";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // useEffect para buscar cócteles cuando cambia el searchQuery o la página
  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        if (debouncedSearchQuery.length === 1) {
          const data = await getCocktailsByLetter(debouncedSearchQuery);
          setCocktails(data || []);
          return;
        }
        const data = await getCocktailsByName(debouncedSearchQuery);
        setCocktails(data || []);
      } catch (error) {
        console.error("Error fetching cocktails", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktails();
  }, [debouncedSearchQuery]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <Card
            cocktail={item}
            onPress={() => navigation.navigate("Detail", { cocktail: item })}
            isPreview={true}
          />
        )}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 10 }}
            />
          ) : null
        }
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

export default HomeScreen;
