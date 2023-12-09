var list = [];

function ejecucionInicial() {
  const clave = "arreglo";

  // Obtener el arreglo del localStorage
  const arregloEnJSON = localStorage.getItem(clave);

  // Convertir el arreglo JSON a un arreglo
  const arreglo = JSON.parse(arregloEnJSON);

  // Si el arreglo existe
  if (arreglo !== null) {
    // Si el arreglo es un arreglo
    if (Array.isArray(arreglo)) {
      // Crear una lista vacía
      const lista = [];

      // Iterar sobre los elementos del arreglo
      for (const elemento of arreglo) {
        // Agregar el elemento a la lista
        lista.push(elemento);
      }

      // Agregar la lista al HTML
      const elementoUl = document.querySelector("#lista");
      for (const elemento of lista) {
        // Crear el elemento li
        const elementoLi = document.createElement("li");

        // Agregar el contenido al elemento li
        elementoLi.textContent = elemento;

        // Agregar la clase list-group-item al elemento li
        elementoLi.classList.add("list-group-item");

        // Agregar el elemento li al elemento ul
        elementoUl.appendChild(elementoLi);
      }
    }
  }
}

function validarInput() {
  let cantidadCaracteres = document.getElementById("req").value.length;
  if (cantidadCaracteres > 1) {
    document.getElementById("btnAdd").disabled = false;
  } else {
    document.getElementById("btnAdd").disabled = true;
  }
}

function agregarArregloAlLocalStorage(arreglo) {
  // Obtener la clave del arreglo en el localStorage
  const clave = "arreglo";

  // Convertir el arreglo a una cadena JSON
  const arregloEnJSON = JSON.stringify(arreglo);

  // Almacenar el arreglo en el localStorage
  localStorage.setItem(clave, arregloEnJSON);
}

function eliminarElementoDeArregloEnLocalStorage(clave, elemento) {
  // Obtener el arreglo del localStorage
  const arregloEnJSON = localStorage.getItem(clave);

  // Convertir el arreglo JSON a un arreglo
  const arreglo = JSON.parse(arregloEnJSON);

  // Buscar el elemento en el arreglo
  const indice = arreglo.indexOf(elemento);

  // Si se encontró el elemento, eliminarlo
  if (indice !== -1) {
    arreglo.splice(indice, 1);

    // Actualizar el arreglo en el localStorage
    const arregloEnJSONActualizado = JSON.stringify(arreglo);
    localStorage.setItem(clave, arregloEnJSONActualizado);
  }
}

function agregarTarea() {
  //obtenemos el valor del input
  let producto = document.getElementById("req").value;
  //agregamos el valor al arreglo
  list.push(producto);
  //agregamos el arreglo al localStorage
  agregarArregloAlLocalStorage(list);
  //obtenemos el elemento ul con el id lista donde agregaremos los elementos
  let elePadre = document.getElementById("lista");
  //creamos un elemento li
  let li = document.createElement('li');
  //agregamos el texto del input al elemento li
  let contentLi = document.createTextNode(producto);
  //agregar clase de item lista de bootstrap
  li.setAttribute('class', 'list-group-item');
  //agregamos manejador de evento del doble click para eliminar tanto de la lista como del localStorage
  li.setAttribute('ondblclick', "if (confirm('deseas eliminar esta tarea?')) { console.log(this.textContent); eliminarElementoDeArregloEnLocalStorage('arreglo', this.textContent); this.parentNode.removeChild(this);}");
  //agregamos contenido al li
  li.appendChild(contentLi);
  //agregamos el li a la lista
  elePadre.appendChild(li);
  //Limpiar el input
  document.getElementById("req").value = "";

}

