import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import OrfanatosMap from './pages/OrfanatosMap'
import OrfanatoDetails from './pages/OrfanatoDetails'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} >
                <Screen
                    name="OrfanatosMap"
                    component={OrfanatosMap}
                />

                <Screen
                    name="OrfanatoDetails"
                    component={OrfanatoDetails}
                />
            </Navigator>
        </NavigationContainer>
    )
}