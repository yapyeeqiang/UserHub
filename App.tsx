import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeScreen from './app/screens/HomeScreen';
import {AuthContext} from './app/contexts/AuthContext';
import {useState} from 'react';
import {User} from './app/types/user';

export type StackProps = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<StackProps>();

function App(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const updateToken = async (newToken: string) => {
    try {
      // await AsyncStorage.setItem('token', newToken); // Store the token in AsyncStorage
      setToken(newToken);
    } catch (error) {
      console.error('Error updating token:', error);
    }
  };

  const updateActiveUser = (user: User) => {
    setActiveUser({...user});
  };

  return (
    <AuthContext.Provider
      value={{activeUser, updateActiveUser, token, updateToken}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={token ? 'Home' : 'SignIn'}
          screenOptions={{headerShown: false}}>
          {token ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
