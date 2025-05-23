import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'like'
})

class Like extends Model {
    @Column({
        type: DataType.INTEGER  
    })
    declare mensaje: number

    @Column({
        type: DataType.INTEGER
    })
    declare usuario: number

}

export default Like
