import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { cardStyles } from "../styles/Styles";

const Card = ({ cocktail, onPress, isPreview }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={cardStyles.card}>
      <View style={cardStyles.cardBackground}>
        <Image
          source={{
            uri: isPreview
              ? `${cocktail.strDrinkThumb}/preview`
              : cocktail.strDrinkThumb,
          }}
          style={cardStyles.image}
        />
        <Text style={cardStyles.textName}>{cocktail.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
