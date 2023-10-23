import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {signIn} from '../api/auth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackProps} from '../../App';
import {useDispatch} from 'react-redux';
import {updateActiveUser, updateToken} from '../stores/slices/user';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<StackProps>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInputFocus, setEmailInputFocus] = useState(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    const token = await signIn(email, password);

    if (!token) {
      Alert.alert(
        'Sign In Failed',
        'Incorrect email or password. Please try again.',
      );
      return;
    }

    dispatch(updateToken(token));

    const [firstName, lastName] = email.split('@')[0].split('.');

    dispatch(
      updateActiveUser({
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
          <Text style={styles.labelText}>Email</Text>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: emailInputFocus ? '#0f66ff' : '#e5e7ea',
              borderRadius: 10,
              padding: 12,
              gap: 12,
              marginTop: 10,
            }}>
            <Ionicon name="mail-outline" size={24} color={'#3f4145'} />

            <TextInput
              style={{
                fontSize: 16,
                fontWeight: '400',
                flex: 1,
              }}
              onFocus={() => setEmailInputFocus(true)}
              onBlur={() => setEmailInputFocus(false)}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={'#83898f'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.labelText}>Password</Text>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: passwordInputFocus ? '#0f66ff' : '#e5e7ea',
              borderRadius: 10,
              padding: 12,
              gap: 12,
              marginTop: 10,
            }}>
            <Ionicon name="lock-closed-outline" size={24} color={'#3f4145'} />

            <TextInput
              style={{
                fontSize: 16,
                fontWeight: '400',
                flex: 1,
              }}
              onFocus={() => setPasswordInputFocus(true)}
              onBlur={() => setPasswordInputFocus(false)}
              keyboardType="visible-password"
              secureTextEntry={hidePassword}
              placeholder="Enter your password"
              placeholderTextColor={'#83898f'}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            {hidePassword ? (
              <Ionicon
                onPress={() => setHidePassword(false)}
                name="eye-off-outline"
                size={24}
                color={'#3f4145'}
              />
            ) : (
              <Ionicon
                onPress={() => setHidePassword(true)}
                name="eye-outline"
                size={24}
                color={'#3f4145'}
              />
            )}
          </View>
        </View>

        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

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

          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.cta}>
            Sign up
          </Text>
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
  labelText: {
    color: '#18191b',
    fontWeight: '500',
    fontSize: 16,
  },
  formInput: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#e5e7ea',
    borderRadius: 10,
    padding: 12,
    gap: 12,
    fontSize: 24,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#050b11',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cta: {
    color: '#0f66ff',
    fontWeight: '600',
    fontSize: 16,
  },
});
