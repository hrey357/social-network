import express from 'express' 
import swaggerUi from 'swagger-ui-express'
import cors, { CorsOptions } from 'cors'

import colors from 'colors'
import morgan from 'morgan'

import db from './config/db'

import router from './routes/user.route'
import swaggerOutput from "./swagger/user.swagger.json";

const port = process.env.PORT


// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log( colors.blue( 'Conexión exitosa a la BD'))
        // Delete rows the table 
        await db.query(`DELETE FROM public."user";`);

        // Reset sequence
        await db.query(`SELECT setval('public.user_id_seq', 1, false);`);

        // Insert seed data
        await db.query(`INSERT INTO public."user"(firstname, lastname, alias, email, dateofbirth, password, role, "createdAt", "updatedAt")
            VALUES ('Juan', 'Perez', 'Juanpiz', 'juan.perez@gmail.com', '1985-06-09', '$2b$10$QPOOhTnKH7tfV/SOcvegWep.S9kn/1F4X.PkgioFoSv2jdmRoLF.y', 'User', Now(), Now());`);
        await db.query(`INSERT INTO public."user"(firstname, lastname, alias, email, dateofbirth, password, role, "createdAt", "updatedAt")
            VALUES ('Camila', 'Parra', 'Cami', 'camila.parra@gmail.com', '1980-02-04', '$2b$10$USnZvqsNHbuOg9HsLGHM4eEwG/f710T1xVrzkYTpc86DoWoKH4YfK', 'User', Now(), Now());`);
        await db.query(`INSERT INTO public."user"(firstname, lastname, alias, email, dateofbirth, password, role, "createdAt", "updatedAt")
            VALUES ('Pedro', 'Peralta', 'Pepe', 'pedro.peralta@gmail.com', '1970-12-04', '$2b$10$USnZvqsNHbuOg9HsLGHM4eEwG/f710T1xVrzkYTpc86DoWoKH4YfK', 'User', Now(), Now());`);
        await db.query(`INSERT INTO public."user"(firstname, lastname, alias, email, dateofbirth, password, role, "createdAt", "updatedAt")
            VALUES ('Camilo', 'Sanchez', 'Cami', 'camilo.sanchez@gmail.com', '1945-05-14', '$2b$10$USnZvqsNHbuOg9HsLGHM4eEwG/f710T1xVrzkYTpc86DoWoKH4YfK', 'User', Now(), Now());`);
        await db.query(`INSERT INTO public."user"(firstname, lastname, alias, email, dateofbirth, password, role, "createdAt", "updatedAt")
            VALUES ('Henry', 'Rey', 'Hrey', 'henry.rey@gmail.com', '1983-06-08', '$2b$10$USnZvqsNHbuOg9HsLGHM4eEwG/f710T1xVrzkYTpc86DoWoKH4YfK', 'User', Now(), Now());`);
        
        console.log("Database seeded user successfully!");
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

server.use('/api/user', router)

// Docs
server.use('/docs/user', swaggerUi.serve, swaggerUi.setup(swaggerOutput) )

server.listen(port, () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
    
})
