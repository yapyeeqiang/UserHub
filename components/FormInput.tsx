import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Dispatch, ReactNode, SetStateAction, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isPassword?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: ReactNode;
  labelText?: string;
};

const FormInput = ({
  value,
  setValue,
  isPassword = false,
  placeholder,
  keyboardType,
  icon,
  labelText,
}: Props) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      {labelText && <Text style={styles.labelText}>{labelText}</Text>}

      <View
        style={[
          styles.inputContainer,
          {borderColor: inputFocus ? '#0f66ff' : '#e5e7ea'},
        ]}>
        {icon && icon}

        <TextInput
          style={styles.input}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          keyboardType={keyboardType ?? 'default'}
          secureTextEntry={isPassword ? hidePassword : false}
          placeholder={placeholder ?? `Enter your ${labelText?.toLowerCase()}`}
          placeholderTextColor={'#83898f'}
          value={value}
          onChangeText={text => setValue(text)}
        />

        {isPassword && (
          <Ionicon
            onPress={() => setHidePassword(!hidePassword)}
            name="eye-off-outline"
            size={24}
            color={'#3f4145'}
          />
        )}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  labelText: {
    color: '#18191b',
    fontWeight: '500',
    fontSize: 16,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 12,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
});
