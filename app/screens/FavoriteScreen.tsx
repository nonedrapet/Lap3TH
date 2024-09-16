import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Favorite {
  number: string;
  name: string;
}

const FavoriteScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([
    { number: "0123456789", name: "HAO" },
    { number: "0987654321", name: "GIANG" },
    { number: "0345678901", name: "Le Thi C" },
    { number: "0456789012", name: "Vo Van D" },
    { number: "0567890123", name: "Hoang Thi E" },
    { number: "0678901234", name: "Phan Van F" },
  ]);

  const [newFavoriteNumber, setNewFavoriteNumber] = useState("");
  const [newFavoriteName, setNewFavoriteName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleAddFavorite = () => {
    if (newFavoriteNumber.trim() && newFavoriteName.trim()) {
      if (!favorites.some((fav) => fav.number === newFavoriteNumber)) {
        setFavorites([
          ...favorites,
          { number: newFavoriteNumber, name: newFavoriteName },
        ]);
        setNewFavoriteNumber("");
        setNewFavoriteName("");
        setIsModalVisible(false);
      } else {
        Alert.alert(
          "Error",
          "This phone number is already in the favorites list."
        );
      }
    } else {
      Alert.alert("Error", "Please enter both name and phone number.");
    }
  };

  const handleDeleteFavorite = (number: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this favorite?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setFavorites((prevFavorites) =>
              prevFavorites.filter((fav) => fav.number !== number)
            );
          },
        },
      ]
    );
  };

  const filteredFavorites = favorites.filter((fav) =>
    fav.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Contacts:</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setSearchQuery("")}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setIsDeleteMode(!isDeleteMode)}
        >
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <View style={styles.favoriteTextContainer}>
              <Text style={styles.favoriteText}>
                {item.name}: {item.number}
              </Text>
              {isDeleteMode && (
                <TouchableOpacity
                  onPress={() => handleDeleteFavorite(item.number)}
                  style={styles.minusButton}
                >
                  <AntDesign name="minuscircleo" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
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
            <Text style={styles.modalTitle}>Add Favorite Contact</Text>
            <TextInput
              placeholder="Name"
              value={newFavoriteName}
              onChangeText={setNewFavoriteName}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone number"
              value={newFavoriteNumber}
              onChangeText={setNewFavoriteNumber}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddFavorite}
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
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  favoriteTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  favoriteText: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  minusButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteActionsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
  deleteConfirmButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
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
});

export default FavoriteScreen;
