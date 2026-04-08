const express = require('express');
const router = express.Router();
const { leerUsuarios, guardarUsuarios } = require('../helpers/storage');

// Listar todos o filtrar por rol
router.get('/', (req, res, next) => {
  try {
    const usuarios = leerUsuarios();
    const { rol } = req.query;
    const resultado = rol ? usuarios.filter(u => u.rol === rol) : usuarios;
    res.json(resultado);
  } catch (err) { next(err); }
});

// Obtener uno por ID
router.get('/:id', (req, res, next) => {
  try {
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.id === Number(req.params.id));
    if (!usuario) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(usuario);
  } catch (err) { next(err); }
});

// Crear usuario
router.post('/', (req, res, next) => {
  try {
    const { nombre, email, rol } = req.body;
    if (!nombre || !email || !rol) {
      const err = new Error('nombre, email y rol son obligatorios');
      err.status = 400;
      return next(err);
    }
    const usuarios = leerUsuarios();
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const nuevo = { id: nuevoId, nombre, email, rol, activo: true };
    usuarios.push(nuevo);
    guardarUsuarios(usuarios);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
});

// Actualizar usuario
router.put('/:id', (req, res, next) => {
  try {
    const usuarios = leerUsuarios();
    const index = usuarios.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      return next(err);
    }
    usuarios[index] = { ...usuarios[index], ...req.body, id: usuarios[index].id };
    guardarUsuarios(usuarios);
    res.json(usuarios[index]);
  } catch (err) { next(err); }
});

// Eliminar usuario
router.delete('/:id', (req, res, next) => {
  try {
    const usuarios = leerUsuarios();
    const filtrados = usuarios.filter(u => u.id !== Number(req.params.id));
    if (filtrados.length === usuarios.length) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      return next(err);
    }
    guardarUsuarios(filtrados);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) { next(err); }
});

module.exports = router;