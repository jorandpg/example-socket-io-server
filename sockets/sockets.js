
const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Aerosmith') );
bands.addBand( new Band('Musiko') );
bands.addBand( new Band('Thirday') );
bands.addBand( new Band('Systema Solar') );

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // Escuchar evento para setear voto
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        
        // Se envía a todos los clientes, inclyendo al emisor.
        io.emit('active-bands', bands.getBands());
    });

    // Escuchar evento para agragar banda
    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        
        // Se envía a todos los clientes, inclyendo al emisor.
        io.emit('active-bands', bands.getBands());
    });

    // Escuchar evento para borrar banda
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        
        // Se envía a todos los clientes, inclyendo al emisor.
        io.emit('active-bands', bands.getBands());
    });
});