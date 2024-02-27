import { codigoDeBancos } from "./codigosDeBancos";
import { IBAN, patronIBAN } from "./validar-iban.model";
import {
  esValidoElIBAN,
  estáBienFormadoElIBAN,
  filtrarPorCodigoDeBanco,
  formatearIBAN,
} from "./validar-iban.motor";

const obtenerIBANdelUsuario = () => {
  const iban = document.querySelector("#input-iban");

  if (iban && iban instanceof HTMLInputElement) {
    return iban.value.trim();
  } else {
    throw new Error("No se encontó el Input para IBAN del Usuario");
  }
};

const gestionarSpan = (id: string, texto: string, nombreClase: string) => {
  const span = document.querySelector(`#${id}`);

  if (span && span instanceof HTMLSpanElement) {
    span.textContent = texto;
    span.classList.add(nombreClase);
  } else {
    throw new Error(`No se encontro el span con id ${id}`);
  }
};

const gestionarEstado = (id: string, booleano: boolean) => {
  if (booleano) {
    gestionarSpan(id, "Correcto", "correcto");
  } else {
    gestionarSpan(id, "Incorrecto", "incorrecto");
  }
};


const limpiarSpan = (id :String) => {
  const span = document.querySelector(`#${id}`);

  if (span && span instanceof HTMLSpanElement) {
    span.textContent = '';
    span.classList.remove('correcto');
    span.classList.remove('incorrecto');
  } else {
    throw new Error(`No se encontro el span con id ${id}`);
  }
}

const pintarResultados = (ibanFormateado: IBAN) => {
 

  const banco = filtrarPorCodigoDeBanco(
    ibanFormateado.numeroCuenta.codigoEntidad,
    codigoDeBancos
  ).nombreDeBanco;
  gestionarSpan("banco", banco, "correcto");

  const codigoSucursal = ibanFormateado.numeroCuenta.codigoSucursal;
  gestionarSpan("codigo-sucursal", codigoSucursal, "correcto");

  const digitoDeControl = ibanFormateado.numeroCuenta.digitoControlCCC;
  gestionarSpan("digito-control", digitoDeControl, "correcto");

  const numeroDeCuenta = ibanFormateado.numeroCuenta.numeroCuentaCCC;
  gestionarSpan("numero-cuenta", numeroDeCuenta, "correcto");
};

export const validaIBANEnElDOM = (event: Event): void => {
  event.preventDefault();
  const iban = obtenerIBANdelUsuario();
  const todosLosSpan = document.querySelectorAll('.span');

  todosLosSpan.forEach(span => {
    const id : any = span.getAttribute('id')
    limpiarSpan(id)
  })
  const estaBienFormado = estáBienFormadoElIBAN(iban, patronIBAN);
  gestionarEstado("esta-bien-formado", estaBienFormado);
  if (!estaBienFormado) return;

  const esIBANValido = esValidoElIBAN(iban);
  gestionarEstado("es-valido", esIBANValido);
  if (!esIBANValido) return;

  const ibanFormateado: IBAN = formatearIBAN(iban, patronIBAN);

  pintarResultados(ibanFormateado);
};
