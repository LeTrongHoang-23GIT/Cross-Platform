import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ballImages = [
  require("../../assets/images/ball1.png"),
  require("../../assets/images/ball2.png"),
  require("../../assets/images/ball3.png"),
  require("../../assets/images/ball4.png"),
  require("../../assets/images/ball5.png"),
];

const Magic8Ball = () => {
  const [ballImage, setBallImage] = useState(ballImages[0]);

  const shakeBall = () => {
    const randomIndex = Math.floor(Math.random() * ballImages.length);
    setBallImage(ballImages[randomIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={shakeBall} activeOpacity={0.8} style={styles.ballContainer}>
        <Image source={ballImage} style={styles.ball} fadeDuration={0} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ffb3",
  },
  ballContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default Magic8Ball;