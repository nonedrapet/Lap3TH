import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CallScreen from "./screens/CallScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import ContactsScreen from "./screens/ContactsScreen";
import ContactDetailScreen from "./screens/ContactDetailScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ContactsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Contacts" component={ContactsScreen} />
    <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Cuộc gọi") {
            iconName = "phone";
          } else if (route.name === "Yêu thích") {
            iconName = "heart";
          } else if (route.name === "Danh bạ") {
            iconName = "address-book";
          }

          return <FontAwesome6 name={iconName} size={size} color={"black"} />;
        },
      })}
    >
      <Tab.Screen name="Cuộc gọi" component={CallScreen} />
      <Tab.Screen name="Yêu thích" component={FavoriteScreen} />
      <Tab.Screen name="Danh bạ" component={ContactsStack} />
    </Tab.Navigator>
  );
}
