import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { searchBarStyles } from "../styles/Styles";
import Ionicons from "@expo/vector-icons/build/Ionicons";

interface SearchBarProps {
  onSearch: (text: string) => void; // Define el tipo de la función de callback
  onOpenFilter: () => void; // Prop para abrir el modal desde el SearchBar
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onOpenFilter }) => {
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
          placeholder="Search drinks..."
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
        <TouchableOpacity onPress={onOpenFilter}>
          <Ionicons name="filter" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
