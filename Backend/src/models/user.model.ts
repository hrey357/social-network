import { Table, Column, Model, DataType, Default, Unique  } from 'sequelize-typescript'


@Table({
    tableName: 'user'
})

export default class User extends Model {
    

        @Column({
            type: DataType.STRING(80)
        })
        declare firstname: string
        
        @Column({
            type: DataType.STRING(80)
        })
        declare lastname: string

        @Column({
            type: DataType.STRING(80)
        })
        declare alias: string
        
        @Unique
        @Column({
            type: DataType.STRING(60)
        })
        declare email: string
 
        
        @Column({
            type: DataType.DATEONLY
        })
        declare dateofbirth: Date
        
        @Column({
            type: DataType.STRING(100)
        })
        declare password: string
        
        @Default('USER')
        @Column({
            type: DataType.STRING(20)
        })
        declare role: string
    

}

