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
import { registerUser } from '../slices/authSlice'
import * as Yup from 'yup'
import Input from "../components/Input";

const Register = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  const handleRegister = async (values, reset) => {
    await dispatch(
      registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
    ).unwrap()

    reset();
  }

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Password must be at least 8 characters, contain a special character, uppercase, lowercase and a number',
      )
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  })

  return (
    <KeyboardAvoidingView
      className="flex p-6 items-center justify-center h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { resetForm }) => {
          await handleRegister(values, resetForm);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="w-full">
            <Text className="text-3xl font-bold mb-5">Register</Text>
            {!!auth.registerErr && (
              <View className="bg-red-100 w-full p-4 border border-red-400 border-2 mb-5 rounded-md">
                <Text className="font-bold text-red-900">
                  {auth.registerErr}
                </Text>
              </View>
            )}
            <Input
              label="First Name"
              value={values.firstName}
              touched={touched.firstName}
              error={errors.firstName}
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
            />
            <Input
              label="Last Name"
              value={values.lastName}
              touched={touched.lastName}
              error={errors.lastName}
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
            />
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
            <Input
              label="Confirm Password"
              value={values.passwordConfirmation}
              touched={touched.passwordConfirmation}
              error={errors.passwordConfirmation}
              onBlur={handleBlur('passwordConfirmation')}
              onChangeText={handleChange('passwordConfirmation')}
              secureTextEntry={true}
            />

            <Button loading={auth.loading} onPress={() => handleSubmit()}>
              Register
            </Button>
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        className="p-3"
      >
        <Text className="color-blue-500">
          Already got an account, Login here.
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Register
