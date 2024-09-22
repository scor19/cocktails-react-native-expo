import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./src/routes/HomeStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "./src/styles/Styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavouritesProvider } from "./src/contexts/favsContext";

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="light" />
          <FavouritesProvider>
          <HomeStack />
          </FavouritesProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
