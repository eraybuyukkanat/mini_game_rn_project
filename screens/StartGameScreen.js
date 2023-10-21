import { TextInput, Button, View, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { StyleSheet } from "react-native";
import { useState } from "react";

function StartGameScreen({onPickNumber}) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler(){
    setEnteredNumber('')
  }

  function confirmInputHandler(){
    const chosenNumber = parseInt(enteredNumber)

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert("Something wrong...","Invalid value!",[{text: "Okay",style: "destructive", onPress: resetInputHandler}])
      return;
    }

    console.log("valid number");
    onPickNumber(enteredNumber)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        value={enteredNumber}
        onChangeText={numberInputHandler}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>RESET</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>CONFIRM</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    backgroundColor: "#3b021f",
    borderRadius: 8,
    elevation: 10,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});
