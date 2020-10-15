import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Leaflet from 'leaflet'

import api from '../services/api'

import '../styles/pages/orfanatos-map.css'
// import 'leaflet/dist/leaflet.css'

import { FiArrowRight, FiPlus } from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

interface Orfanato {
    id: number
    latitude: number
    longitude: number
    name: string
}

function OrfanatosMap() {
    const [orfanatos, setOrfanatos] = useState<Orfanato[]>([])

    useEffect(() => {
        api.get('orfanatos').then(response => {
            setOrfanatos(response.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita 🤗</p>
                </header>

                <footer>
                    <strong>Guarulhos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map 
                center={[-23.45, -46.52]}
                zoom={13.5}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {orfanatos.map(orfanato => (
                    <Marker
                        key={orfanato.id}
                        icon={mapIcon}
                        position={[orfanato.latitude, orfanato.longitude]}
                    >
                        <Popup closeButton={false} minWidth={240} className="map-popup">
                            {orfanato.name}
                            <Link to={`/orfanatos/${orfanato.id}`}>
                                <FiArrowRight size={20} color="white" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>

            <Link to="/orfanatos/create" className="create-orfanato">
                <FiPlus size={32} color="white" />
            </Link>
        </div>
    )
}

export default OrfanatosMap