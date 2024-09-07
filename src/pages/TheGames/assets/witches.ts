export const WITCH = ["/witchone.png", "/witchtwo.png", "/witchthree.png"];
export const WITCHES = WITCH.map((witch) => {
  const img = new Image();
  img.src = process.env.PUBLIC_URL + witch;
  return img;
});

Object.defineProperties(window, {
  _witches: {
    value: WITCHES,
    writable: true,
    configurable: true,
    enumerable: true,
  },
  witches: {
    get() {
      return this._witches;
    },
    set(value) {
      this._witches = value;
    },
  },
});

const OWL = ["/owlone.png", "/owltwo.png", "/goya.png"];
export const OWLS = OWL.map((owl) => {
  const img = new Image();
  img.src = process.env.PUBLIC_URL + owl;
  return img;
});

Object.defineProperties(window, {
  _owls: {
    value: OWLS,
    writable: true,
    configurable: true,
    enumerable: true,
  },
  owls: {
    get() {
      return this._owls;
    },
    set(value) {
      this._owls = value;
    },
  },
});
