import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/DetailScreen";
import BottomTab from "../navigation/BottomTab";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomTabs" component={BottomTab} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
  );
};

export default HomeStack;
