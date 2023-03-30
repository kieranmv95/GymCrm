import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import * as React from "react";
import {ChangeEvent} from "react";

type InputProps = {
  label?: string
  value: string
  touched: boolean
  error: string
  onBlur: (e: any) => void
  onChangeText: (e: string | ChangeEvent<any>) => void
  inputMode?: 'email' | 'none'
  secureTextEntry?: boolean
}

const Input = ({ label, value, touched, error, onBlur, onChangeText, inputMode = 'none', secureTextEntry }: InputProps) => (
  <View className="mb-5">
    {label && <Text className="mb-1">{label}</Text>}
    <TextInput
      inputMode={inputMode}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      className={`w-full h-12 border-2 rounded-md p-2 focus:border-blue-600 ${
        touched && error
          ? 'border-red-400'
          : 'border-gray-300'
      }`}
      secureTextEntry={secureTextEntry}
    />
    {error && touched ? (
      <Text className="text-red-500 font-semibold text-sm mt-1">
        {error}
      </Text>
    ) : null}
  </View>
)

export default Input;