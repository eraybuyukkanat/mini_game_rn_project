import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";
export default function App() {
  const [userNumber, setUserNumber] = useState();

  const [gameIsOver,setGameIsOver] = useState(true);

  const [fontsLoaded] = useFonts({
    "open-sans":require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold":require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false)
  }

  function gameOverHandler(){
    setGameIsOver(true)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  

  if (userNumber) {
    screen = <GameScreen  userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen />
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
