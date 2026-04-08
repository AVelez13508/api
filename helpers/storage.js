const fs = require('fs');
const path = require('path');

const RUTA = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
  const contenido = fs.readFileSync(RUTA, 'utf-8');
  return JSON.parse(contenido);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(RUTA, JSON.stringify(usuarios, null, 2));
}

module.exports = { leerUsuarios, guardarUsuarios };