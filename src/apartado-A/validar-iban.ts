import { validaIBANEnElDOM } from "./valida-iban.ui";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario");

  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", validaIBANEnElDOM);
  } else {
    throw new Error("No se encontró el formulario");
  }
});
