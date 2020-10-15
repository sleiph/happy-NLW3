import Orfanato from '../models/Orfanato'
import imagesView from './images_view'

export default {
    render(orfanato: Orfanato) {
        return {
            id: orfanato.id,
            name: orfanato.name,
            latitude: orfanato.latitude,
            longitude: orfanato.longitude,
            about: orfanato.about,
            instructions: orfanato.instructions,
            abertura_horas: orfanato.abertura_horas,
            aberto_no_fimdesemana: orfanato.aberto_no_fimdesemana,
            images: imagesView.renderMany(orfanato.images)
        }
    },

    renderMany(orfanatos: Orfanato[]) {
        return orfanatos.map( orfanato => this.render(orfanato))
    },
}