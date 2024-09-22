import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { detailStyles } from "../styles/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface DesplegableProps<T> {
  isDesplegableOpen: boolean;
  DesplegableTitle: string;
  DesplegableList: T[];
  renderItem: (item: T, index: number) => React.ReactNode | null;
}

const Desplegable = <T,>({
  isDesplegableOpen,
  DesplegableTitle,
  DesplegableList,
  renderItem,
}: DesplegableProps<T>) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(isDesplegableOpen ? 0 : 90, { duration: 300 });
  }, [isDesplegableOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={detailStyles.desplegable}>
      <View style={detailStyles.desplegableRow}>
        <Text style={detailStyles.text}>{DesplegableTitle}</Text>
        <Animated.View style={animatedStyle}>
          <Ionicons name="chevron-down" size={24} color="white" />
        </Animated.View>
      </View>
      {isDesplegableOpen && (
        <View>
          {DesplegableList.map((item: any, index: number) => {
            return item.value !== null ? (
              <View key={index} style={detailStyles.desplegableItem}>
                {renderItem(item, index)}
              </View>
            ) : null; // No renderiza nada si item.value es null
          })}
        </View>
      )}
    </View>
  );
};

export default Desplegable;
