import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAudioPlayer, AudioPlayer } from "expo-audio";

const soundFiles = [
  require("../../assets/sounds/note1.wav"),
  require("../../assets/sounds/note2.wav"),
  require("../../assets/sounds/note3.wav"),
  require("../../assets/sounds/note4.wav"),
  require("../../assets/sounds/note5.wav"),
  require("../../assets/sounds/note6.wav"),
  require("../../assets/sounds/note7.wav"),
];

const colors = [
  "#E74C3C",
  "#E67E22",
  "#F1C40F",
  "#2ECC71",
  "#084d21",
  "#3498DB",
  "#9B59B6",
];

export default function XylophoneApp() {
  const players = useRef<AudioPlayer[]>([]);

  useEffect(() => {
    soundFiles.forEach((file, index) => {
      try {
        players.current[index] = createAudioPlayer(file);
      } catch (error) {
        console.log(`Error loading sound ${index + 1}:`, error);
      }
    });

    return () => {
      players.current.forEach((player) => {
        if (player) {
          player.release();
        }
      });
    };
  }, []);

  const playSound = (index: number) => {
    try {
      const player = players.current[index];
      if (player) {
        player.seekTo(0);
        player.play();
      }
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {soundFiles.map((_, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={[styles.key, { backgroundColor: colors[index] }]}
          onPress={() => playSound(index)}
        >
          <Text style={styles.text}>{index + 1}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  key: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});