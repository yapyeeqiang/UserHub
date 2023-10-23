import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeScreen from './app/screens/HomeScreen';
import {RootState} from './app/stores';
import {useSelector} from 'react-redux';

export type StackProps = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<StackProps>();

function App(): JSX.Element {
  const token = useSelector((state: RootState) => state.user.token);

  return (
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
  );
}

export default App;
