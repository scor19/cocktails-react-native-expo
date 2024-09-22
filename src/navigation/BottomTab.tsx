import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: "home" | "home-outline" | "heart" | "heart-outline" =
            "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favs") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ showFavourites: false }}
        options={{
          title: "Cocktails",
        }}
      />
      <Tab.Screen
        name="Favs"
        component={HomeScreen}
        initialParams={{ showFavourites: true }}
        options={{
          title: "Favourites",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
