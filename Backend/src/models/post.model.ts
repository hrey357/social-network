import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'post'
})

class Post extends Model {
    @Column({
        type: DataType.STRING(1000)  
    })
    declare mensaje: string

    @Column({
        type: DataType.INTEGER
    })
    declare usuario: number

}

export default Post
