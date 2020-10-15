import React from 'react'
import { useHistory } from 'react-router-dom'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/components/sidebar.css'

import { FiArrowLeft } from 'react-icons/fi'

export default function Sidebar() {
    const { goBack } = useHistory()

    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="white" />
                </button>
            </footer>
        </aside>
    )
}