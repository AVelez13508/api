//registrar cada peticion entrante indicando el metodo, la url y el tiempo de respuesta

//middleware de logs

export const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next(); // pasa al siguiente middleware o ruta (controlador)
};