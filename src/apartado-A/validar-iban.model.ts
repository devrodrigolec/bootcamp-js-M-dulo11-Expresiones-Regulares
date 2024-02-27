export interface CodigoIBAN {
  codigoPais: string;
  digitoControlIBAN: string;
  codigoIBANParseado: () => string;
}

export interface NumeroDeCuenta {
  codigoEntidad: string;
  codigoSucursal: string;
  digitoControlCCC: string;
  numeroCuentaCCC: string;
  numeroDeCuentaParseado: (NumeroDeCuenta: NumeroDeCuenta) => string;
}

export interface IBAN {
  codigoIBAN: CodigoIBAN;
  numeroCuenta: NumeroDeCuenta;
  IBANCompleto: () => string;
}

export const patronIBAN =
  /^(?<codigoPais>[A-Z]{2})(?<digitoControlIBAN>\d{2})(\s|-)?(?<codigoEntidad>\d{4})(\s|-)?(?<codigoSucursal>\d{4})(\s|-)?(?<digitoControlCCC>\d{2})(\s|-)?(?<numeroCuentaCCC>\d{10})$/;

export interface Banco {
  codigoBanco: string;
  nombreDeBanco: string;
}
