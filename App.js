/*
This example serves as a feature suggestion for WhatsApp. 
By using this feature, user can filter out messages from certain contacts until the 
filter is turned off. This would be pretty useful to put your WhatsApp in say "Work" mode, where 
messages would be displayed only from work contacts. Or you can enable "vacation" mode,
where messages from your work contacts are hidden. This concept can be expanded further.

Most of the layout for WhatsApp has been referred from following Link:
https://medium.com/react-native-training/react-native-uses-flexbox-to-layout-and-arrange-its-components-and-children-3dd4e8399bb
The layout shows pretty old UI for WhatsApp, but this example doesn't claim it to be perfect. 
One can refer to this example for:
- Feature suggestion
- React Native learning including usage of Flex layout, Modal dialogs, state changes and JSON
  datasource.
  
*/
import React, { Component } from 'react';
import Container from './components/Container';

export default class App extends Component {
  render() {
    return (
        <Container />
    );
  }
}