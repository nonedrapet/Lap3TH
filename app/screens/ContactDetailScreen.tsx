import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "ContactDetail">;

const ContactDetailScreen: React.FC<Props> = ({ route }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết liên hệ</Text>
      <Text style={styles.detail}>Tên: {contact.name}</Text>
      <Text style={styles.detail}>Số điện thoại: {contact.phone}</Text>
      <Text style={styles.detail}>Email: {contact.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ContactDetailScreen;
