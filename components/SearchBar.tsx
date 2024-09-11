import React from "react";
import { TextInput, View } from "react-native";
import { searchBarStyles } from "../styles/Styles";
import Ionicons from "@expo/vector-icons/build/Ionicons";

interface SearchBarProps {
  onSearch: (text: string) => void; // Define el tipo de la función de callback
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style={searchBarStyles.searchBarContainer}>
      <View style={searchBarStyles.inputWrapper}>
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={searchBarStyles.searchIcon}
        />
        <TextInput
          style={searchBarStyles.searchBar}
          placeholder="Buscar tragos..."
          onChangeText={(text) => onSearch(text)} // Ejecuta la función de callback
          placeholderTextColor="gray"
          selectionColor={"white"}
          autoCorrect={false}
          clearButtonMode="always"
          onSubmitEditing={(event) => onSearch(event.nativeEvent.text)}
          underlineColorAndroid={"transparent"}
          textAlignVertical="center"
          textAlign="left" // Alinear el texto a la izquierda para que el icono se vea bien
          returnKeyType="search"
        />
      </View>
    </View>
  );
};

export default SearchBar;
