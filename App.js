import { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [info, setInfo] = useState('Guess a number between 1-100');
  const [number, setNumber] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [again, setAgain] = useState(false);
  const [guessesNumber, setGuessesNumber] = useState(1);

  const makeRandomNumber = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
  }

  useEffect(() => {
    makeRandomNumber();
  }, []);

  const makeGuess = () => {
    if (isNaN(userGuess)) {
      setInfo('Please type your number');
    } else {
      setGuessesNumber(prevValue => prevValue + 1);
      if (userGuess === number) {
        Alert.alert(`You guessed the number in ${guessesNumber} guesses`);
        setInfo(`You guessed the number (${number}) in ${guessesNumber} guesses`);
        setAgain(true);
      } else if (userGuess < number) {
        setInfo(`Your guess ${userGuess} is too low`);
      } else {
        setInfo(`Your guess ${userGuess} is too high`);
      }
    }
  }

  const startAgain = () => {
    setAgain(false);
    makeRandomNumber();
    setInfo('Guess a number between 1-100');
    setGuessesNumber(1);
    setUserGuess('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <Text>{info}</Text>
      <TextInput
        editable={!again}
        style={styles.textfield}
        onChangeText={currValue => setUserGuess(parseInt(currValue))}
        value={userGuess}
        keyboardType='numeric'
      />
      {!again && <Button onPress={makeGuess} title='Make Guess' />}
      {again && <Button onPress={startAgain} title='Start Again' />}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  textfield:
  {
    height: 30,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1
  }
});
