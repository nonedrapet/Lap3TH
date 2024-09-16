import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface NumericKeypadProps {
  onPressNumber: (number: string) => void;
  onDelete: () => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onPressNumber,
  onDelete,
}) => {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handlePressIn = (number: string) => {
    setPressedButton(number);
  };

  const handlePressOut = () => {
    setPressedButton(null);
  };

  const renderButton = (title: string, onPress: () => void) => (
    <TouchableOpacity
      style={[styles.button, { opacity: pressedButton === title ? 0.7 : 1 }]}
      onPressIn={() => handlePressIn(title)}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.keypadContainer}>
      <View style={styles.row}>
        {["1", "2", "3"].map((num) =>
          renderButton(num, () => onPressNumber(num))
        )}
      </View>
      <View style={styles.row}>
        {["4", "5", "6"].map((num) =>
          renderButton(num, () => onPressNumber(num))
        )}
      </View>
      <View style={styles.row}>
        {["7", "8", "9"].map((num) =>
          renderButton(num, () => onPressNumber(num))
        )}
      </View>
      <View style={styles.row}>
        {renderButton("Del", onDelete)}
        {renderButton("0", () => onPressNumber("0"))}
        {renderButton("+", () => onPressNumber("+"))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keypadContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    padding: 15,
    margin: 5,
    width: 115,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
  },
});

export default NumericKeypad;
