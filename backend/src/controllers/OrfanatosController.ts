import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import * as Yup from 'yup'

import orfanatoView from '../views/orfanatos_view'
import Orfanato from '../models/Orfanato'

export default {
    async index(request: Request, response: Response) {
        const orfanatosRepository = getRepository(Orfanato)

        const orfanatos = await orfanatosRepository.find({
            relations: ['images']
        })

        return response.json(orfanatoView.renderMany(orfanatos))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params

        const orfanatosRepository = getRepository(Orfanato)

        const orfanato = await orfanatosRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return response.json(orfanatoView.render(orfanato))
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            abertura_horas,
            aberto_no_fimdesemana
        } = request.body
    
        const orfanatosRepository = getRepository(Orfanato)

        const requestImages = request.files as Express.Multer.File[]
        
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            abertura_horas,
            aberto_no_fimdesemana: aberto_no_fimdesemana === 'true',
            images
        }
    
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            abertura_horas: Yup.string().required(),
            aberto_no_fimdesemana: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const orfanato = orfanatosRepository.create(data)
    
        await orfanatosRepository.save(orfanato)
    
        return response.status(201).json(orfanato)
    }
 }