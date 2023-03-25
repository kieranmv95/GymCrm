import * as React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

const Login = ({ navigation }) => (
  <View className="flex p-6 items-center justify-center h-full">
    <Text className="font-bold text-3xl mb-5">Gym CRM Login</Text>
    <TextInput
      className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mb-5"
      placeholder="Email"
    />
    <TextInput
      className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mb-5"
      placeholder="Email"
    />
    <Button
      title="Not got an account? Click here to register"
      onPress={() => navigation.navigate('Register')}
      className="color-blue-500"
    />
  </View>
)

export default Login
