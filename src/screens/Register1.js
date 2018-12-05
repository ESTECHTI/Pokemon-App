import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, TextInput, Text, TouchableOpacity }from 'react-native';
import MainBackground from '../../assets/bg.png';
import nextImage from '../../assets/next.png';
import { modificaAdicionaContatoName } from '../actions/AppActions';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class Register1 extends Component {
    render() {

        onPressNext = () => {
            Actions.register2({texto: this.props.adiciona_contato_name})
        }

        return(
            <ImageBackground source={MainBackground} style={styles.background}>
                <View style={styles.title}>
                    <Text style={styles.text1}>Let's meet each other first?</Text>
                </View>
                <View style={styles.subtitle}>
                    <Text style={styles.text2}>First we need to know your{"\n"}name...</Text>
                </View>
                <View style={styles.inputText}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(texto) => this.props.modificaAdicionaContatoName(texto) }
                        value={this.props.adiciona_contato_name}
                    />
                </View>
                <TouchableOpacity
                    onPress={onPressNext}
                >
                    <Image source={nextImage} style={styles.nextImage}/>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      },
      input: {
          borderBottomWidth: 2,
          borderBottomColor: '#fff',
          color: '#fff',
          height: 40,
          width: 300
      },
      title: {
        flex: 1,  
        marginTop: 80,
        justifyContent: 'flex-start',
      },    
      subtitle: {
        flex: 1
      },
      text1: {
          fontSize: 20,
          color: '#fff'
      },
      text2: {
        fontSize: 18,
        color: '#fff'
    },
    inputText: {
        flex: 3,
        color: '#fff',
        fontSize: 18
    }
})

const mapStateToProps = state => (
    {
        adiciona_contato_name: state.AppReducer.adiciona_contato_name
    }
)

export default connect(mapStateToProps, { modificaAdicionaContatoName })(Register1)