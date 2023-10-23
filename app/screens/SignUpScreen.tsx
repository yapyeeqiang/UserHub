import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {StackProps} from '../../App';
import {signUp} from '../api/auth';
import {updateActiveUser, updateToken} from '../stores/slices/user';
import {useDispatch} from 'react-redux';
import FormInput from '../../components/FormInput';

type Props = NativeStackScreenProps<StackProps, 'SignUp'>;

const SignUpScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const response = await signUp(email, password);

    if (response && response.token) {
      dispatch(updateToken(response.token));

      const [firstName, lastName] = email.split('@')[0].split('.');

      dispatch(
        updateActiveUser({
          email,
          first_name: firstName[0].toUpperCase() + firstName.slice(1),
          last_name: lastName,
        }),
      );

      return;
    }

    Alert.alert(
      'Sign Up Failed',
      'Only defined users succeed registration. Please try again.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        }}>
        <View style={styles.header}>
          <Text style={styles.title}>Join Us Today</Text>

          <Text style={styles.description}>
            Be a part of our growing community.
          </Text>
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

        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '300'}}>
            Already have an account?
          </Text>

          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={styles.cta}>
            Sign In
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
