import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            dataSource: []
        };
    }

    //This renderItem is about the first FlatList
    renderItem = ({item}) => {

        let value = item;

        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flex: 1, marginTop: 5, justifyContent: 'space-between', padding: 5 }}>
                    <View style={{flex: 1, alignItems: 'center' }}>
                        <Image source={{ uri: value.thumbnailImage }} 
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{ paddingLeft: 5 }}>{value.name}</Text>
                    </View>
                </View>
            </View>
        )

      }

      //This renderItem is about the second FlatList
      renderItem2 = ({item}) => {

        let value = item;

        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flex: 1, marginTop: 5, justifyContent: 'space-between', padding: 5 }}>
                    <View style={{flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#4978dd' }}>
                            <Image source={{ uri: value.thumbnailImage }} 
                                style={{width: 40, height: 40}}
                            />
                        </View>
                        <Text style={{ paddingLeft: 5 }}>{value.name}</Text>
                    </View>
                </View>
            </View>
        )}

    // Start cicle life 
    //First FlatList
    componentDidMount () {
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
    
    //Second FlatList
    componentWillMount() {
        const url = `https://vortigo.blob.core.windows.net/files/pokemon/data/pokemons.json`;
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ data: responseJson });
        })
        .catch((error) => {
            console.log(error)
        })
    }
    //Ending cicle life

    renderSeparator = () => {
        return (
            <View style={{ height: 1, width: '86%', backgroundColor: '#CED0CE', marginLeft: '14%'}} />
        );
    };

    render() {
        if (this.state.loading) {
            return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator />
                </View>
            );
        }

        const searchPage = () => {
            Actions.homeSearch() 
        }

        console.disableYellowBox = true;

        return (
            <View style={{flex: 1, backgroundColor: '#fff',}}>
                <View style={{ height: 60, width: '100%', backgroundColor: '#48d4a6' }}>
                   <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View  style={{ width: '70%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 18, color: '#fff' }}>Pokémon Finder</Text>
                        </View>
                        <View style={{ width: '50%', marginLeft: 60 }}>
                            <TouchableOpacity
                                onPress={searchPage}
                            >
                                <Icon name='search' size={20} color='#fff' />
                            </TouchableOpacity>
                        </View>
                   </View>
                </View>

                {/* The first FlatList */}
                <View style={{ backgroundColor: '#fff', height: 80 }}>
                    <FlatList 
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        horizontal={true}
                        keyExtractor={item => item.name}
                    />
                    
                </View>

                <View style={{ backgroundColor: '#fff', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 5 }}>
                        <Text style={{ fontSize: 16 }}>Pokémon</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, left: 10 }}>Name</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 30 }}>
                        <TouchableOpacity
                            onPress={() => false}
                        >
                            <Icon name='arrow-up' size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* The second FlatList */}
                <View style={{flex: 1, backgroundColor: '#fff' }}>
                    <FlatList 
                        data={this.state.data}
                        renderItem={this.renderItem2}
                        keyExtractor={item => item.name}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </View>
        );
    }
}   
