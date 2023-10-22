import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
export default function App() {
  const [userNumber, setUserNumber] = useState();

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.root_screen}>
      <ImageBackground
        resizeMode="cover"
        style={styles.root_screen}
        imageStyle={styles.background_style}
        source={require("./assets/images/background.png")}
      >
        <SafeAreaView style={styles.root_screen}>
        {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root_screen: {
    flex: 1,
  },
  background_style: {
    opacity: 0.15,
  },
});
