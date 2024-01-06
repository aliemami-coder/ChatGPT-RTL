function addRTLToElements(selector) {
  const elements = document.querySelectorAll(selector);
  for (const element of elements) {
    if (element.textContent.match(/[\u0600-\u06FF]/)) {
      element.dir = "rtl";
    }
    if (element.nodeName === "PRE" || element.nodeName === "CODE") {
      element.style.textAlign = "left";
      element.dir = "ltr";
    }
  }
}

function addRTLToInput(input) {
  if (input.value.match(/[\u0600-\u06FF]/)) {
    input.dir = "rtl";
    input.style.paddingRight = "50px";
  } else {
    input.dir = "ltr";
    input.style.paddingRight = "";
  }
}

function handleMutation(mutations) {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          addRTLToElements(
            "p, div.whitespace-pre-wrap.flex:not(:has(*)), ol, li ,pre ,code",
            addedNode
          );
          const input = addedNode.querySelector("textarea");
          if (input) {
            addRTLToInput(input);
          }
        }
      }
    }
  }
}

addRTLToElements("p, ol, li");
const input = document.querySelector("textarea");
if (input) {
  input.addEventListener("input", () => addRTLToInput(input));
}

const observer = new MutationObserver(handleMutation);
observer.observe(document.body, { childList: true, subtree: true });
