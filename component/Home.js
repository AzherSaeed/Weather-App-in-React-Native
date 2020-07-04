import React   , {useState , useEffect} from 'react';
import { TextInput , Button , Card  , Title} from 'react-native-paper';
import {View , Text   , FlatList , Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'


export const Home = (props) => {
    const [info , setInfo] = useState({
        name: "loading!!",
        temp : 'loading',
        humidity : 'loading',
        icon : 'loading'
    })

    useEffect(() => {
       getWeather()
    })
    const getWeather = async () => {
        let Mycity = await AsyncStorage.getItem('newcity')
        if(!Mycity){
            const {city} = props.route.params
            Mycity = city
        }
        


        const url = `https://api.openweathermap.org/data/2.5/weather?q=${Mycity}&appid=140a745aaf1f0e7d10a471940d0b8229&units=metric`
        fetch(url).then(data => data.json())
        .then(results => {
          setInfo ({
              name : results.name,
              temp : results.main.temp,
              humidity : results.main.humidity,
              desc : results.weather[0].description,
              icon : results.weather[0].icon
          })
        })
        .catch(err => {
            alert(err.message)
        })  
    }
    if(props.route.params.city != 'london'){
        getWeather()
    }
    return (
       <View>
            <View>
                <Title style={{color : 'red' , marginTop : 30 , fontSize : 30}} >
                    {info.name}
                </Title>
                <Image 
                    style={{width  : 120 , height : 120}}
                    source={require('./assets/d94a8cea609a24c5f3cddea6b7eca593.jpg')}
                />
            </View>
            <Card style={{
                margin : 5 , padding : 12
            }} >
                <Title>Temperature - {info.temp}</Title>
            </Card>
            <Card style={{
                margin : 5 , padding : 12
            }} >
                <Title>Humidity - {info.humidity}</Title>
            </Card>
            <Card style={{
                margin : 5 , padding : 12
            }} >
                <Title>Description - {info.desc}</Title>
            </Card>
            
       </View>
    )
}
