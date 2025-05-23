import express from 'express' 
import swaggerUi from 'swagger-ui-express'
import cors, { CorsOptions } from 'cors'

import colors from 'colors'
import morgan from 'morgan'

import db from './config/db'

import router from './routes/like.route'
import swaggerOutput from "./swagger/like.swagger.json";

const port = process.env.PORT


// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log( colors.blue( 'Conexión exitosa a la BD'))
        // Delete rows the table 
        await db.query(`DELETE FROM public."like";`);

        // Reset sequence
        await db.query(`SELECT setval('public.like_id_seq', 1, false);`);

        // Insert seed data
        await db.query(`INSERT INTO public."like"(mensaje, usuario, "createdAt", "updatedAt")
            VALUES (1, 5, Now(), Now());`);
        await db.query(`INSERT INTO public."like"(mensaje, usuario, "createdAt", "updatedAt")
            VALUES (2, 4, Now(), Now());`);
        await db.query(`INSERT INTO public."like"(mensaje, usuario, "createdAt", "updatedAt")
            VALUES (3, 3, Now(), Now());`);
        await db.query(`INSERT INTO public."like"(mensaje, usuario, "createdAt", "updatedAt")
            VALUES (4, 2, Now(), Now());`);
        await db.query(`INSERT INTO public."like"(mensaje, usuario, "createdAt", "updatedAt")
            VALUES (5, 1, Now(), Now());`);
        
        console.log("Database seeded like successfully!");
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD') )
    }
}
connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        // console.log(origin);
        
        if(
            origin === undefined || 
            origin === process.env.FRONTEND_URL || 
            origin === process.env.FRONTEND_URL2 || 
            origin === process.env.FRONTEND_URL3
        ) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS')) 
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))


server.use('/api/like', router)

// Docs
server.use('/docs/like', swaggerUi.serve, swaggerUi.setup(swaggerOutput) )


server.listen(port, () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
    
})
