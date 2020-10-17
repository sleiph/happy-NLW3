import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native'

import { Feather, FontAwesome } from '@expo/vector-icons';
// import { RectButton } from 'react-native-gesture-handler';
import mapMarkerImg from '../../assets/map-marker.png';
import api from '../services/api';

interface OrfanatoDetailsRouteParams {
    id: number
}

interface Orfanato {
    id: number
    latitude: number
    longitude: number
    name: string
    about: string
    instructions: string
    abertura_horas: string
    aberto_no_fimdesemana: boolean
    images: Array<{
        id: number
        url: string
    }>
}

export default function OrfanatoDetails() {
    const route = useRoute()
    const [orfanato, setOrfanato] = useState<Orfanato>()
    const params = route.params as OrfanatoDetailsRouteParams

    useEffect(() => {
        api.get(`orfanatos/${params.id}`).then(response => {
            setOrfanato(response.data)
        })
    }, [params.id])

    if (!orfanato) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>

            </View>
        )
    }

    function handleOpenGoogleMapRoutes() {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orfanato?.latitude},${orfanato?.longitude}`)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {orfanato.images.map(imagem => {
                        return (
                            <Image
                                key={imagem.id}
                                style={styles.image}
                                source={{ uri: imagem.url }}
                            />
                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{orfanato.name}</Text>
                <Text style={styles.description}>{orfanato.about}</Text>
        
                <View style={styles.mapContainer}>
                    <MapView 
                        initialRegion={{
                            latitude: orfanato.latitude,
                            longitude: orfanato.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }} 
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker 
                            icon={mapMarkerImg}
                            coordinate={{ 
                                latitude: orfanato.latitude,
                                longitude: orfanato.longitude
                            }}
                        />
                    </MapView>

                    <TouchableOpacity onPress={ handleOpenGoogleMapRoutes } style={styles.routesContainer}>
                        <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
                    </TouchableOpacity>
                </View>
        
                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                        <Text style={styles.description}>
                            {orfanato.instructions}
                        </Text>

                <View style={styles.horarioContainer}>
                    <View style={[styles.horarioItem, styles.horarioItemBlue]}>
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text style={[styles.horarioText, styles.horarioTextBlue]}>
                            Segunda à Sexta {orfanato.abertura_horas}
                        </Text>
                    </View>
                    
                    { orfanato.aberto_no_fimdesemana ? (
                        <View style={[styles.horarioItem, styles.horarioItemGreen]}>
                            <Feather name="info" size={40} color="#39CC83" />
                            <Text style={[styles.horarioText, styles.horarioTextGreen]}>
                                Atendemos de fim de semana
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.horarioItem, styles.horarioItemRed]}>
                            <Feather name="info" size={40} color="#FF669D" />
                            <Text style={[styles.horarioText, styles.horarioTextRed]}>
                                Não atendemos no fim de semana
                            </Text>
                        </View>
                    )}
                </View>
                {/*
                <RectButton style={styles.contactButton} onPress={() => {}}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
                */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imagesContainer: {
        height: 240,
    },

    image: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover',
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16,
    },

    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#B3DAE2',
        marginTop: 40,
        backgroundColor: '#E6F7FB',
    },

    mapStyle: {
        width: '100%',
        height: 150,
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    routesText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5'
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40,
    },

    horarioContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    horarioItem: {
        width: '48%',
        padding: 20,
    },

    horarioItemBlue: {
        backgroundColor: '#E6F7FB',
        borderWidth: 1,
        borderColor: '#B3DAE2',
        borderRadius: 20,
    },

    horarioItemGreen: {
        backgroundColor: '#EDFFF6',
        borderWidth: 1,
        borderColor: '#A1E9C5',
        borderRadius: 20,
    },

    horarioItemRed: {
        backgroundColor: '#FEF6F9',
        borderWidth: 1,
        borderColor: '#FFBCD4',
        borderRadius: 20,
    },

    horarioText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },

    horarioTextBlue: {
        color: '#5C8599'
    },

    horarioTextGreen: {
        color: '#37C77F'
    },

    horarioTextRed: {
        color: '#FF669D'
    },

    contactButton: {
        backgroundColor: '#3CDC8C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    }
})