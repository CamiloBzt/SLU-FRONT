// checkDisableInputsFile.js
export default function checkDisableInputsFile() {
  if (document.__disableInputsObserverRunning) return;

  document.__disableInputsObserverRunning = true;
  // Función que aplica las clases de deshabilitado a los elementos
  function applyDisabledClasses() {
    // Tariff, close account, copy account...
    const tariffButton = document.querySelector(".TarifarCont");
    if (tariffButton) tariffButton.classList.add("disabled-element");

    const closeAccountButton = document.querySelector(".closeCont");
    if (closeAccountButton)
      closeAccountButton.classList.add("disabled-element");

    const copyAccountButton = document.querySelector(".CopyAccount");
    if (copyAccountButton) copyAccountButton.classList.add("disabled-element");

    // Elementos generales (inputs, selects, textareas)
    document
      .querySelectorAll(".v-input")
      .forEach((el) => el.classList.add("disabled-element"));

    // Para los v-select y v-autocomplete, deshabilitamos la interacción con pointerEvents
    document
      .querySelectorAll(".v-select__selections, .v-autocomplete__selections")
      .forEach((el) => {
        el.classList.add("disabled-element");
        el.style.pointerEvents = "none";
      });

    // Botones y textareas en contenedores específicos
    document.querySelectorAll(".ButtonCont button, textarea").forEach((el) => {
      el.classList.add("disabled-element");
      // Si es un textarea, aseguramos que no reciba clicks
      if (el.tagName.toLowerCase() === "textarea") {
        el.style.pointerEvents = "none";
      }
    });

    // Remover inputs de archivos si es necesario
    document.querySelectorAll(".file input").forEach((input) => input.remove());

    // Otros elementos
    document
      .querySelectorAll(".InputFileContent")
      .forEach((el) => el.classList.add("disabled-element"));

    document.querySelectorAll(".InputDeletContBtn").forEach((btn) => {
      btn.classList.add("disabled-element");
      btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll(".actions button.v-btn").forEach((btn) => {
      btn.classList.add("disabled-element");
      btn.replaceWith(btn.cloneNode(true));
    });

    document
      .querySelectorAll(".button")
      .forEach((btn) => btn.classList.add("disabled-element"));

    document
      .querySelectorAll(".moreButton")
      .forEach((btn) => btn.classList.add("disabled-element-hidden"));

    document.querySelectorAll("button.moreButton").forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled-element");
    });

    document.querySelectorAll(".CreateNoteCont button.v-btn").forEach((btn) => {
      btn.classList.add("disabled-element");
      btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll(".text-ar-sect").forEach((el) => {
      el.classList.add("disabled-element");
      el.replaceWith(el.cloneNode(true));
    });

    // NUEVOS SELECTORES:
    // Deshabilitar interacción de todos los botones con clase v-btn (por ejemplo, botones de eliminar o restar)
    document.querySelectorAll("button.v-btn").forEach((btn) => {
      btn.style.pointerEvents = "none";
    });

    // Para los botones dentro de contenedores .remove-button, deshabilitarlos y aplicar pointerEvents = none
    document.querySelectorAll(".remove-button button").forEach((btn) => {
      btn.classList.add("disabled-element");
      btn.disabled = true;
      btn.style.pointerEvents = "none";
    });
  }

  // Llamada inmediata para aplicar a los elementos ya presentes
  applyDisabledClasses();

  // Crear un MutationObserver para reaccionar a cambios en el DOM
  const observer = new MutationObserver((mutationsList, observerInstance) => {
    applyDisabledClasses();
  });

  // Inicia la observación en todo el documento (childList y subtree para detectar cualquier cambio)
  observer.observe(document.body, { childList: true, subtree: true });

  // Opcionalmente, desconectar el observer después de 5 segundos (o el tiempo que consideres adecuado)
  setTimeout(() => {
    observer.disconnect();
    document.__disableInputsObserverRunning = false;
  }, 3000);
}
