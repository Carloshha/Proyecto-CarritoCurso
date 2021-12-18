// Variables eybooks.to
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  //Cuando agregas un curso presionando "agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  //Elimina curso del carrito
  carrito.addEventListener("click", eliminarCurso);
  //Elimina todos los cursos BTN
  vaciarCarritoBtn.addEventListener("click", () => {
    limpiarHTML();
    articulosCarrito = [];
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}
//Eliminar un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //Elimina cursos por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); //Iterar sobre el carrito y mostrar HTML
  }
}

// Leer contenido HTML al que le dismo click y extrae info curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //Revisa si un elemento ya existe
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //Agrega elementos al arreglo de carrito

  console.log(articulosCarrito);
  carritoHTML();
}

//Muestra carrito en html
function carritoHTML() {
  //   LimpiarHTML
  limpiarHTML();

  //Recorre carrito y genera html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${imagen}" width="100"</td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
     `;
    //Agrega HTML al tbody
    contenedorCarrito.appendChild(row);
  });
}

// //Elimina los cursos del Tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
