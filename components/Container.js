import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  Image,
  Modal,
  Button,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false,
      modalVisible: false,
      filterMode: 0,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setFilterMode = this.setFilterMode.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
    this.filteredData = [];
  }

  componentWillMount() {
    let data = this.getFilteredData();
    console.log(data);
    this.setState({
      peopleDataSource: ds.cloneWithRows(response, this.filteredData),
      loaded: true,
    });
  }
  
  getFilteredData() {
    let newDS = [];
    let filterMode = this.state.filterMode;
    const newData = response.filter(function(item) {
      if (item.cat == filterMode || filterMode == 0) {
        /* DataSource cloneWithRows method needs second parameter as 
           an array of indices. Our sample data uses ID from 1 to N and hence
           subtracting 1 before pushing it to the array.
        */
        newDS.push(item.id - 1); 
      }
    });
    this.filteredData = newDS;
    console.log("inside getFilteredData: " + this.filteredData);
    return newDS;
  }

  renderPersonRow(person) {
    let category = ""
    if(person.cat === 1) category = "Work";
    if(person.cat === 2) category = "Family & Friends";
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: person.image }}
            style={styles.initStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.callerDetailsContainer}>
          <View style={styles.callerDetailsContainerWrap}>
            <View style={styles.nameContainer}>
              <Text>{person.first_name}</Text>
              <View style={styles.dateContainer}>
                <MaterialIcon
                  name={person.missed ? 'call-missed' : 'call-received'}
                  size={15}
                  color={person.missed ? '#ed788b' : '#075e54'}
                />
                <Text
                  style={{ fontWeight: '400', color: '#666', fontSize: 12 }}>
                  {person.date} {person.time}
                </Text>
              </View>
              <View style={styles.nameContainer}>
                <Text>{category}</Text>
              </View>
            </View>
            <View style={styles.callIconContainer}>
              <MaterialIcon
                name="phone"
                color="#075e54"
                size={23}
                style={{ padding: 5 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  showModal() {
    console.log('hello');
    this.setState({ modalVisible: true });
  }
  hideModal() {
    console.log('hello2');
    this.setState({ modalVisible: false });
  }
  setFilterMode(mode) {
    console.log("setting filter mode: " + mode);
    this.setState({
      filterMode: mode,
    });
  }
  render() {
    this.getFilteredData();
    let newDS = ds.cloneWithRows(response, this.filteredData);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeaderContainer}>
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.rightHeaderContainer}>
            <MaterialIcon
              name="filter-list"
              color="#fff"
              size={23}
              style={{ padding: 5 }}
              onPress={this.showModal}
            />
            <MaterialIcon
              name="search"
              color="#fff"
              size={23}
              style={{ padding: 5, paddingRight: 0 }}
            />
            <MaterialIcon
              name="more-vert"
              color="#fff"
              size={23}
              style={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed');
            }}>
            <View style={styles.modalOuter}>
              <View style={styles.modalContent}>
                <View style={styles.modalOptionEmptySpace}>
                  <Text style={styles.modalOptionsTitle}>Choose Filter</Text>
                </View>
                <View style={styles.modalOptionIcons}>
                  <View style={styles.modalOptionIconsSpaceBetween}>
                    <Text />
                  </View>
                  <View>
                    <MaterialIcon
                      name={
                        this.state.filterMode == 0
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      // color="black"
                      style={
                        this.state.filterMode == 0
                          ? styles.checked
                          : styles.unchecked
                      }
                      onPress={() => this.setFilterMode(0)}
                    />
                  </View>
                  <View style={styles.modalOptionIconsSpaceBetween}>
                    <Text />
                  </View>
                  <View>
                    <MaterialIcon
                      name={
                        this.state.filterMode == 1
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      style={
                        this.state.filterMode == 1
                          ? styles.checked
                          : styles.unchecked
                      }
                      onPress={() => this.setFilterMode(1)}
                    />
                  </View>
                  <View style={styles.modalOptionIconsSpaceBetween}>
                    <Text />
                  </View>
                  <View>
                    <MaterialIcon
                      name={
                        this.state.filterMode == 2
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      style={
                        this.state.filterMode == 2
                          ? styles.checked
                          : styles.unchecked
                      }
                      onPress={() => this.setFilterMode(2)}
                    />
                  </View>
                  <View style={styles.modalOptionIconsSpaceBetween}>
                    <Text />
                  </View>
                </View>
                <View style={styles.modalOptionNames}>
                  <View style={styles.modelOptionName}>
                    <Text
                      style={[
                        styles.modelOptionNameText,
                        this.state.filterMode == 0
                          ? styles.checked
                          : styles.unchecked,
                      ]}>
                      Off
                    </Text>
                  </View>
                  <View style={styles.modelOptionName}>
                    <Text
                      style={[
                        styles.modelOptionNameText,
                        this.state.filterMode == 1
                          ? styles.checked
                          : styles.unchecked,
                      ]}>
                      Work
                    </Text>
                  </View>
                  <View style={styles.modelOptionName}>
                    <Text
                      style={[
                        styles.modelOptionNameText,
                        this.state.filterMode == 2
                          ? styles.checked
                          : styles.unchecked,
                      ]}>
                      Vacation
                    </Text>
                  </View>
                </View>
                <View style={styles.modalButton}>
                  <Button onPress={this.hideModal} title="Close" />
                </View>
              </View>
            </View>
          </Modal>
          <ListView
            initialListSize={5}
            enableEmptySections={true}
            dataSource={newDS}
            renderRow={person => {
              return this.renderPersonRow(person);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: 24,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#075e54',
    alignItems: 'center',
    paddingRight: 5,
  },
  leftHeaderContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  rightHeaderContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 6,
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: 'center',
    borderBottomColor: 'rgba(92,94,94,0.5)',
    borderBottomWidth: 0.25,
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  /* button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }, */
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-evenly',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    // borderColor: 'green',
    // borderWidth: 2,
    height: 250,
    width: 300,
  },
  modalOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
    flex: 1, // This sets entire screen as semi-transparent. don't change this.
    // borderColor: 'red',
    // borderWidth: 2,
    // padding: 42,
  },
  modalOptionIcons: {
    justifyContent: 'space-between',
    // borderColor: 'black',
    // borderWidth: 2,
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionNames: {
    justifyContent: 'space-around',
    // borderColor: 'black',
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalButton: {
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 2,
    flex: 1.1,
    alignItems: 'center',
    // fontSize: 20,
    // fontWeight: 'bold',
  },
  modalOptionEmptySpace: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 2,
    flex: 1.2,
  },
  modalOptionIconsSpaceBetween: {},
  modelOptionName: {
    // borderColor: 'blue',
    // borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    // fontSize: 20,
    //	fontWeight: 'bold',
  },
  modelOptionNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOptionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checked: {
    color: '#075e54',
  },
  unchecked: {
    color: 'grey',
  },
});

const response = [
  {
    id: 1,
    first_name: 'Ashish',
    mobile: true,
    message: 'Hey there! I am using WhatsApp',
    date: '22-Mar-2016',
    time: '5:46 PM',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    cat: 1,
  },
  {
    id: 2,
    first_name: 'Manu',
    mobile: false,
    message: 'Do you smell what the rock is cooking?',
    date: '22-Feb-2016',
    time: '09:38 PM',
    image: 'https://randomuser.me/api/portraits/men/48.jpg',
    cat: 2,
  },
  {
    id: 3,
    first_name: 'Boss',
    mobile: true,
    message: "Hello there it's been a while. Not much",
    date: '01-Jul-2016',
    time: '1:33 PM',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
    missed: true,
    cat: 1,
  },
  {
    id: 4,
    first_name: 'Mr. Kartikeyan',
    mobile: false,
    message: 'Oh Baby, baby baby... my baby baby',
    date: '19-Feb-2016',
    time: '02:59 AM',
    image: 'https://randomuser.me/api/portraits/men/63.jpg',
    cat: 1,
  },
  {
    id: 5,
    first_name: 'Sis',
    mobile: true,
    message: 'Extreme fishing with Robson green',
    date: '12-Aug-2016',
    time: '9:17 AM',
    image: 'https://randomuser.me/api/portraits/women/58.jpg',
    cat: 2,
  },
  {
    id: 6,
    first_name: 'Wife',
    mobile: false,
    message: "Why do people care about marcos' burial in LBNM",
    date: '13-Aug-2016',
    time: '10:37 PM',
    image: 'https://randomuser.me/api/portraits/women/18.jpg',
    cat: 2,
  },
  {
    id: 7,
    first_name: 'Daryn',
    mobile: true,
    message: 'Simply amazing, brilliant and absolutely fantastic',
    date: '17-Nov-2016',
    time: '07:32 AM',
    image: 'https://randomuser.me/api/portraits/men/30.jpg',
    cat: 1,
  },
  {
    id: 8,
    first_name: 'Fred',
    mobile: false,
    message: 'Saw you this morning and i wake up shitty.',
    date: '29-Nov-2016',
    time: '12:56 AM',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    cat: 2,
  },
  {
    id: 9,
    first_name: 'James',
    mobile: false,
    message: 'I will never walk alone',
    date: '27-Dec-2016',
    time: '9:29 PM',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    cat: 0,
  },
  {
    id: 10,
    first_name: 'Matthew',
    mobile: true,
    message: 'Got it',
    date: '31-Dec-2016',
    time: '7:43 PM',
    image: 'https://randomuser.me/api/portraits/men/18.jpg',
    cat: 0,
  },
];
