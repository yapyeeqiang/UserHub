import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  buttonText?: string;
};

const Button = ({onPress, buttonText}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.button}>
      <Text style={styles.buttonText}>{buttonText ?? 'Click'}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
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
});
