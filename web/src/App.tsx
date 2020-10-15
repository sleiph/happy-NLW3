import React from 'react';

import Routes from './routes'

import 'leaflet/dist/leaflet.css'
import './styles/global.css'

/* props
interface TitleProps {
  text: string
}

function Title(props: TitleProps) {
  return (
    <h1>{props.text}</h1>
  )
}

<Title text="Título 1"/>
*/

function App() {
  return (
    <Routes />
  );
}

export default App;