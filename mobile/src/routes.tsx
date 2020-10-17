import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import OrfanatosMap from './pages/OrfanatosMap'
import OrfanatoDetails from './pages/OrfanatoDetails'
import OrfanatoData from './pages/OrfanatoData'
import SelectMapPosition from './pages/SelectMapPosition'

import Header from './components/Header'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown:
                        false,
                        cardStyle: { backgroundColor: '#f2f3f5' }
                }}
            >
                <Screen
                    name="OrfanatosMap"
                    component={ OrfanatosMap }
                />

                <Screen
                    name="OrfanatoDetails"
                    component={ OrfanatoDetails }
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato"/>
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={ SelectMapPosition }
                    options={{
                        headerShown: true,
                        header: () => <Header title="Cadastrar Localização"/>
                    }}
                />

                <Screen
                    name="OrfanatoData"
                    component={ OrfanatoData }
                    options={{
                        headerShown: true,
                        header: () => <Header title="Cadastrar Dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}