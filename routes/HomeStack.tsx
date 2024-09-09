import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeStack;
