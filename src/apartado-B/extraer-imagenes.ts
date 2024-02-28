import { gestionarExtraerImagenes } from "./extraer-imagenes.ui";


document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#formulario');

  if(formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener('submit', gestionarExtraerImagenes)
  }
})