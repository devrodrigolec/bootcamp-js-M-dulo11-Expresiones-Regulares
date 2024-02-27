import { validateIBAN } from "ibantools";
import { Banco, CodigoIBAN, IBAN, NumeroDeCuenta } from "./validar-iban.model";
import { codigoDeBancos } from "./codigosDeBancos";



export const estáBienFormadoElIBAN = (iban: string, patron: RegExp) => {
  if (iban && patron) {
    return patron.test(iban);
  } else {
    throw new Error("Los parámetros ingresados son incorrectos");
  }
};

const parsearIBAN = (iban: string) => {
  const regex = /-|\s/gm;
  const ibanParseado = iban.replace(regex, '');

  return ibanParseado
}

export const esValidoElIBAN = (iban: string) => {
  const ibanParseado = parsearIBAN(iban)
  const esValido = validateIBAN(ibanParseado);
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

export const aQueBancoPertenece = (banco: Banco) => banco.nombreDeBanco;

export const obtenerCodigoEntidad = (
  iban: string,
  patronIBAN: RegExp,
  codigoDeBancos: Banco[]
): Banco => {
  const coincidencia = patronIBAN.exec(iban);

  if (coincidencia) {
    const { codigoEntidad } = coincidencia.groups as any;
    const banco: Banco = filtrarPorCodigoDeBanco(codigoEntidad, codigoDeBancos);
    return banco;
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

export const obtenerCodigoPais = (iban: string, patron: RegExp) => {
  const coincidencia = patron.exec(iban);

  if (coincidencia) {
    const { codigoPais } = coincidencia.groups as any;
    return codigoPais;
  } else {
    throw new Error("Error al obtener el codigo de país");
  }
};

export const obtenerDigitoDeControlIBAN = (iban: string, patron: RegExp) => {
  const coincidencia = patron.exec(iban);

  if (coincidencia) {
    const { digitoControlIBAN } = coincidencia.groups as any;
    return digitoControlIBAN;
  } else {
    throw new Error("Error al obtener el codigo de país");
  }
};

export const obtenerCodigoIBAN = (iban: string, patron: RegExp): CodigoIBAN => {
  const codigoPais = obtenerCodigoPais(iban, patron);
  const digitoControl = obtenerDigitoDeControlIBAN(iban, patron);
  return {
    codigoPais,
    digitoControlIBAN: digitoControl,
    codigoIBANParseado: () => `${codigoPais}${digitoControl}`,
  };
};

export const obtenerNumeroDeCuenta = (
  iban: string,
  patron: RegExp
): NumeroDeCuenta => {
  const codigoEntidad = obtenerCodigoEntidad(
    iban,
    patron,
    codigoDeBancos
  ).codigoBanco;
  const codigoSucursal = obtenerCodigoDeSucursal(iban, patron);
  const digitoControlCCC = obtenerDigitosDeControlCCC(iban, patron);
  const numeroCuentaCCC = obtenerNumeroDeCuentaCCC(iban, patron);
  return {
    codigoEntidad,
    codigoSucursal,
    digitoControlCCC,
    numeroCuentaCCC,
    numeroDeCuentaParseado: () =>
      `${codigoEntidad}${codigoSucursal}${digitoControlCCC}${numeroCuentaCCC}`,
  };
};

export const formatearIBAN = (iban : string, patron : RegExp) : IBAN=> {
  if (esValidoElIBAN(iban)) {
    const codigoIBAN = obtenerCodigoIBAN(iban, patron);
    const numeroCuenta = obtenerNumeroDeCuenta(iban, patron);

    return {
      codigoIBAN,
      numeroCuenta,
      IBANCompleto: () => `${codigoIBAN}${numeroCuenta}`,
    };
  } else {
    throw new Error("El IBAN no es válido");
  }
}