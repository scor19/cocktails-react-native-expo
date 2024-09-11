import { View, Text, Image } from "react-native";
import React from "react";
import { styles, detailStyles } from "../styles/Styles";

const DetailScreen = ({ route }: any) => {
  const { cocktail } = route.params;

  return (
    <View style={styles.container}>
      <View style={detailStyles.detailContainer}>
        <Text style={detailStyles.textName}>{cocktail.strDrink}</Text>
        <Image
          source={{ uri: cocktail.strDrinkThumb }}
          style={detailStyles.image}
        />
        <Text style={detailStyles.text}>{cocktail.strInstructions}</Text>
        <Text style={detailStyles.text}>{cocktail.strAlcoholic}</Text>
        <Text style={detailStyles.text}>{cocktail.strGlass}</Text>
        <Text style={detailStyles.text}>{cocktail.strCategory}</Text>
        <Text style={detailStyles.text}>{cocktail.strIBA}</Text>
      </View>
    </View>
  );
};

export default DetailScreen;
