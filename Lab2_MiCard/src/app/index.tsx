import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/images/Klein_Moretti.png')} 
        />
        <Text style={styles.name}>Hoang LT</Text>
        <Text style={styles.job}>React Native Developer</Text>
      </View>

      {/* Form Thông tin */}
      <View style={styles.formSection}>
        <Text style={styles.label}>Your Email</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={16} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="reactnative.developer@gmail.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={16} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="+84 394 281 107"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>Your Username</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={16} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Klein.S.Moretti_36"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#1E90FF",
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  job: {
    fontSize: 16,
    color: "#666666",
    marginTop: 4,
  },
  formSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginTop: 15,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: "#F9F9F9",
  },
  input: {
    flex: 1,
    height: 44,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
});

export default ProfileScreen;