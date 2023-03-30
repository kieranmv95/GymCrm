import { TouchableOpacity, Text } from 'react-native'
import { ReactNode } from 'react'

type ButtonProps = {
  onPress: () => void
  children: ReactNode
  loading?: boolean
}

const Button = ({ onPress, children, loading }: ButtonProps) => (
  <TouchableOpacity
    onPress={() => loading ? null : onPress()}
    className={`w-full p-4 rounded-md ${loading ? 'bg-zinc-400' : 'bg-blue-600'}` }
  >
    <Text className="text-center color-white">{children}</Text>
  </TouchableOpacity>
)

export default Button
