import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MainBackground from '../../assets/bg.png';
import Logo from '../../assets/pokemon-logo.png';
import Subtitle from '../../assets/finder.png';
import Pikachu from '../../assets/pikachu.png';

import { Actions } from 'react-native-router-flux';

export default class App extends Component {

  render() {

    const firstPage = () => {
      Actions.register()
    }

    return (
      <ImageBackground source={MainBackground} style={styles.background}>
        <View style={styles.logos}>
          <Image source={Logo} />
          <Image source={Subtitle} />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={firstPage}
            style={styles.buttonGo}
          >
            <Text style={styles.text}>Let's go!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastPic}>
          <Image source={Pikachu} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  text: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  logos: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGo: {
    width: 250,
    height: 50,
    backgroundColor: '#cc1266',
    borderRadius: 5
  },
  lastPic: {
    width:'100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
});
