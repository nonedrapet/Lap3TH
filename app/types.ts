import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp as StackNavigationPropType } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type TabParamList = {
  "Cuộc gọi": undefined;
  "Yêu thích": undefined;
  "Danh bạ": undefined;
};

export type RootStackParamList = {
  Contacts: undefined;
  ContactDetail: { contact: Contact };
};

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

// Define the type for tab navigation prop
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

// Define the type for stack navigation prop
export type StackNavigationProp = StackNavigationPropType<RootStackParamList>;

// Define the type for route prop in ContactDetailScreen
export type ContactDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ContactDetail"
>;
