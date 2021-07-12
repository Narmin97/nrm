//import React, {Component} from 'react';
//import Spinner from 'react-native-spinkit';
//import BleManager from 'react-native-ble-manager';
//import {StyleSheet, Text, View, Button} from 'react-native';

//export default class App extends Component{

 // constructor() {
  //  super();
  //  this.state = {
  //    is_scanning: false,
   //   peripherals: null
   // }

    //this.peripherals = [];

   // this.startScan = this.startScan.bind(this);

 // }

  

  //startScan() {

  //  this.peripherals = [];
  //  this.setState({
  //    is_scanning: true
  //  });
    
  //  console.log('Scanning:' + this.state.is_scanning)

    //BleManager.start({ showAlert: false }).then(() => {
      // Success code
     // console.log("Module initialized");
   // });

    //BleManager.scan([], 2, true).then(() => { 
      //console.log('scan started');
    //});

 // }

 // render(){
 //   return (
  //    <View style={styles.container}>
     //     <View style={styles.header}>
       //     <View style={styles.app_title}>
         //     <Text style={styles.header_text}>BLE-Scanner</Text>   
         //   </View>
          //  <View style={styles.header_button_container}>
           //   <Button 
            //    title="Scan" 
             //   color="#1491ee" 
             //   onPress={this.startScan}
             // />
           // </View>
      //   </View>
     //   </View>
   // );
//  }
//}

//const styles = StyleSheet.create({
 // container: {
 //   flex: 1,
 //   alignSelf: 'stretch',
 //   backgroundColor: '#fff',
 //   paddingTop: 25
 // },

 // header: {
 //   flex: 0.07,
  //  backgroundColor: 'grey',
  //  flexDirection: 'row'
 // },

 // app_title: {
 //   flex: 7,
 //   padding: 10
 // },

//  header_button_container: {
 //   flex: 2,
 //   justifyContent: 'center', 
 //   paddingRight: 5
 // },

//  header_text: {
 //   fontSize: 20,
 //   color: '#FFF',
 //   fontWeight: 'bold'
 // },

 // body: {
//    flex: 19
//  },

//  spinner: {
//    alignSelf: 'center',
//    marginTop: 30
//  }
//});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import {
   Button,
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   FlatList,
   TouchableOpacity,
   NativeModules,
   NativeEventEmitter,
 } from 'react-native';
 
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 // import BleManager from 'react-native-ble-manager';
 import { BleManager } from 'react-native-ble-plx';
 
 
 // const BleManagerModule = NativeModules.BleManager;
 // const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
 
 
 class App extends Component{
   constructor(){
     super();
     manager = new BleManager();
   }
   state = {
     peripherals: []
   };
 
   scanForDevices = () => {
     // this.state.peripherals.set("MyDevice", "Hello");
     manager.startDeviceScan([],null , (error, scannedDevice)=>{
       console.log(scannedDevice);
     });
   }
   
 
   // scanForDevices = () => {
   //   // this.state.peripherals.set("MyDevice", "Hello");
   //   BleManager.scan([],15 , true ).then(() => {
   //     // Success code
   //     console.log("Scan started");
   //   });
   // }
   
   handleDiscoverPeripheral = (peripheral) => {
     const { peripherals } = this.state;
   
     // if (peripheral.name) {
       peripherals.push([peripheral.id, peripheral.name, peripheral.rssi]);
     // }
     this.setState({ peripherals });
   }
   
   handleStopScan = () => {
     console.log(this.state.peripherals);
     console.log('Scan is stopped. Devices: ', this.state.peripherals);
   }
   
   componentDidMount = () => {
     // BleManager.enableBluetooth()
     // .then(() => {
     //   // Success code
     //   console.log("The bluetooth is already enabled or the user confirm");
     // })
     // .catch((error) => {
     //   // Failure code
     //   console.log("The user refuse to enable bluetooth");
     // });
   
     // BleManager.start({ showAlert: false }).then(() => {
     //   // Success code
     //   console.log("Module initialized");
     // });
     
     // bleManagerEmitter.addListener(
     //   'BleManagerDiscoverPeripheral',
     //   (item)=>{
     //     this.handleDiscoverPeripheral(item)
     //     console.log("item",item)
     //   }
     // );
   
     // bleManagerEmitter.addListener(
     //   'BleManagerStopScan',
     //   this.handleStopScan
     // );
 
     this.scanForDevices(); // I chose to start scanning for devices here
   }
 
   // componentWillUnmount(){
   //   bleManagerEmitter.removeListener()
   // }
 
   renderText=({item, index})=>{
     return(
       <View style={{marginTop:10}} key={index}>
         <Text>Name: {item[1]}, ID: {item[0]}, RSSI: {item[2]}</Text>
       </View>
     )
   }
 
   render() {
     // for (const device of this.state.peripherals) {
       return(
         <ScrollView style={{flex:1}}>
           <View style={{marginHorizontal:15, justifyContent:"center", alignItems:"center"}}>
             <TouchableOpacity onPress={() => this.scanForDevices()} style={{backgroundColor:"black", justifyContent:"center", marginTop:20,borderRadius:10 }}>
               <Text style={{paddingHorizontal:40, paddingVertical:10, color:"#fff", }}>Scan</Text>
             </TouchableOpacity>
           {/* {this.state.peripherals.map((device, index)=>{
             return <Text key={index}>Name: {device[1]}, ID: {device[0]}, RSSI: {device[2]} </Text>
           }) } */}
             <FlatList 
               data={this.state.peripherals}
               keyExtractor={item=>item.id}
               renderItem={(device) => this.renderText(device)}
             />
           </View>
       </ScrollView>
       );
     }
     // return(<Text>No devices are found</Text>);
   // }
     // return (
     //   <>
     //   <StatusBar barStyle="dark-content" />
     //   <SafeAreaView>
     //       {/* <View style={styles.body}> */}
     //         {/* <View> */}
     //           {/* <Button onPress={() => this.scanForDevices()} title="Start scanning"/> */}
     //           {/* <FlatList data={this.state.peripherals} renderItem ={this.renderItem} keyExtractor={item => item.id}/>               */}
     //           {/* {({item}) => <Text>{item.id}</Text>} */}
     //           <Text>{this.state.peripherals.keys()[0]}</Text>
     //           {/* <Button onPress={() => this.stopScanning()} title="Stop scanning"/> */}
     //         {/* </View> */}
     //       {/* </View> */}
     //   </SafeAreaView>
     // </>
     // );
 }
 
 // const App: () => React$Node = () => {
 //   return (
 //     <>
 //       <StatusBar barStyle="dark-content" />
 //       <SafeAreaView>
 //         {/* <ScrollView
 //           contentInsetAdjustmentBehavior="automatic"
 //           style={styles.scrollView}> */}
 //           <Header />
 //           {/* {global.HermesInternal == null ? null : (
 //             <View style={styles.engine}>
 //               <Text style={styles.footer}>Engine: Hermes</Text>
 //             </View>
 //           )} */}
 //           <View style={styles.body}>
 //             <View>
 //               <FlatList data={state.peripherals} renderItem = {({item}) => <Text>{item.name}</Text>}
 //               />
 //             </View>
 //             {/* <View style={styles.sectionContainer}>
 //               <Text style={styles.sectionTitle}>Step One</Text>
 //               <Text style={styles.sectionDescription}>
 //                 Edit <Text style={styles.highlight}>App.js</Text> to change this
 //                 screen and then come back to see your edits.
 //               </Text>
 //             </View>
 //             <View style={styles.sectionContainer}>
 //               <Text style={styles.sectionTitle}>See Your Changes</Text>
 //               <Text style={styles.sectionDescription}>
 //                 <ReloadInstructions />
 //               </Text>
 //             </View>
 //             <View style={styles.sectionContainer}>
 //               <Text style={styles.sectionTitle}>Debug</Text>
 //               <Text style={styles.sectionDescription}>
 //                 <DebugInstructions />
 //               </Text>
 //             </View>
 //             <View style={styles.sectionContainer}>
 //               <Text style={styles.sectionTitle}>Learn More</Text>
 //               <Text style={styles.sectionDescription}>
 //                 Read the docs to discover what to do next:
 //               </Text>
 //             </View>
 //             <LearnMoreLinks /> */}
 //           </View>
 //       </SafeAreaView>
 //     </>
 //   );
 // };
 
 const styles = StyleSheet.create({
   scrollView: {
     backgroundColor: Colors.lighter,
   },
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     backgroundColor: Colors.white,
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: Colors.black,
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     color: Colors.dark,
   },
   highlight: {
     fontWeight: '700',
   },
   footer: {
     color: Colors.dark,
     fontSize: 12,
     fontWeight: '600',
     padding: 4,
     paddingRight: 12,
     textAlign: 'right',
   },
 });
 
 export default App;