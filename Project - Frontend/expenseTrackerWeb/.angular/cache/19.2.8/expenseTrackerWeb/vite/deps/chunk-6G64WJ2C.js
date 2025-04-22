import {
  EMPTY,
  ElementRef,
  Observable,
  Subject,
  TemplateRef,
  fromEvent,
  isDevMode,
  numberAttribute,
  take
} from "./chunk-CAKONX5G.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-environments.mjs
var environment = {
  isTestMode: false
};

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-logger.mjs
var record = {};
var PREFIX = "[NG-ZORRO]:";
function notRecorded(...args) {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), "");
  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}
function consoleCommonBehavior(consoleFunc, ...args) {
  if (environment.isTestMode || isDevMode() && notRecorded(...args)) {
    consoleFunc(...args);
  }
}
var warn = (...args) => consoleCommonBehavior((...arg) => console.warn(PREFIX, ...arg), ...args);

// node_modules/@angular/cdk/fesm2022/boolean-property-_aCfQwp8.mjs
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}

// node_modules/@angular/cdk/fesm2022/element-CpqV8p-X.mjs
function coerceNumberProperty(value, fallbackValue = 0) {
  if (_isNumberValue(value)) {
    return Number(value);
  }
  return arguments.length === 2 ? fallbackValue : 0;
}
function _isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

// node_modules/@angular/cdk/fesm2022/array-Hg8isvLj.mjs
function coerceArray(value) {
  return Array.isArray(value) ? value : [value];
}

// node_modules/@angular/cdk/fesm2022/css-pixel-value-C1yoKJ7R.mjs
function coerceCssPixelValue(value) {
  if (value == null) {
    return "";
  }
  return typeof value === "string" ? value : `${value}px`;
}

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-util.mjs
function isNotNil(value) {
  return typeof value !== "undefined" && value !== null;
}
function isNil(value) {
  return typeof value === "undefined" || value === null;
}
function isTemplateRef(value) {
  return value instanceof TemplateRef;
}
function toBoolean(value) {
  return coerceBooleanProperty(value);
}
function numberAttributeWithZeroFallback(value) {
  return numberAttribute(value, 0);
}
function numberAttributeWithInfinityFallback(value) {
  return numberAttribute(value, Infinity);
}
function toCssPixel(value) {
  return coerceCssPixelValue(value);
}
function valueFunctionProp(prop, ...args) {
  return typeof prop === "function" ? prop(...args) : prop;
}
function isTouchEvent(event) {
  return event.type.startsWith("touch");
}
function getEventPosition(event) {
  return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}
var isBrowser = typeof window !== "undefined";
var isFirefox = isBrowser && window.mozInnerScreenX != null;
function isStyleSupport(styleName) {
  if (typeof window !== "undefined" && window.document && window.document.documentElement) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    const {
      documentElement
    } = window.document;
    return styleNameList.some((name) => name in documentElement.style);
  }
  return false;
}
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var ellipsisContainer;
var wrapperStyle = {
  padding: "0",
  margin: "0",
  display: "inline",
  lineHeight: "inherit"
};
function pxToNumber(value) {
  if (!value) {
    return 0;
  }
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}
function styleToString(style) {
  const styleNames = Array.prototype.slice.apply(style);
  return styleNames.map((name) => `${name}: ${style.getPropertyValue(name)};`).join("");
}
function mergeChildren(children) {
  const childList = [];
  children.forEach((child) => {
    const prevChild = childList[childList.length - 1];
    if (prevChild && child.nodeType === TEXT_NODE && prevChild.nodeType === TEXT_NODE) {
      prevChild.data += child.data;
    } else {
      childList.push(child);
    }
  });
  return childList;
}
function measure(originEle, rows, contentNodes, fixedContent, ellipsisStr, suffixStr = "") {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement("div");
    ellipsisContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(ellipsisContainer);
  }
  const originStyle = window.getComputedStyle(originEle);
  const originCSS = styleToString(originStyle);
  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight = Math.round(lineHeight * (rows + 1) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
  ellipsisContainer.setAttribute("style", originCSS);
  ellipsisContainer.style.position = "fixed";
  ellipsisContainer.style.left = "0";
  ellipsisContainer.style.height = "auto";
  ellipsisContainer.style.minHeight = "auto";
  ellipsisContainer.style.maxHeight = "auto";
  ellipsisContainer.style.top = "-999999px";
  ellipsisContainer.style.zIndex = "-1000";
  ellipsisContainer.style.textOverflow = "clip";
  ellipsisContainer.style.whiteSpace = "normal";
  ellipsisContainer.style.webkitLineClamp = "none";
  const contentList = mergeChildren(contentNodes);
  const container = document.createElement("div");
  const contentContainer = document.createElement("span");
  const suffixContainer = document.createTextNode(suffixStr);
  const fixedContainer = document.createElement("span");
  Object.assign(container.style, wrapperStyle);
  Object.assign(contentContainer.style, wrapperStyle);
  Object.assign(fixedContainer.style, wrapperStyle);
  contentList.forEach((n) => {
    contentContainer.appendChild(n);
  });
  contentContainer.appendChild(suffixContainer);
  fixedContent.forEach((node) => {
    fixedContainer.appendChild(node.cloneNode(true));
  });
  container.appendChild(contentContainer);
  container.appendChild(fixedContainer);
  ellipsisContainer.appendChild(container);
  function inRange() {
    return ellipsisContainer.offsetHeight < maxHeight;
  }
  if (inRange()) {
    const text = ellipsisContainer.innerHTML;
    ellipsisContainer.removeChild(container);
    return {
      contentNodes,
      text,
      ellipsis: false
    };
  }
  const childNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes).filter(({
    nodeType
  }) => nodeType !== COMMENT_NODE);
  const fixedNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes);
  ellipsisContainer.removeChild(container);
  ellipsisContainer.innerHTML = "";
  const ellipsisContentHolder = document.createElement("span");
  ellipsisContainer.appendChild(ellipsisContentHolder);
  const ellipsisTextNode = document.createTextNode(ellipsisStr + suffixStr);
  ellipsisContentHolder.appendChild(ellipsisTextNode);
  fixedNodes.forEach((childNode) => {
    ellipsisContainer.appendChild(childNode);
  });
  function appendChildNode(node) {
    ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
  }
  function measureText(textNode, fullText, startLoc = 0, endLoc = fullText.length, lastSuccessLoc = 0) {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    textNode.textContent = fullText.slice(0, midLoc);
    if (startLoc >= endLoc - 1) {
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;
        if (inRange() || !currentStepText) {
          return step === fullText.length ? {
            finished: false,
            node: document.createTextNode(fullText)
          } : {
            finished: true,
            node: document.createTextNode(currentStepText)
          };
        }
      }
    }
    if (inRange()) {
      return measureText(textNode, fullText, midLoc, endLoc, midLoc);
    } else {
      return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
    }
  }
  function measureNode(childNode, index) {
    const type = childNode.nodeType;
    if (type === ELEMENT_NODE) {
      if (inRange()) {
        return {
          finished: false,
          node: contentList[index]
        };
      }
      ellipsisContentHolder.removeChild(childNode);
      return {
        finished: true,
        node: null
      };
    } else if (type === TEXT_NODE) {
      const fullText = childNode.textContent || "";
      const textNode = document.createTextNode(fullText);
      appendChildNode(textNode);
      return measureText(textNode, fullText);
    }
    return {
      finished: false,
      node: null
    };
  }
  const ellipsisNodes = [];
  childNodes.some((childNode, index) => {
    const {
      finished,
      node
    } = measureNode(childNode, index);
    if (node) {
      ellipsisNodes.push(node);
    }
    return finished;
  });
  const result = {
    contentNodes: ellipsisNodes,
    text: ellipsisContainer.innerHTML,
    ellipsis: true
  };
  while (ellipsisContainer.firstChild) {
    ellipsisContainer.removeChild(ellipsisContainer.firstChild);
  }
  return result;
}
function inNextTick() {
  const timer = new Subject();
  Promise.resolve().then(() => timer.next());
  return timer.pipe(take(1));
}
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var MARK_KEY = `rc-util-key`;
function getMark({
  mark
} = {}) {
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function injectCSS(css, options = {}) {
  if (!canUseDom()) {
    return null;
  }
  const styleNode = document.createElement("style");
  if (options.cspNonce) {
    styleNode.nonce = options.cspNonce;
  }
  styleNode.innerHTML = css;
  const container = getContainer(options);
  const {
    firstChild
  } = container;
  if (options.prepend && container.prepend) {
    container.prepend(styleNode);
  } else if (options.prepend && firstChild) {
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
var containerCache = /* @__PURE__ */ new Map();
function findExistNode(key, option = {}) {
  const container = getContainer(option);
  return Array.from(containerCache.get(container)?.children || []).find((node) => node.tagName === "STYLE" && node.getAttribute(getMark(option)) === key);
}
function updateCSS(css, key, options = {}) {
  const container = getContainer(options);
  if (!containerCache.has(container)) {
    const placeholderStyle = injectCSS("", options);
    const {
      parentNode
    } = placeholderStyle;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }
  const existNode = findExistNode(key, options);
  if (existNode) {
    if (options.cspNonce && existNode.nonce !== options.cspNonce) {
      existNode.nonce = options.cspNonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  const newNode = injectCSS(css, options);
  newNode?.setAttribute(getMark(options), key);
  return newNode;
}
function getStatusClassNames(prefixCls, status, hasFeedback) {
  return {
    [`${prefixCls}-status-success`]: status === "success",
    [`${prefixCls}-status-warning`]: status === "warning",
    [`${prefixCls}-status-error`]: status === "error",
    [`${prefixCls}-status-validating`]: status === "validating",
    [`${prefixCls}-has-feedback`]: hasFeedback
  };
}
function runOutsideAngular(fn) {
  return typeof Zone !== "undefined" ? Zone.root.run(fn) : fn();
}
function fromEventOutsideAngular(target, name, options) {
  if (!target) {
    return EMPTY;
  }
  return new Observable((subscriber) => {
    return runOutsideAngular(() => (
      // Casting because the inferred overload is incorrect :(
      fromEvent(target, name, options).subscribe(subscriber)
    ));
  });
}

export {
  environment,
  warn,
  coerceNumberProperty,
  coerceElement,
  coerceArray,
  coerceCssPixelValue,
  isNotNil,
  isNil,
  isTemplateRef,
  toBoolean,
  numberAttributeWithZeroFallback,
  numberAttributeWithInfinityFallback,
  toCssPixel,
  valueFunctionProp,
  isTouchEvent,
  getEventPosition,
  isStyleSupport,
  measure,
  inNextTick,
  canUseDom,
  updateCSS,
  getStatusClassNames,
  fromEventOutsideAngular
};
//# sourceMappingURL=chunk-6G64WJ2C.js.map
