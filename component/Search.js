import React   , {useState} from 'react';
import { TextInput , Button , Card } from 'react-native-paper';
import {View , Text   , FlatList} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const Search = ({navigation}) => {
  const [city , setCity] = useState('')
  const [cities , setCities] = useState([])

  
  const fetchCities = (text) => {
    setCity(text)
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+text+'&appid=140a745aaf1f0e7d10a471940d0b8229'
    fetch(url)
    .then(response => response.json())
    .then(item => {
      setCities(item.RESULTS.slice(0,9))
    })
    .catch(err => console.log('this is error regarding fetch city' , err))
  }

  const btnCliked = async() => {
    await AsyncStorage.setItem('newcity' , city )
    navigation.navigate('Home' , {city : city})
  }  
  const listclick = async(cityName) => {
    setCity(cityName)
    await AsyncStorage.setItem('newcity' , cityName )
    navigation.navigate('Home' , {city : cityName}) 
  }
  return (
   <View >
       <TextInput
       label="City Name"
      //  theme={{colors : {primary : "#00aaff"}}}
       value={city}
       onChangeText={(text)=> fetchCities(text)}
       />
       <Button
       mode="contained"
       style={{margin : 20}}
       onPress={() => btnCliked()}
       > <Text>Search</Text> 
       </Button>
       <FlatList
       data={cities}
       renderItem={({item}) => {
         return(
           <Card style={{margin : 2 , padding  : 12}}
           onPress={() => listclick(item.name)}
           >
             <Text>{item.main.temp}</Text>
           </Card>
         )
       }}
       keyExtractor={item => item.main.temp}
       />
   </View>
  );
};
export default Search;
