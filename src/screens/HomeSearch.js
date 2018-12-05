import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeSearch extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };
        this.arrayholder = [];
    }
    
// Start cicle life    
componentWillMount() {
    this.makeRemoteRequest();
}

makeRemoteRequest = () => {
    const url = `https://vortigo.blob.core.windows.net/files/pokemon/data/pokemons.json`;
    this.setState({ loading: false })

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
        data: responseJson,
        });
        this.arrayholder = responseJson;
    })
    .catch(error => {
        this.setState({ error, loading: false });
    });
  };

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
//Ending cicle life

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
    )}

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

renderSeparator = () => {
    return (
        <View style={{ height: 1, width: '86%', backgroundColor: '#CED0CE', marginLeft: '14%'}} />
    );
};

//Search Names function
searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    this.setState({
        data: newData,
    });
};

render() {
    if (this.state.loading) {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <View style={{ height: 80, width: '100%', backgroundColor: '#48d4a6' }}>
                <View style={{ marginTop: 20, paddingLeft: 1, paddingRight: 1, flexDirection: 'row' }}>
                    <TextInput
                        style={{
                            height: 60,
                            width: '100%', 
                            borderColor: 'gray', 
                            borderWidth: 1, 
                            backgroundColor: '#d0cfcf',
                            textAlign: 'center',
                            justifyContent: 'center',
                            padding: 10
                            }}
                        placeholder='Search'
                        placeholderTextColor= '#a19f9f'
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        />
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
                    <Icon name='arrow-up' size={20} />
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
