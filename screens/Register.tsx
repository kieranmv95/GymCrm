import * as React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

const Register = ({ navigation }) => (
  <View className="flex p-6 items-center justify-center h-full">
    <Text className="font-bold text-3xl mb-5">Gym CRM Register</Text>
    <TextInput
      className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mb-5"
      placeholder="Email"
    />
    <TextInput
      className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mb-5"
      placeholder="Email"
    />
    <Button
      title="Already got an account, Login here."
      onPress={() => navigation.navigate('Login')}
      className="color-blue-500"
    />
  </View>
)

export default Register
