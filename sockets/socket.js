const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) =>  {
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )

    // Verificar autenticación
    if ( !valido ) { return client.disconnect(); }
    
    // Cliente autenticado
    usuarioConectado( uid );

    //Ingresar usuario a sala especifica
    //por defecto se une a sala global (todos estan logueados a esta sala)
    //ingresar a sala especifica, client.id
    client.join(uid);


    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async( payload ) => {
        // console.log(payload);
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload );
    })
    

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    

    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
