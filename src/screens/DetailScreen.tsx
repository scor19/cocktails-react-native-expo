import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styles, detailStyles } from "../styles/Styles";
import Desplegable from "../components/Desplegable";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { favsService } from "../services/favsService";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Ingredient = {
  ingredient: string;
  measure: string;
};

type misc = {
  alcoholic: string;
  glass: string;
  category: string;
  iba: string;
};

const DetailScreen = ({ route }: any) => {
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [isMiscOpen, setIsMiscOpen] = useState(false);
  const { cocktail } = route.params;
  const ingredients = cocktail.ingredients;
  const misc = {
    alcoholic: cocktail.strAlcoholic,
    glass: cocktail.strGlass,
    category: cocktail.strCategory,
    iba: cocktail.strIBA,
  };
  const [isFavourite, setIsFavourite] = useState(false);

  // Valor compartido para la animación de escala
  const scale = useSharedValue(1);

  // Estilo animado para cambiar la escala del corazón
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const toggleFavourite = async () => {
    if (isFavourite) {
      await favsService.removeFavourite(cocktail.idDrink);
    } else {
      await favsService.addFavourite(cocktail);
    }

    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });

    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    const checkIfFavourite = async () => {
      const result = await favsService.isFavourite(cocktail.idDrink);
      setIsFavourite(result);
    };

    checkIfFavourite();
  }, [cocktail]);

  useEffect(() => {
    setIsIngredientsOpen(false);
    setIsMiscOpen(false);
  }, [cocktail]);

  return (
    <View style={detailStyles.detailContainer}>
      <Text style={detailStyles.textName}>{cocktail.strDrink}</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={detailStyles.imageContainer}>
          <Image
            source={{ uri: cocktail.strDrinkThumb }}
            style={detailStyles.image}
          />
          <TouchableOpacity
            style={detailStyles.favButton}
            onPress={toggleFavourite}
          >
            <Animated.View style={animatedStyle}>
              <Ionicons
                name="heart"
                size={30}
                color={isFavourite ? "tomato" : "#1E1F28"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setIsIngredientsOpen(!isIngredientsOpen)}
          >
            <Desplegable
              isDesplegableOpen={isIngredientsOpen}
              DesplegableTitle="Ingredients"
              DesplegableList={ingredients}
              renderItem={(
                item: { ingredient: string; measure: string },
                index: number
              ) => (
                <>
                  <Text style={{ color: "white" }}>{item.ingredient}</Text>
                  <Text style={{ color: "white" }}>{item.measure}</Text>
                </>
              )}
            />
          </TouchableOpacity>
        </View>
        <View style={detailStyles.instructionsContainer}>
          <Text style={detailStyles.text}>{cocktail.strInstructions}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsMiscOpen(!isMiscOpen)}>
          <Desplegable
            isDesplegableOpen={isMiscOpen}
            DesplegableTitle="Miscellaneous"
            DesplegableList={Object.entries(misc).map(([key, value]) => ({
              key,
              value,
            }))}
            renderItem={(
              item: { key: string; value: string },
              index: number
            ) => (
              <View key={index}>
                <Text style={{ color: "white" }}>{item.value}</Text>
              </View>
            )}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
