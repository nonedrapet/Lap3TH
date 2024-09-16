import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RootStackParamList, Contact } from "../types";

type ContactsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Contacts"
>;

interface Props {
  navigation: ContactsScreenNavigationProp;
}

const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Nguyen Van A",
      phone: "0123456789",
      email: "a@gmail.com",
    },
    {
      id: "2",
      name: "Tran Thi B",
      phone: "0987654321",
      email: "b@gmail.com",
    },
    {
      id: "3",
      name: "Le Thi C",
      phone: "0345678901",
      email: "lethi.c@gmail.com",
    },
    {
      id: "4",
      name: "Vo Van D",
      phone: "0456789012",
      email: "vovand@gmail.com",
    },
    {
      id: "5",
      name: "Hoang Thi E",
      phone: "0567890123",
      email: "hoangthi.e@gmail.com",
    },
    {
      id: "6",
      name: "Phan Van F",
      phone: "0678901234",
      email: "phanvan.f@gmail.com",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddContact = () => {
    if (newName.trim() && newPhone.trim() && newEmail.trim()) {
      const newContact = {
        id: Math.random().toString(),
        name: newName,
        phone: newPhone,
        email: newEmail,
      };
      setContacts((prevContacts) => {
        // Add new contact and sort alphabetically
        const updatedContacts = [...prevContacts, newContact];
        return updatedContacts.sort((a, b) => a.name.localeCompare(b.name));
      });
      setNewName("");
      setNewPhone("");
      setNewEmail("");
      setIsModalVisible(false);
    } else {
      Alert.alert("Error", "Please enter both name and phone number");
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  // Sort contacts alphabetically
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={sortedContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContactDetail", { contact: item })
            }
          >
            <View style={styles.contactItemContainer}>
              <Text style={styles.contactItemName}>{item.name}</Text>
              <Text style={styles.contactItemPhone}>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="pluscircleo" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Contact</Text>
            <TextInput
              placeholder="Name"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
            />
            <TextInput
              placeholder="Number"
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={newEmail}
              onChangeText={setNewEmail}
              style={styles.input}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddContact}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

// Styles here
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
    textAlign: "center",
  },
  contactItemContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginVertical: 10,
  },
  contactItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactItemPhone: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  contactItemEmail: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
});

export default ContactsScreen;
