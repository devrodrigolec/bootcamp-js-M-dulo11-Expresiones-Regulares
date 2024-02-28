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
  const respuesta = texto.match(patron);
  if (respuesta) {
    return respuesta;
  } else {
    throw new Error("No se encontró ninguna etiqueta img");
  }
};

export const extraerLinksImg = (
  arrayEtiquetas: string[],
  patronLinkImg: RegExp
): RegExpMatchArray[] => {
  const linkImagenesArray: RegExpMatchArray[] = arrayEtiquetas.map(
    (etiqueta) => {
      const link = etiqueta.match(patronLinkImg);
      if (link) {
        return link;
      } else {
        throw new Error("Error al extraer link de imagenes");
      }
    }
  );

  return linkImagenesArray;
};
