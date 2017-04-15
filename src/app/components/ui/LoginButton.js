import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import * as stylings from '../../assets/styles/style'; 

const LoginButton = (props) => (
  <TouchableOpacity activeOpacity={.7} onPress={props.onPress} disabled={props.disabled}>
    <LinearGradient
      colors={['#fcb755', '#fcaa58', '#fca226']}
      style={styles.button}>
      <Text style={styles.text}>
        {props.children}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    height: 35,
    backgroundColor: 'transparent',
    width: stylings.width * .8,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 15, 
    alignItems: 'center', 
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#fff', 
  },
});