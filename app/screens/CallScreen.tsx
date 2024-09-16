import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  TextInput,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import NumericKeypad from "./DialPadScreen";

interface Call {
  id: string;
  number: string;
  type: "incoming" | "outgoing" | "missed";
}

const { width, height } = Dimensions.get("window");

const CallScreen: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([
    { id: "1", number: "0987654321", type: "incoming" },
    { id: "2", number: "0123456789", type: "outgoing" },
    { id: "3", number: "0345678901", type: "missed" },
    { id: "4", number: "0567890123", type: "incoming" },
    { id: "5", number: "0789012345", type: "outgoing" },
    { id: "6", number: "0901234567", type: "missed" },
    { id: "7", number: "0123456789", type: "incoming" },
    { id: "8", number: "0234567890", type: "outgoing" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState<
    "all" | "incoming" | "outgoing" | "missed"
  >("all");

  const handleCall = (id: string, number: string) => {
    Linking.openURL(`tel:${number}`).catch((err) =>
      console.error("Failed to open dialer", err)
    );

    setCalls((prevCalls) =>
      prevCalls.map((call) =>
        call.id === id
          ? {
              ...call,
              type:
                call.type === "incoming" || call.type === "missed"
                  ? "outgoing"
                  : call.type,
            }
          : call
      )
    );
  };

  const handleCallFromInput = () => {
    if (newPhoneNumber.trim()) {
      Linking.openURL(`tel:${newPhoneNumber}`).catch((err) =>
        console.error("Failed to open dialer", err)
      );
      setNewPhoneNumber("");
      setIsModalVisible(false);
    }
  };

  const handlePressNumber = (number: string) => {
    setNewPhoneNumber((prev) => prev + number);
  };

  const handleDelete = () => {
    setNewPhoneNumber((prev) => prev.slice(0, -1));
  };

  const filteredCalls = calls.filter((call) =>
    filter === "all" ? true : call.type === filter
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách cuộc gọi:</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            setFilter((prevFilter) => {
              if (prevFilter === "all") return "incoming";
              if (prevFilter === "incoming") return "outgoing";
              if (prevFilter === "outgoing") return "missed";
              if (prevFilter === "missed") return "all";
              return "all";
            })
          }
        >
          <FontAwesome6 name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.callItem,
              item.type === "incoming" && { backgroundColor: "#ffdddd" },
              item.type === "missed" && { backgroundColor: "#ffebeb" },
            ]}
            onPress={() => handleCall(item.id, item.number)}
          >
            <View style={styles.callTextContainer}>
              <Text style={styles.callIcon}>
                {item.type === "incoming" ? (
                  <Feather name="phone-incoming" size={20} color="red" />
                ) : item.type === "outgoing" ? (
                  <Feather name="phone-outgoing" size={20} color="green" />
                ) : (
                  <Feather name="phone-missed" size={20} color="orange" />
                )}
              </Text>
              <Text
                style={[
                  styles.callText,
                  item.type === "incoming" && { color: "red" },
                  item.type === "missed" && { color: "orange" },
                ]}
              >
                {item.type === "incoming"
                  ? "Cuộc gọi đến"
                  : item.type === "outgoing"
                  ? "Cuộc gọi đi"
                  : "Cuộc gọi nhỡ"}
                : {item.number}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="keypad" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập số điện thoại:</Text>
            <TextInput
              style={styles.input}
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              keyboardType="phone-pad"
            />
            <View style={styles.keypadAndButtonsContainer}>
              <NumericKeypad
                onPressNumber={handlePressNumber}
                onDelete={handleDelete}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.callButton]}
                  onPress={handleCallFromInput}
                >
                  <Entypo name="phone" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Feather name="phone-off" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterButton: {
    padding: 10,
  },
  callItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  callTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  callIcon: {
    marginRight: 10,
  },
  callText: {
    fontSize: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 50,
    right: 175,
    width: 60,
    height: 60,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: width,
    height: height * 0.7,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  keypadAndButtonsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 100,
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: "green",
    paddingVertical: 15,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 15,
  },
});

export default CallScreen;
