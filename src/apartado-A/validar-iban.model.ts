export interface CodigoIBAN {
  codigoPais: string;
  digitoControl: string;
}

export interface NumeroDeCuenta {
  codigoEntiedad: string;
  codigoSucursal: string;
  digitoControl: string;
  numeroCuenta: string;
}

export interface IBAN {
  codigoIBAN: CodigoIBAN;
  numeroCuenta: NumeroDeCuenta;
  IBANCompleto: (
    codigoIBAN: CodigoIBAN,
    numeroCuenta: NumeroDeCuenta
  ) => string;
}

export const patronIBAN =
  /^(?<codigoIBAN>(?<codigoPais>[A-Z]{2})(?<digitoControlIBAN>\d{2}))(\s|-)?(?<numeroDeCuenta>(?<codigoEntidad>\d{4})(\s|-)?(?<codigoSucursal>\d{4})(\s|-)?(?<digitoControlCCC>\d{2})(\s|-)?(?<numeroCuentaCCC>\d{10}))$/;

export interface Banco {
  codigoBanco: string;
  nombreDeBanco: string;
}
