import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

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

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    console.log(currentGuess);
    console.log(userNumber);
    if (currentGuess == userNumber) {
      onGameOver(guessRounds);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundaries = 1;
    maxBoundaries = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Somethings wrong..", "Wrong");
      return;
    }

    if (direction === "lower") {
      maxBoundaries = currentGuess;
    } else {
      minBoundaries = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundaries,
      maxBoundaries,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess!</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => {
                nextGuessHandler("lower");
              }}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => {
                nextGuessHandler("greater");
              }}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item}
          data={guessRounds}
          renderItem={({ item, index }) => {
            return (
              <GuessLogItem
                guess={item}
                roundNumber={guessRoundsListLength - index}
              />
            );
          }}
        />
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
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
