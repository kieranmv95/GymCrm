import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch } from '../hooks/useRedux'
import { logout } from '../slices/authSlice'

const Home = () => {
  const dispatch = useAppDispatch()

  return (
    <View className="flex p-6 items-center justify-center h-full">
      <Text className="font-bold text-3xl mb-5">Gym CRM Home</Text>
      <TouchableOpacity onPress={() => dispatch(logout())} className="p-3">
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
