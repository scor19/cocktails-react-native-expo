import React from "react";
import { TextInput, View } from "react-native";
import { searchBarStyles } from "../styles/Styles";

interface SearchBarProps {
  onSearch: (text: string) => void; // Define el tipo de la función de callback
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style={searchBarStyles.searchBarContainer}>
      <TextInput
        style={searchBarStyles.searchBar}
        placeholder="Buscar tragos..."
        onChangeText={(text) => onSearch(text)} // Ejecuta la función de callback
        placeholderTextColor="gray"
        selectionColor={"white"}
      />
    </View>
  );
};

export default SearchBar;
