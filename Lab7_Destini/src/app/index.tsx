import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const storyData = [
  {
    id: 0,
    storyText: "Bạn tỉnh dậy trong một căn phòng tối om, không nhớ lý do vì sao mình ở đây. Trước mặt bạn là một cánh cửa sắt đóng kín và một lối đi hẹp dẫn xuống tầng hầm. Bạn sẽ làm gì?",
    choice1: "Thử mở cánh cửa sắt xem có thoát ra được không.",
    choice1Destination: 1,
    choice2: "Đi xuống lối hẹp dẫn vào tầng hầm.",
    choice2Destination: 2,
  },
  {
    id: 1,
    storyText: "Cánh cửa sắt đã bị khóa chặt. Ngay lúc đó, bạn nghe thấy tiếng bước chân dồn dập đang tiến lại gần từ phía sau lưng. Bạn phải quyết định thật nhanh!",
    choice1: "Tìm chỗ trốn đằng sau chiếc tủ gỗ gần đó.",
    choice1Destination: 3,
    choice2: "Quay lại và chạy ngay xuống đường hầm.",
    choice2Destination: 2,
  },
  {
    id: 2,
    storyText: "Xuống hết cầu thang, bạn phát hiện một chiếc chìa khóa vạn năng nằm trên bàn. Đúng lúc này, tiếng động cơ xe cứu hộ vang lên phía trên mặt đất.",
    choice1: "Lấy chìa khóa và quay lại mở cửa sắt.",
    choice1Destination: 4,
    choice2: "Tìm lối thoát khác sâu hơn trong tầng hầm.",
    choice2Destination: 5,
  },
  {
    id: 3,
    storyText: "Kẻ bắt cóc phát hiện ra bạn đằng sau chiếc tủ. Bạn đã bị bắt lại! Trò chơi kết thúc.",
    choice1: "Chơi lại từ đầu",
    choice1Destination: 0,
    choice2: "",
    choice2Destination: 0,
  },
  {
    id: 4,
    storyText: "Bạn tra chìa khóa vào ổ, cánh cửa sắt mở tung! Bạn chạy ra ngoài và bắt kịp chiếc xe cứu hộ. Bạn đã thoát hiểm thành công!",
    choice1: "Chơi lại từ đầu",
    choice1Destination: 0,
    choice2: "",
    choice2Destination: 0,
  },
  {
    id: 5,
    storyText: "Tầng hầm bên dưới là một mê cung đường cống ngầm không có lối ra. Bạn bị mất phương hướng hoàn toàn. Trò chơi kết thúc.",
    choice1: "Chơi lại từ đầu",
    choice1Destination: 0,
    choice2: "",
    choice2Destination: 0,
  },
];

export default function App() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleChoice = (destinationIndex: number) => {
    setCurrentStoryIndex(destinationIndex);
  };

  const currentStory = storyData[currentStoryIndex];
  const isEndingStory = !currentStory.choice2;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.appTitle}>Destini</Text>

          <View style={styles.storyContainer}>
            <Text style={styles.storyText}>{currentStory.storyText}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.choiceButton,
                { backgroundColor: isEndingStory ? "#00ffbb" : "#ffea00" },
              ]}
              onPress={() => handleChoice(currentStory.choice1Destination)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: "#000000" },
                ]}
              >
                {currentStory.choice1}
              </Text>
            </TouchableOpacity>

            {!isEndingStory && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.choiceButton, { backgroundColor: "#ff0000" }]}
                onPress={() => handleChoice(currentStory.choice2Destination)}
              >
                <Text style={styles.buttonText}>{currentStory.choice2}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding: 20,
    justifyContent: "space-between",
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  storyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  storyText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  choiceButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});