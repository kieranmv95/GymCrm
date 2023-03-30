import Home from './Home'
import Login from './Login'
import Register from './Register'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAppSelector } from '../hooks/useRedux'

const Stack = createNativeStackNavigator()

const Root = () => {
  const auth = useAppSelector((state) => state.auth)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth.accessToken ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root
