let browserCheck = () => {
  // Opera 8.0+
  var isOpera =
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== "undefined";
  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    );
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/ false || !!document.documentMode;
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1 - 68
  var isChrome = !!window.chrome;
  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  if (isOpera) {
    return "isOpera";
  } else if (isFirefox) {
    return "isFirefox";
  } else if (isSafari) {
    return "isSafari";
  } else if (isIE) {
    return "isSafari";
  } else if (isEdge) {
    return "isEdge";
  } else if (isChrome) {
    return "isChrome";
  } else if (isBlink) {
    return "isBlink";
  }
};

export default browserCheck;
