import { Text, View, StyleSheet } from "react-native";
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}


let minBoundaries = 1;
let maxBoundaries = 100;

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(minBoundaries, maxBoundaries, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction){
    if(direction === "lower"){
      maxBoundaries = currentGuess;
    }else{
      minBoundaries = currentGuess+1;
    }
    const newRndNumber = generateRandomBetween(minBoundaries,maxBoundaries,currentGuess);
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess!</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={()=>{nextGuessHandler("lower")}}>-</PrimaryButton>
          <PrimaryButton onPress={()=>{nextGuessHandler("greater")}}>+</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
