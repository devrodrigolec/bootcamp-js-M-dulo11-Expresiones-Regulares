import { validateIBAN } from "ibantools";

import { Banco } from "./validar-iban.model";

/* 
ES21 1465 0100 72 2030876293

ES2114650100722030876293

ES21-1465-0100-72-2030876293

ES6621000418401234567891 
*/

export const estáBienFormadoElIBAN = (iban: string, patron: RegExp) => {
  if (iban && patron) {
    return patron.test(iban);
  } else {
    throw new Error("Los parámetros ingresados son incorrectos");
  }
};

export const esValidoElIBAN = (iban: string) => {
  const esValido = validateIBAN(iban);
  return esValido.valid;
};

export const filtrarPorCodigoDeBanco = (
  codigoEntidad: string,
  codigoDeBancos: Banco[]
): Banco => {
  const index = codigoDeBancos.findIndex(
    (banco) => codigoEntidad === banco.codigoBanco
  );

  return codigoDeBancos[index];
};

export const aQueBancoPertenece = (
  iban: string,
  patronIBAN: RegExp,
  codigoDeBancos: Banco[]
): string => {
  const coincidencia = patronIBAN.exec(iban);

  if (coincidencia) {
    const { codigoEntidad } = coincidencia.groups as any;
    const banco: Banco = filtrarPorCodigoDeBanco(codigoEntidad, codigoDeBancos);
    return banco.nombreDeBanco;
  } else {
    throw new Error("Error al obtener Banco de pertenencia");
  }
};

export const obtenerCodigoDeSucursal = (
  iban: string,
  patron: RegExp
): string => {
  const coincidencia = patron.exec(iban);

  if (coincidencia) {
    const { codigoSucursal } = coincidencia.groups as any;
    return codigoSucursal;
  } else {
    throw new Error("Error al obtener Codigo de Sucursal");
  }
};

export const obtenerDigitosDeControlCCC = (iban: string, patron: RegExp) => {
  const coincidencia = patron.exec(iban);

  if (coincidencia) {
    const { digitoControlCCC } = coincidencia.groups as any;
    return digitoControlCCC;
  } else {
    throw new Error("Error al obtener Digitos de Control CCC");
  }
};

export const obtenerNumeroDeCuentaCCC = (iban: string, patron: RegExp) => {
  const coincidencia = patron.exec(iban);

  if (coincidencia) {
    const { numeroCuentaCCC } = coincidencia.groups as any;
    return numeroCuentaCCC;
  } else {
    throw new Error("Error al obtener Digitos de Control CCC");
  }
};
