import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, LogBox, TouchableOpacity } from 'react-native';

import LoginScreen from './App/Screens/LoginScreen';
import RegisterScreen from './App/Screens/RegisterScreen';
import MainScreen from './App/Screens/MainScreen';
import AppScreen from './App/Screens/AppScreen';
import SettingScreen from './App/Screens/SettingScreen';
import SystemProgress from './App/Screens/SystemProgress';
import ForgotPassword from './App/Screens/ForgotPassword';
import ChangePassword from './App/Screens/ChangePassword';
import ChangeScore from './App/Screens/Admin/ChangeScore';
import Users from './App/Screens/Admin/Users';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import AddUser from './App/Screens/Admin/AddUser';
import { Ionicons } from '@expo/vector-icons';
import FlashMessage from 'react-native-flash-message';
import UserListItem from './App/Components/UserListItem';
import AboutUs from './App/Screens/AboutUs';
import ContactUs from './App/Screens/ContactUs';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  function Home() {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Crop Irrigation System" component={MainScreen} />
          <Stack.Screen name="Progress" component={SystemProgress} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  function Setting ({navigation}) {
    return (
      <Stack.Navigator >
        <Stack.Group>
          <Stack.Screen name="Profile" component={SettingScreen} options={{
            headerStyle: {
              backgroundColor: '#61dafb'
            },
            headerLeft: () => (
              <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack()}>
                <FontAwesome5 name="arrow-left" size={18} color="black" />
              </TouchableOpacity> 
            ),
            }}/>
          <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="About Us" component={AboutUs} />
          <Stack.Screen name="Contact Us" component={ContactUs} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  function Main({route}) {
    return (
    <Tab.Navigator  
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Setting") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: "#1976d2",
          tabBarInactiveTintColor: "gray",
        })}>     
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false}}/> 
        <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

  function AdminSetting({navigation}) {
    return (
      <Stack.Navigator >
        <Stack.Group>
          <Stack.Screen name="Users" component={Users} options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Settingprof")}>
                <Ionicons name="settings-outline" size={25} color="black" />
              </TouchableOpacity> 
            ),}}/>
          <Stack.Screen name="Change Score" component={ChangeScore} />
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="list" component={UserListItem} />
        </Stack.Group>
      </Stack.Navigator>
    )
  }

  return (
             
    <NavigationContainer>
      <StatusBar backgroundColor="#61dafb" />
      <Stack.Navigator>
          <Stack.Screen name="App Screen" component={AppScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Settingprof" component={Setting} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={AdminSetting} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword}/>
          <Stack.Screen name="FrontScreen" component={MainScreen} />
          
        </Stack.Navigator>
        <FlashMessage style={{marginTop:35}} position="top" />
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
