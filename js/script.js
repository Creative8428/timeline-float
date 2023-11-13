function openNav() {
  document.getElementById("mySideNav").style.width = "320px";
}

function closeNav() {
  document.getElementById("mySideNav").style.width = "0";
}

let btn = document.getElementById("openingBtn");
btn.addEventListener("click", function () {
  openNav();
});

delegate(document, "click", '[data-toggle="readmore"]', function (event) {
  event.preventDefault();
  const readmoreBtn = event.target;
  const readmoreContent =
    readmoreBtn.closest(".readmore") || readmoreBtn.previousElementSibling;
  const expandedClass = "readmore--expanded";
  readmoreContent.classList.toggle(expandedClass);
});

function delegate(context, event, selector, handler) {
  context.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
}

const draggableElements = ["mydiv", "mydiv2"];

draggableElements.forEach((elementId) => {
  dragElement(document.getElementById(elementId));
});

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const idHeaders = [`${elmnt.id}header`, `${elmnt.id}header2`].filter((id) =>
    document.getElementById(id)
  );
  idHeaders.forEach(
    (headerId) =>
      (document.getElementById(headerId).onmousedown = dragMouseDown)
  );

  if (idHeaders.length === 0) {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
