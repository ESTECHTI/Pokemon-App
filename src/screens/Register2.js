import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Modal, Text, TouchableOpacity, FlatList }from 'react-native';
import MainBackground from '../../assets/bg.png';
import nextImage from '../../assets/next.png';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox-heaven';

export default class Register2 extends Component {

        state = {
            modalVisible: false,
            data: [],
            checked: false
          }
    
        handleOnChange(val) {
        this.setState({ checked: val })
        }
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible})
      }

      renderItem = ({item}) => {

        let value = item;

        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flex: 1, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: value.thumbnailImage }} 
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{ paddingLeft: 5 }}>{value.name}</Text>
                    </View>
                    <CheckBox
                            labelStyle={styles.labelStyle}
                            iconSize={28}
                            iconName='faCircleMix'
                            checked={this.state.checked}
                            checkedColor='#008080'
                            uncheckedColor='#008080'
                            onChange={this.handleOnChange.bind(this)}
                            disabled={false}
                            disabledColor='green'
                        />
                </View>
                <View style={{borderColor: '#dbd9d9', borderBottomWidth: 1, width: '100%', justifyContent: 'center', height: 1}} />
            </View>
        )

      }

      componentWillMount() {
          const url = 'https://vortigo.blob.core.windows.net/files/pokemon/data/types.json'
          fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({  dataSource: responseJson.results })
          })
          .catch((error) => {
              console.log(error)
          })
      }

    render() {

        const registertPage = () => {
            Actions.register()
          }

        const homePage = () => {
            Actions.home()
            this.setModalVisible(!this.state.modalVisible)
        }

        const homePage2 = () => {
            Actions.home()
        }

        return(
            <ImageBackground source={MainBackground} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.angleLeft}>
                        <TouchableOpacity
                            onPress={registertPage}
                        >
                            <Icon name="angle-left" size={60} color='#fff' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text1}>Hello, {this.props.texto}</Text>
                    </View>
                    <View style={styles.subtitle}>
                        <Text style={styles.text2}>...now tell us which is your favorite{"\n"}Pokémon type:</Text>
                    </View>
                    <View style={styles.inputText}>
                        <TouchableOpacity
                            onPress={() => {this.setModalVisible(true)}}
                            style={styles.modal}
                        > 
                            <View style={styles.angleDown}>
                                <Icon name="angle-down" size={60} color='#fff' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={homePage2}
                >
                    <Image source={nextImage} style={styles.nextImage}/>
                </TouchableOpacity>
                    

        <Modal 
          animationType= 'slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {Alert.alert("Modal has been closed")}}
        >
            <View style={{flex: 1, marginTop: 200, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', padding: 10}}>
                <View style={styles.containerModal}>
                    <Text style={{ fontSize: 16 }}>Select your favorite pokémon{"\n"}type</Text>
                    <TouchableOpacity 
                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                    >
                        <Icon name="times-circle" size={20} color='#dbd6d6' />
                    </TouchableOpacity>
                </View>

            <View style={{flex: 1}}>
                <FlatList 
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.name}
                    horizontal={false}
                />
            </View>

             <View style={styles.buttomModal}>
                    <TouchableOpacity 
                        onPress={homePage}
                        style={styles.buttonGo}
                    >
                        <Text style={styles.text1}>Confirm</Text>
                    </TouchableOpacity>
            </View>


          </View>
        </Modal>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerModal: {
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
        height: 60,
        marginBottom: 15
    },
    buttomModal: {
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: 60,
        marginTop: 5
    },
    buttonGo: {
        alignItems: 'center', 
        justifyContent: 'center',
        width: 250,
        height: 50,
        backgroundColor: '#cc1266',
        borderRadius: 5
      },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      },
      angleLeft: {
          flex:1,
        width: '80%',
        justifyContent: 'flex-start',
        marginTop: 30,
      },
      icon: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      },    
      modal: {
          borderBottomWidth: 2,
          borderBottomColor: '#fff',
          height: 40,
          width: 300,
      },
      angleDown: {
        bottom: 15,
        alignItems: 'flex-end',
        width: '100%'
      },    
      title: {
        flex: 5,  
        marginTop: 80,
        justifyContent: 'flex-start',
      },    
      subtitle: {
        flex: 4
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
        flex: 6
    },
    labelStyle: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2f4f4f',
      }
})
