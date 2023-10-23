import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {signIn} from '../api/auth';
import {useDispatch} from 'react-redux';
import {setActiveUser, setToken} from '../stores/user/slice';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import Link from '../../components/Link';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const token = await signIn(email, password);

    if (!token) {
      Alert.alert(
        'Sign In Failed',
        'Incorrect email or password. Please try again.',
      );
      return;
    }

    dispatch(setToken(token));

    const [firstName, lastName] = email.split('@')[0].split('.');

    dispatch(
      setActiveUser({
        email,
        first_name: firstName[0].toUpperCase() + firstName.slice(1),
        last_name: lastName,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1496150458551-140441714f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
        }}>
        <View style={styles.header}>
          <Text style={styles.title}>Hi, Welcome Back!</Text>

          <Text style={styles.description}>Reconnect with your community</Text>
        </View>
      </ImageBackground>

      <ScrollView style={styles.form}>
        <View>
          <FormInput
            value={email}
            setValue={setEmail}
            labelText="Email"
            icon={<Ionicon name="mail-outline" size={24} color={'#3f4145'} />}
            keyboardType="email-address"
          />
        </View>

        <View style={{marginTop: 20}}>
          <FormInput
            value={password}
            setValue={setPassword}
            labelText="Password"
            icon={
              <Ionicon name="lock-closed-outline" size={24} color={'#3f4145'} />
            }
            keyboardType="visible-password"
            isPassword
          />
        </View>

        <Button onPress={handleSignIn} buttonText="Sign In" />

        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '300'}}>
            Don't have an account?
          </Text>

          <Link href="SignUp" text="Sign up" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050b11',
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 50,
    gap: 20,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    color: '#b9babb',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 35,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
  },
});
