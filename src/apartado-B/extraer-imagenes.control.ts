export const extraerTexto = (): string => {
  const textArea = document.querySelector("#text-area");

  if (textArea && textArea instanceof HTMLTextAreaElement) {
    const texto = textArea.value;
    return texto;
  } else {
    throw new Error("No se encontró el elemento HTML text-area");
  }
};

export const extraerEtiquetasIMG = (
  texto: string,
  patron: RegExp
): string[] => {
  let respuestaArray: string[] = [];
  const respuesta: RegExpMatchArray | null = texto.match(patron);
  if (respuesta) {
    respuesta.forEach((resp) => {
      respuestaArray = [...respuestaArray, resp];
    });
  }

  return respuestaArray;
};

export const extrarSRC = (arrayEtiquetasImg: string[], patronSRC: RegExp) => {
  let arrayRespuestaOk: string[] = [];
  arrayEtiquetasImg.forEach((src) => {
    const match = src.match(patronSRC);
    if (match) {
      arrayRespuestaOk = [...arrayRespuestaOk, match[0]];
    }
  });

  return arrayRespuestaOk;
};

export const extraerLinks = (arraySRC: string[], patronLink: RegExp) => {
  let arrayLinks: string[] = [];
  arraySRC.forEach((src) => {
    const coincidencia = patronLink.exec(src);
    if (coincidencia) {
      const { link } = coincidencia.groups as any;
      arrayLinks = [...arrayLinks, link];
    }
  });

  return arrayLinks;
};
