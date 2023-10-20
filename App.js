import { StyleSheet, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import {LinearGradient} from 'expo-linear-gradient'
export default function App() {
  return (
    <LinearGradient colors={['#4e0329','#ddb52f']} style={styles.root_screen}>
      <ImageBackground resizeMode="cover" style={styles.root_screen} imageStyle={styles.background_style} source={require('./assets/images/background.png')}>
      <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root_screen: {
    flex: 1
  },
  background_style: {
    opacity: 0.15
  }
});
