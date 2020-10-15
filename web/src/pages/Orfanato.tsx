import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet'

import api from '../services/api'
import Sidebar from '../components/Sidebar'

import mapIcon from '../utils/mapIcon'

import '../styles/pages/orfanato.css'

import { FiClock, FiInfo } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa";

interface Orfanato {
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

interface OrfanatoParams {
    id: string
}

export default function Orfanato() {
    const params = useParams<OrfanatoParams>()
    const [orfanato, setOrfanato] = useState<Orfanato>()
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        api.get(`orfanatos/${params.id}`).then(response => {
            setOrfanato(response.data)
        })
    }, [params.id])

    if (!orfanato) {
        return <p>Carregando...</p>
    }

    return (
        <div id="page-orfanato">
            <Sidebar />

            <main>
                <div className="orfanato-details">
                    <img src={orfanato.images[activeImageIndex].url} alt={orfanato.name} />

                    <div className="images">
                        {orfanato.images.map((image, index) => (
                            <button
                                key={image.id}
                                className={activeImageIndex === index ? 'active' : ''}
                                type="button"
                                onClick={() => {
                                    setActiveImageIndex(index);
                                }}
                            >
                                <img src={image.url} alt={orfanato.name} />
                            </button>
                        ))}
                    </div>

                    <div className="orfanato-details-content">
                        <h1>{orfanato.name}</h1>
                        <p>{orfanato.about}</p>

                        <div className="map-container">
                            <Map 
                                center={[orfanato.latitude, orfanato.longitude]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker interactive={false} icon={mapIcon} position={[orfanato.latitude, orfanato.longitude]} />
                            </Map>

                            <footer>
                                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.latitude},${orfanato.longitude}`}>Ver rotas no Google Maps</a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orfanato.instructions}</p>

                        <div className="aberto-details">
                            <div className="hora">
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta <br />
                                {orfanato.abertura_horas}
                            </div>
                            { orfanato.aberto_no_fimdesemana ? (
                                <div className="aberto_no_fimdesemana">
                                    <FiInfo size={32} color="#39CC83" />
                                    Atendemos <br />
                                    fim de semana
                                </div>
                            ) : (
                                <div className="aberto_no_fimdesemana nao-abre">
                                    <FiInfo size={32} color="#FF6690" />
                                    Não Atendemos <br />
                                    fim de semana
                                </div>
                            ) }
                        </div>

                        {/*
                            <button type="button" className="contact-button">
                                <FaWhatsapp size={20} color="#FFF" />
                                Entrar em contato
                            </button>
                        */}
                    </div>
                </div>
            </main>
        </div>
    )
}