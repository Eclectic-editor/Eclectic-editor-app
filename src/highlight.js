const style = document.createElement('style');

style.innerHTML = `
.hover-highlight {
  outline-offset: -1px;
  outline: 1px dashed #00b894;
  z-index: 1000;
}
.click-highlight {
  outline-offset: -1px;
  outline: 1px solid #0984e3;
  z-index: 1000;
}
.hover-element-info,
.click-element-info {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 5px;
  font-size: 14px;
  color: #ffffff;
  z-index: 1000;
  pointer-events: none;
}
`;
document.head.appendChild(style);

const hoverInfoBox = document.createElement('div');
hoverInfoBox.classList.add('hover-element-info');
document.body.appendChild(hoverInfoBox);

const clickInfoBox = document.createElement('div');
clickInfoBox.classList.add('click-element-info');
document.body.appendChild(clickInfoBox);

function getXPath(element) {
  if (element.id !== '') {
    return `//*[@id='${element.id}']`;
  }

  if (element === document.body) {
    return '/html/body';
  }

  let ix = 0;
  const siblings = element.parentNode.childNodes;

  for (let i = 0; i < siblings.length; i += 1) {
    const sibling = siblings[i];
    if (sibling === element) {
      const tagName = element.tagName.toLowerCase();
      return `${getXPath(element.parentNode)}/${tagName}[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix += 1;
    }
  }

  return null;
}

const updateInfoBoxPosition = (event, infoBoxParam) => {
  const infoBox = infoBoxParam;
  const rect = event.target.getBoundingClientRect();
  const { scrollY } = window;

  infoBox.style.top = `${rect.top + window.scrollY - infoBox.offsetHeight}px`;
  infoBox.style.left = `${rect.left + window.scrollX}px`;

  const infoBoxTop = parseFloat(infoBox.style.top);
  if (infoBoxTop < scrollY) {
    infoBox.style.top = `${rect.bottom + scrollY}px`;
  }

  infoBox.style.backgroundColor =
    event.type === 'mouseover' ? '#00b894' : '#0984e3';
  infoBox.innerHTML = `<strong>${event.target.tagName.toLowerCase()}</strong>${
    event.target.classList.length > 0
      ? `.${Array.from(event.target.classList)
          .filter((c) => c !== 'hover-highlight' && c !== 'click-highlight')
          .join('.')}`
      : ''
  }`;
};

let isFirstClick = true;

const addEventListeners = (target) => {
  target.addEventListener('mouseover', (event) => {
    if (window.hoveredElement) {
      window.hoveredElement.classList.remove('hover-highlight');
    }
    if (event.target.classList.contains('click-highlight')) return;

    event.target.classList.add('hover-highlight');
    window.hoveredElement = event.target;

    updateInfoBoxPosition(event, hoverInfoBox);
  });

  target.addEventListener('click', async (eventParam) => {
    const event = eventParam;
    event.preventDefault();
    event.stopPropagation();

    if (window.selectedElement) {
      window.selectedElement.classList.remove('click-highlight');
    }
    event.target.classList.add('click-highlight');
    window.selectedElement = event.target;

    const xPath = getXPath(event.target);
    const elementInfo = { xPath };
    window.electronAPI.elementClicked(elementInfo);

    if (isFirstClick) {
      updateInfoBoxPosition(event, clickInfoBox);

      requestAnimationFrame(() => {
        updateInfoBoxPosition(event, clickInfoBox);
      });

      isFirstClick = false;
    } else {
      updateInfoBoxPosition(event, clickInfoBox);
    }
  });
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        addEventListeners(node);
        node.querySelectorAll('*').forEach(addEventListeners);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

document.querySelectorAll('*').forEach(addEventListeners);
