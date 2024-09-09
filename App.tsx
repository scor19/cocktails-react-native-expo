import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "./styles/Styles";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./routes/HomeStack";

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
