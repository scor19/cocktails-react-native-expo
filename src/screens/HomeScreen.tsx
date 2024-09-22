import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { styles } from "../styles/Styles";
import { useEffect, useState, useCallback } from "react";
import {
  Cocktail,
  getCocktailsByName,
  getCocktailsByLetter,
} from "../services/cocktailService";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import useDebounce from "../hooks/useDebounce";
import FilterModal from "../components/FilterModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFavourites } from "../contexts/favsContext";
import { useFocusEffect } from "@react-navigation/native"; // Importa useFocusEffect

const HomeScreen = ({ navigation, route }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("Any");
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { showFavourites } = route.params;
  const { favourites, loadFavourites } = useFavourites();

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

  // useEffect para buscar cócteles cuando cambia el searchQuery o el filtro
  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        if (!showFavourites) {
          if (debouncedSearchQuery.length === 1) {
            const data = await getCocktailsByLetter(
              debouncedSearchQuery,
              filter
            );
            setCocktails(data || []);
            return;
          }
          const data = await getCocktailsByName(debouncedSearchQuery, filter);
          setCocktails(data || []);
        }
      } catch (error) {
        console.error("Error fetching cocktails", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktails();
  }, [debouncedSearchQuery, filter]);

  // useFocusEffect para cargar favoritos cada vez que la pantalla de Favourites recibe foco
  useFocusEffect(
    useCallback(() => {
      if (showFavourites) {
        loadFavourites(); // Cargar favoritos
        setCocktails(favourites); // Actualizar la lista de cócteles con favoritos
      }
    }, [showFavourites, favourites])
  );

  return (
    <View style={styles.container}>
      {showFavourites ? (
        <View style={styles.favouritesHeader}>
          <Ionicons
            name="heart"
            size={30}
            color="tomato"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.favouritesText}>Favourite Cocktails</Text>
          <Ionicons
            name="heart"
            size={30}
            color="tomato"
            style={{ marginLeft: 10 }}
          />
        </View>
      ) : (
        <SearchBar onSearch={handleSearch} onOpenFilter={handleOpenFilter} />
      )}
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
        columnWrapperStyle={{ justifyContent: "space-around" }}
        style={{ width: "100%" }}
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
