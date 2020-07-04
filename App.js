import * as React from 'react';
import {Text,  View , TextInput , Button ,StatusBar }  from 'react-native';
import Header from './component/header'
import Search from './component/Search'
import {Home} from './component/Home'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons   from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createBottomTabNavigator()
 const App = () => { 
 return (
  <>
  <StatusBar barStyle="dark-content" backgroundColor="lightgray"  />
  <Header/>
    <NavigationContainer>
      <Tab.Navigator 
        screenOption={({route}) => ({
          tabBarIcon : ({color}) => {
            let iconName ; 
            if(route.name === 'Home'){
              iconName = 'home-city-outline'
            }
            else if (route.name === 'Search'){
              iconName = 'city'
            }
            return <MaterialCommunityIcons name ={iconName} size={25} color = {color} />
          }
        })}
        tabBarOptions = {{
          activeTintColor : 'black',
          inactiveTintColor : 'blue',
          activeBackgroundColor : 'lightgray'
        }}
      >
        <Tab.Screen name="Home" component={Home} 
        initialParams = {{city : 'london '}}
        />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  </>
 );
}
export default App;


