import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [result, setResult] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const checkValues = () => {
    let check = true;
    if (isNaN(x) && !isNaN(y)) {
      check = false;
      setResult('Type the first value please')
    } else if (!isNaN(x) && isNaN(y)) {
      check = false;
      setResult('Type the second value please')
    } else if (isNaN(x) && isNaN(y)) {
      check = false;
      setResult('Type the values please')
    }
    return (check);
  }

  const makeMinus = () => {
    let check = checkValues();
    if (check) {
      setResult(`Result: ${x - y}`);
    }
  }

  const makePlus = () => {
    if (checkValues()) {
      setResult(`Result: ${x + y}`);
    }
  }

  const clearAll = () => {
    Keyboard.dismiss();
    setResult('');
    setX('');
    setY('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <Text>{result}</Text>
      <TextInput
        style={styles.textfield}
        onChangeText={currValue => setX(parseInt(currValue))}
        value={x}
        keyboardType='numeric'
      />
      <TextInput
        keyboardType='numeric'
        style={styles.textfield}
        onChangeText={currValue => setY(parseInt(currValue))}
        value={y}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={makePlus} title='+' />
        <Button onPress={makeMinus} title='-' />
      </View>
      <Button onPress={clearAll} title='Clear' />
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
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
});
