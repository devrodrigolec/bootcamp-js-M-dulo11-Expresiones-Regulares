import {
  extraerEtiquetasIMG,
  extraerLinks,
  extraerTexto,
  extrarSRC,
} from "./extraer-imagenes.control";
import {
  patronEtiquetaImg,
  patronLinkImg,
  patronSRC,
} from "./extraer-imagenes.model";

const crearParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  const ancla = document.createElement("a");
  ancla.href = texto;
  ancla.textContent = `${texto} 👈`;
  ancla.target = "_blank";
  parrafo.classList.add("resultado");
  parrafo.appendChild(ancla);
  return parrafo;
};

//@ts-ignore
const pintarResultados = (linksArray: string[]) => {
  const divResultados = document.querySelector("#div-resultados");

  if (divResultados && divResultados instanceof HTMLDivElement) {
    linksArray.forEach((link) => {
      const parrafo = crearParrafo(link);
      divResultados.appendChild(parrafo);
    });
  } else {
    throw new Error("No se encontró div-resultados");
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
    alert("No hay etiquetas img en el HTML");
    throw new Error("No hay etiquetas IMG en el HTML");
  }
  const arraySRC = extrarSRC(etiquetasImgArray, patronSRC);
  if (arraySRC.length === 0) {
    alert("No hay ningun SRC en las etiquetas IMG");
    throw new Error("No hay SRC en las etiquetas IMG");
  }

  const links = extraerLinks(arraySRC, patronLinkImg);
  if (links.length === 0) {
    alert(
      "No hay links válidos para mostrar, los links deben terminar en formato .jpg, .png, .webp, .gif, etc..."
    );
    throw new Error("No hay imágenes con formato válido");
  }
  pintarResultados(links);
};
