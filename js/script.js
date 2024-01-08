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
  const readmoreContent = readmoreBtn.closest(".readmore") || readmoreBtn.previousElementSibling;
  const expandedClass = "readmore--expanded";
  readmoreContent.classList.toggle(expandedClass);
});

let isClickedMyDiv = false;
let isClickedMyDiv2 = false;

const draggableElements = ["mydiv", "mydiv2"];

draggableElements.forEach((elementId) => {
  dragElement(document.getElementById(elementId), elementId);
});

function dragElement(elmnt, elementId) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let isClicked = elementId === "mydiv" ? isClickedMyDiv : isClickedMyDiv2; // Flag to track whether the element has been clicked

  elmnt.ontouchstart = dragMouseDown;
  elmnt.ontouchmove = elementDrag;
  elmnt.ontouchend = closeDragElement;
  elmnt.onmousedown = dragMouseDown;
  elmnt.onmousemove = elementDrag;
  elmnt.onmouseup = closeDragElement;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX || e.changedTouches[0].clientX;
    pos4 = e.clientY || e.changedTouches[0].clientY;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;
    isClicked = true; // Set the flag to true when the element is clicked
  }

  function elementDrag(e) {
    e.preventDefault();
    if (!isClicked) return; // Only move the element if the flag is set
    pos1 = pos3 - (e.clientX || e.changedTouches[0].clientX);
    pos2 = pos4 - (e.clientY || e.changedTouches[0].clientY);
    pos3 = e.clientX || e.changedTouches[0].clientX;
    pos4 = e.clientY || e.changedTouches[0].clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.ontouchend = null;
    document.ontouchmove = null;
    isClicked = false; // Reset the flag when the drag operation is finished
  }
}

function delegate(context, event, selector, handler) {
  context.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
  // Handle touch events
  if (event === "click") {
    context.addEventListener(
      "touchstart",
      function (e) {
        if (e.target.matches(selector)) {
          handler(e);
        }
      },
      { passive: false }
    );
  }
}
