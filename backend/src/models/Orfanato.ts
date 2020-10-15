import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('orfanatos')
export default class Orfanato {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    abertura_horas: string

    @Column()
    aberto_no_fimdesemana: boolean

    @OneToMany(() => Image, image => image.orfanato, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orfanato_id' })
    images: Image[]
}