let otpInput = document.getElementById("submit1");
let underlines = document.getElementsByClassName("underline");

function setUnderscore(position) {
  return underlines[position].classList.add("underline-active");
}

function removeAllUnderscores() {
  for (var i = 0; i < 6; i++) {
    underlines[i].classList.remove("underline-active");
  }
}

const setUnderline = (e) => {
  // first remove all underscores
  removeAllUnderscores();

  // if clicked set underscore to carret position
  if (e.type === "click") {
    setUnderscore(otpInput.selectionStart);
  }

  if (e.type === "paste") {
    let paste = e.clipboardData.getData("text");
    return setUnderscore(paste.length);
  }

  if (e.type === "keydown") {
    // allow to paste code
    const copyPasteKeyCodes = [17, 18, 91, 93, 86];
    if (copyPasteKeyCodes.includes(e.keyCode)) {
      return;
    }

    let index = otpInput.selectionStart + 1;

    // backspace / left arrow / delete
    const specialKeys = [8, 37, 38, 39, 46];
    if (
      // Numbers between 0-9 (includes numpad)
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      specialKeys.includes(e.keyCode)
    ) {
      // backspace / left arrow
      if (e.keyCode === 8 || e.keyCode === 37) {
        index = otpInput.selectionStart - 1;
      }
      // right arrow
      if (e.keyCode === 39) {
        if (otpInput.selectionStart === otpInput.value.length) {
          return setUnderscore(otpInput.selectionStart);
        }
      }
      // delete
      if (e.keyCode === 46) {
        index = otpInput.selectionStart;
      }

      if (index < 0) {
        return setUnderscore(0);
      }

      if (index < 6) {
        setUnderscore(index);
      }
    } else {
      setUnderscore(otpInput.selectionStart);
      e.preventDefault();
    }
  }
};

otpInput.addEventListener("keydown", (e) => setUnderline(e));
otpInput.addEventListener("click", (e) => setUnderline(e));
otpInput.addEventListener("paste", (e) => setUnderline(e));
