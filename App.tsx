import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./routes/HomeStack";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <HomeStack />
    </NavigationContainer>
  );
}
