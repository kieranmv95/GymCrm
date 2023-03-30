import * as React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Formik } from 'formik'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { loginUser } from '../slices/authSlice'
import * as Yup from "yup";
import Input from "../components/Input";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const Login = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  const handleRegister = async (values, reset) => {
    await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      }),
    ).unwrap()
    reset();
  }
  return (
    <KeyboardAvoidingView
      className="flex p-6 items-center justify-center h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        enableReinitialize={true}
        validationSchema={LoginSchema}
        onSubmit={async (values, { resetForm }) => {
          await handleRegister(values, resetForm)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values , touched, errors }) => (
          <View className="w-full">
            <Text className="text-3xl font-bold mb-5">Login</Text>
            {!!auth.loginErr && (
              <View className="bg-red-100 w-full p-4 border border-red-400 border-2 mb-5 rounded-md">
                <Text className="font-bold text-red-900">{auth.loginErr}</Text>
              </View>
            )}
            <Input
              label="Email"
              value={values.email}
              touched={touched.email}
              error={errors.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              inputMode="email"
            />
            <Input
              label="Password"
              value={values.password}
              touched={touched.password}
              error={errors.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
            />
            <Button loading={auth.loading} onPress={() => handleSubmit()}>
              Login
            </Button>
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        className="p-3"
      >
        <Text className="color-blue-500">
          Not got an account, Register here.
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Login
