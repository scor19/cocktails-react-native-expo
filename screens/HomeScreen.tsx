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
import FilterModal from "../components/FilterModal";
import { Cocktail } from "../services/cocktailService";

const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("Any"); // Estado para el filtro
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter); // Actualiza el filtro cuando se selecciona
    setModalVisible(false);
  };

  const handleOpenFilter = () => {
    setModalVisible(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cierra el modal
  };

  // useEffect para buscar cócteles cuando cambia el searchQuery o la página
  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        if (debouncedSearchQuery.length === 1) {
          const data = await getCocktailsByLetter(debouncedSearchQuery, filter);
          setCocktails(data || []);
          return;
        }
        const data = await getCocktailsByName(debouncedSearchQuery, filter);
        setCocktails(data || []);
      } catch (error) {
        console.error("Error fetching cocktails", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktails();
  }, [debouncedSearchQuery, filter]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} onOpenFilter={handleOpenFilter} />
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
      <FilterModal
        visible={modalVisible}
        onFilterSelect={handleFilterChange}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default HomeScreen;
