import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const diceImages = [
  require("../../assets/images/dice1.jpg"),
  require("../../assets/images/dice2.jpg"),
  require("../../assets/images/dice3.jpg"),
  require("../../assets/images/dice4.jpg"),
  require("../../assets/images/dice5.jpg"),
  require("../../assets/images/dice6.jpg"),
];

const DiceApp = () => {
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);

  const rollDice = () => {
    setDice1(Math.floor(Math.random() * 6));
    setDice2(Math.floor(Math.random() * 6));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={rollDice} activeOpacity={0.7}>
          <Image source={diceImages[dice1]} style={styles.dice} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={rollDice} activeOpacity={0.7}>
          <Image source={diceImages[dice2]} style={styles.dice} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ffbf",
  },
  diceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dice: {
    width: 130,
    height: 130,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
});

export default DiceApp;