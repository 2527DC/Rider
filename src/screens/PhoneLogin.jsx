import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const PhoneLogin = ({navigation}) => {
  return (
    <View>
      <Text>PhoneLogin</Text>
      <TouchableOpacity  onPress={()=>navigation.navigate("Main")} className='bg-blue-400 p-3'>
        <Text>
            Go to otp
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PhoneLogin