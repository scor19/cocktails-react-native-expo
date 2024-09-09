import { View, Text, Image } from "react-native";
import React from "react";
import { cardStyles } from "../styles/Styles";

const Card = ({ cocktail }: any) => {
  return (
    <View style={cardStyles.card}>
      <Image
        source={{ uri: cocktail.strDrinkThumb }}
        style={cardStyles.image}
      />
      <Text style={cardStyles.textName}>{cocktail.strDrink}</Text>
    </View>
  );
};

export default Card;
