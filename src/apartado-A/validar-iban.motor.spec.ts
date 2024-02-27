import { aQueBancoPertenece, esValidoElIBAN, estáBienFormadoElIBAN, obtenerCodigoDeSucursal, obtenerCodigoEntidad, obtenerDigitosDeControlCCC, obtenerNumeroDeCuentaCCC } from "./validar-iban.motor";
import { Banco, patronIBAN } from "./validar-iban.model";
import { codigoDeBancos } from "./codigosDeBancos";


describe("estaBienFormadoElIBAN", () => {
  test.each([
    ["ES21 1465 0100 72 2030876293", true],
    ["ES2114650100722030876293", true],
    ["ES21-1465-0100-72-2030876293", true],
    ["ES6621000418401234567891", true],
  ])("El IBAN %s debe retornar %s", (iban: string, expected: boolean) => {
    expect(estáBienFormadoElIBAN(iban, patronIBAN)).toBe(expected);
  });
});

describe('esValidoElIBAN', () => {
  test.each([
    ["ES7921000813610123456789", true],
    ["ES9121000418450200051332", true],
    ["ES9420805801101234567891", true],
    ["ES9000246912501234567891", true],
    ["ES7100302053091234567895", true],
    ["ES792100081361012345678", false],
    ["ES912100041845020005133", false],
    ["ES63210036491611234567", false],
    ["ES152100098221012345678", false],
    ["ES98210092843901234567890", false]
  ])('El IBAN %s debe devolver %s', (iban: string, expected: boolean) => {
    expect(esValidoElIBAN(iban)).toBe(expected);
  })
})

describe('aQueBancoPertenece', () => {
  test.each([
    ["ES9420805801101234567891", "Abanca Corporación Bancaria"],
    ["ES1000492352082414205416", "Banco Santander"],
    ["ES6621000418401234567891", "Caixabank"]
  ])('El IBAN %s debe retornar %s', (iban : string, expected: string) => {
    const banco : Banco = obtenerCodigoEntidad(iban, patronIBAN, codigoDeBancos)
    expect(aQueBancoPertenece(banco)).toBe(expected)
  })
})

describe('obtenerCodigoSucursal', () => {
  test.each([
    ["ES9420805801101234567891", "5801"],
    ["ES1000492352082414205416", "2352"],
    ["ES6621000418401234567891", "0418"]
  ])('El IBAN %s debe retornar %s', (iban : string, expected: string) => {
    expect(obtenerCodigoDeSucursal(iban, patronIBAN)).toBe(expected)
  })
})

describe('obtenerDigitoDeControlCCC', () => {
  test.each([
    ["ES9420805801101234567891", "10"],
    ["ES1000492352082414205416", "08"],
    ["ES6621000418401234567891", "40"]
  ])('El IBAN %s debe retornar %s', (iban : string, expected: string) => {
    expect(obtenerDigitosDeControlCCC(iban, patronIBAN)).toBe(expected)
  })
})
describe('obtenerNumeroDeCuentaCCC', () => {
  test.each([
    ["ES9420805801101234567891", "1234567891"],
    ["ES1000492352082414205416", "2414205416"],
    ["ES6621000418401234567891", "1234567891"]
  ])('El IBAN %s debe retornar %s', (iban : string, expected: string) => {
    expect(obtenerNumeroDeCuentaCCC(iban, patronIBAN)).toBe(expected)
  })
})