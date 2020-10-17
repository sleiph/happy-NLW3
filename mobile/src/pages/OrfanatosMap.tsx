import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import api from '../services/api'
import mapMarker from '../../assets/map-marker.png'

interface Orfanato {
    id: number
    name: string
    latitude: number
    longitude: number
}

export default function OrfanatosMap() {
    const [ orfanatos, setOrfanatos] = useState<Orfanato[]>([])
    const navigation = useNavigation()

    useFocusEffect(() => {
        api.get('orfanatos').then(response => {
            setOrfanatos(response.data)
        })
    })

    function handleNavigateToOrfanatoDetails(id: number) {
        navigation.navigate('OrfanatoDetails', { id } )
    }

    function handleNavitageToCreateOrfanato() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.4536,
                    longitude: -46.5336,
                    latitudeDelta: 0.038,
                    longitudeDelta: 0.038
                }}
            >
                {orfanatos.map(orfanato => {
                    return(
                        <Marker
                            key={orfanato.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orfanato.latitude,
                                longitude: orfanato.longitude
                            }}
                        >
                            <Callout tooltip onPress={() => handleNavigateToOrfanatoDetails(orfanato.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orfanato.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orfanatos.length} orfanatos encontrados</Text>

                <RectButton style={styles.createOrfanatoButton} onPress={handleNavitageToCreateOrfanato}>
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center'
    },

    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
    
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
    
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
        elevation: 3
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3'
    },

    createOrfanatoButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
    
        justifyContent: 'center',
        alignItems: 'center'
    }
})