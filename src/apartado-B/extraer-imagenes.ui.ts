import {
  extraerEtiquetasIMG,
  extraerLinksImg,
  extraerTexto,
} from "./extraer-imagenes.control";
import { patronEtiquetaImg, patronLinkImg } from "./extraer-imagenes.model";

const crearParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  const ancla = document.createElement('a')
  ancla.href = texto
  ancla.textContent = `${texto} 👈`
  ancla.target = '_blank'
  parrafo.classList.add('resultado')
  parrafo.appendChild(ancla);
  return parrafo;
};

const pintarResultados = (linksArray: RegExpMatchArray[]) => {
  const divResultados = document.querySelector("#div-resultados");

  if (divResultados && divResultados instanceof HTMLDivElement) {
    linksArray.forEach((link) => {
      const parrafo = crearParrafo(link[0].toString());
      divResultados.appendChild(parrafo);
    });
  } else {
    throw new Error ('No se encontró div-resultados')
  }
};

export const gestionarExtraerImagenes = (event: Event) => {
  event.preventDefault();

  const texto: string = extraerTexto();
  if (texto.length === 0) {
    alert("Debes introducir un HTML para poder extraer las imágenes");
    throw new Error("El texto-area está vacío");
  }
  const etiquetasImgArray: string[] = extraerEtiquetasIMG(
    texto,
    patronEtiquetaImg
  );

  if (etiquetasImgArray.length === 0) {
    alert("No se encontró ninguna imagen en el HTML");
    throw new Error("No hay imágenes en el HTML");
  }
  const linksImgArray = extraerLinksImg(etiquetasImgArray, patronLinkImg);

  pintarResultados(linksImgArray);
};
