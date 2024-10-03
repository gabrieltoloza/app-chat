import express from 'express';
import handlebars from 'express-handlebars';

import usersRouter from './routes/users.router.js';
/**
 * Generamos un paquete de rutas en archivo separado, para las plantillas de Handlebars
 * Podrían integrarse en otros archivos, pero es ordenado tener uno para las vistas.
 */
import viewsRouter from './routes/views.router.js';
import config from './config.js';
import { Server } from 'socket.io';



const app = express();

//Configurando el WebSocket con "socket.io"
const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log(`Nuevo cliente conectado con el id ${socket.id}`)
    
    // Subscribiendo evento(escucha)
    socket.on('init_message', data => {
        console.log(data)

        // Publicando/emitiendo nueva data hacia el cliente
        // Publicando/emitiendo nueva data hacia el cliente
        socketServer.emit('new_message', { id: socket.id, message: data })
    })

    // Publicar evento(emitir)
    socket.emit('welcome', 'Bienvenido al app chat mas maquina ')
});




const midd1 = (req, res, next) => {

    next();
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(midd1);


app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');


app.use('/views', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));




