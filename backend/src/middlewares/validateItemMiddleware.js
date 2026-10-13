// intercepta peticiones post y put antes de que lleguen al controlador y valida que el body cumpla con los requisitos del modelo

export const validateItem = (req, res, next) => {
    const { name, price, description } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    
    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string' });
    }

    next(); // pasa al siguiente middleware o ruta (controlador)
};

// sanitizacion basica de los campos del body para evitar inyecciones de codigo malicioso
export const sanitizeItem = (req, res, next) => {
    const { name, price, description } = req.body;

    if (name) {
        req.body.name = name.trim();
    }

    if (description) {
        req.body.description = description.trim();
    }

    next();
};