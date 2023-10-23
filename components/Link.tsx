import {StyleSheet, Text} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackProps} from '../App';

type Props = {
  href: 'SignIn' | 'SignUp' | 'Home';
  text: string;
};

const Link = ({href, text}: Props) => {
  const navigation = useNavigation<NavigationProp<StackProps>>();

  return (
    <Text onPress={() => navigation.navigate(href)} style={styles.cta}>
      {text}
    </Text>
  );
};

export default Link;

const styles = StyleSheet.create({
  cta: {
    color: '#0f66ff',
    fontWeight: '600',
    fontSize: 16,
  },
});
