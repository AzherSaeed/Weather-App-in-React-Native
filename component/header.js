import * as React from 'react';
import { Appbar , Title } from 'react-native-paper';
import {View} from 'react-native'
const Header = () => {
  

  return (
    <Appbar.Header style={{}}
    >
      <Title style={{color : 'white'}} >Weather App</Title>
    </Appbar.Header>
  );
};

export default Header;
