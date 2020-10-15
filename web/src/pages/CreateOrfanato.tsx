import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from 'react-router-dom'

import { FiPlus } from 'react-icons/fi'

import Sidebar from '../components/Sidebar'
import mapIcon from '../utils/mapIcon'

import api from '../services/api'

import '../styles/pages/create-orfanato.css'

export default function OrfanatosMap() {
    const history = useHistory()

    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0
    })

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [instructions, setInstructions] = useState('')
    const [abertura_horas, setAberturaHoras] = useState('')
    const [aberto_no_fimdesemana, setAbertoNoFimdesemana] = useState(true)
    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng

        setPosition({
            latitude: lat,
            longitude: lng
        })
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return
        }

        const selectedImages = Array.from(event.target.files)

        setImages(selectedImages)

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
        })

        setPreviewImages(selectedImagesPreview)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const { latitude, longitude } = position

        const data = new FormData()

        data.append('name', name)
        data.append('about', about)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('instructions', instructions)
        data.append('abertura_horas', abertura_horas)
        data.append('aberto_no_fimdesemana', String(aberto_no_fimdesemana))

        images.forEach(image => {
            data.append('images', image)
        })

        await api.post('orfanatos', data)

        alert('Cadastro realizado com sucesso!')

        history.push('/app')
    }

    return (
        <div id="page-create-orfanato">
            <Sidebar />
            <main>
                <form onSubmit={handleSubmit} className="create-orfanato-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map 
                            center={[-23.45, -46.52]}
                            zoom={13.5}
                            style={{ width: '100%', height: 280 }}
                            onClick={handleMapClick}
                        >
                            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            { position.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[
                                        position.latitude,
                                        position.longitude
                                    ]}
                                />
                            )}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="about"
                                maxLength={300}
                                value={about}
                                onChange={event => setAbout(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {previewImages.map(image => (
                                    <img key={image} src={image} alt={name} />
                                ))}

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>

                            <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={event => setInstructions(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="abertura_horas">Horário de funcinamento</label>
                            <input
                                id="abertura_horas"
                                value={abertura_horas}
                                onChange={event => setAberturaHoras(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="aberto_no_fimdesemana">Atende fim de semana</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={aberto_no_fimdesemana ? 'active' : ''}
                                    onClick={() => setAbertoNoFimdesemana(true)}
                                >
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    className={!aberto_no_fimdesemana ? 'active' : ''}
                                    onClick={() => setAbertoNoFimdesemana(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
    )
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`