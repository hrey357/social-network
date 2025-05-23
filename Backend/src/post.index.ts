import express from 'express' 
import swaggerUi from 'swagger-ui-express'
import cors, { CorsOptions } from 'cors'

import colors from 'colors'
import morgan from 'morgan'

import db from './config/db'

import router from './routes/post.route'
import swaggerOutput from "./swagger/post.swagger.json";

const port = process.env.PORT


// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log( colors.blue( 'Conexión exitosa a la BD'))
        // Delete rows the table 
        await db.query(`DELETE FROM public."post";`);

        // Reset sequence
        await db.query(`SELECT setval('public.post_id_seq', 1, false);`);

        // Insert seed data
        await db.query(`INSERT INTO public.post(mensaje, usuario, "createdAt", "updatedAt")
            VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus lorem eget lectus rhoncus pharetra. Curabitur iaculis rutrum enim, sed faucibus metus feugiat non. Aliquam consectetur tempor sollicitudin. Morbi non facilisis mauris. Integer ac hendrerit diam, et efficitur justo. In dictum, tortor in egestas finibus, magna ipsum efficitur purus, vitae pretium erat lacus euismod sem. Fusce viverra arcu et purus iaculis, at maximus elit tincidunt. Nunc sollicitudin consequat nibh at egestas. Quisque purus odio, pretium nec nisl vel, fringilla eleifend neque. Aliquam facilisis congue dui eu tincidunt. Duis ex lectus, sollicitudin quis sollicitudin in, euismod a neque. Etiam ullamcorper vel erat ac pharetra. Maecenas volutpat a urna eu pellentesque. Nullam sit amet feugiat leo. Curabitur at felis sed lectus vulputate malesuada rhoncus efficitur risus. Praesent interdum felis id leo ullamcorper hendrerit.', 1, Now(), Now());`);
        await db.query(`INSERT INTO public.post(mensaje, usuario, "createdAt", "updatedAt")
            VALUES ('Curabitur magna quam, sollicitudin in viverra ut, lobortis ac eros. Phasellus elementum augue odio, vitae vestibulum sem tincidunt non. Maecenas eget lacinia velit, vitae condimentum massa. Pellentesque vel nisi eu tellus vulputate auctor. Duis malesuada sem massa, rutrum vehicula metus tempor id. Morbi justo ligula, interdum eget finibus et, laoreet et nibh. Donec quis quam ex. Pellentesque pellentesque pellentesque dui, quis rhoncus justo placerat quis. Praesent pellentesque blandit ante, quis ultricies sapien viverra tincidunt. Fusce rhoncus pulvinar massa id sagittis. In sit amet aliquam quam. Curabitur lorem purus, porta eget mollis nec, semper sed magna. Sed a ultricies augue. Donec a ipsum at ipsum placerat aliquam.', 2, Now(), Now());`);
        await db.query(`INSERT INTO public.post(mensaje, usuario, "createdAt", "updatedAt")
            VALUES ('Pellentesque porta lorem turpis, nec posuere neque scelerisque non. Proin vestibulum porta nibh quis suscipit. Curabitur vulputate tempus mauris varius condimentum. Aliquam quis dignissim mauris. Phasellus gravida velit eget interdum laoreet. Cras malesuada purus vitae rhoncus condimentum. Proin vitae risus quis tortor lobortis pharetra eget eu quam. Proin a sem sed nibh hendrerit aliquam. Curabitur ut faucibus tortor. Nullam porttitor orci non consequat mollis. Morbi et velit tincidunt, tincidunt leo at, feugiat ipsum. Aenean dapibus a lorem sed tincidunt. Pellentesque quis libero nec felis viverra tincidunt. In ut semper lectus. Aenean gravida egestas elit et auctor.', 3, Now(), Now());`);
        await db.query(`INSERT INTO public.post(mensaje, usuario, "createdAt", "updatedAt")
            VALUES ('Praesent ut purus dapibus, sodales magna vel, mollis mauris. Proin consectetur molestie leo, nec facilisis metus euismod ut. Suspendisse ipsum lorem, efficitur in ornare at, congue sed nisi. Duis mollis, nisi at posuere accumsan, sapien nunc condimentum ante, id auctor ligula magna quis mauris. Sed eget nunc erat. Aenean pharetra placerat quam ac fringilla. Phasellus consequat convallis leo, quis gravida purus mattis eu. Nunc eu porttitor massa. Sed sodales pellentesque tortor, id ornare augue. Donec orci quam, efficitur vitae iaculis eu, ultrices quis nulla. Cras neque lacus, mollis eget metus vel, porta fringilla magna.', 4, Now(), Now());`);
        await db.query(`INSERT INTO public.post(mensaje, usuario, "createdAt", "updatedAt")
            VALUES ('Proin id pellentesque magna. Vestibulum in eleifend nisl, ac eleifend est. Phasellus rutrum fermentum libero, viverra dapibus ligula porta pellentesque. Vestibulum a ultricies nulla. Ut mauris libero, dignissim non enim id, suscipit venenatis augue. Morbi et neque risus. Proin faucibus efficitur lectus non vestibulum. Cras malesuada ex vel nunc sollicitudin, eget feugiat ante pellentesque. Donec nec elit nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam arcu risus, laoreet porttitor sem vitae, tincidunt fringilla magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam porttitor, massa eu efficitur cursus, diam ex vehicula tellus, ut imperdiet lectus magna sed lacus. Suspendisse in lacus volutpat, malesuada ante ut, blandit risus.', 5, Now(), Now());`);
        
        console.log("Database seeded post successfully!");
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


server.use('/api/post', router)

// Docs
server.use('/docs/post', swaggerUi.serve, swaggerUi.setup(swaggerOutput) )


server.listen(port, () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
    
})
