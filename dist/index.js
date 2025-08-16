var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var core2 = __toESM(require("@actions/core"));

// src/expect.ts
var core = __toESM(require("@actions/core"));

// src/errors/required-param.error.ts
var RequiredParamError = class extends Error {
  constructor(param) {
    super(`Param ${param} is required`);
  }
};

// src/errors/unexpected-type.error.ts
var UnexpectedTypeError = class extends Error {
  constructor() {
    super("Unexpected type");
  }
};

// src/errors/unexpected-value.error.ts
var UnexpectedValueError = class extends Error {
  constructor() {
    super("Unexpected value");
  }
};

// src/validators/enum.validator.ts
var EnumValidator = class {
  constructor() {
    this.params = [
      "options"
    ];
  }
  validate(value, params) {
    return params.options.split(",").includes(value);
  }
};

// src/validators/regex.validator.ts
var RegexValidator = class {
  constructor() {
    this.params = [
      "pattern"
    ];
  }
  validate(value, params) {
    return new RegExp(params.pattern).test(value);
  }
};

// src/validators/index.ts
var validators = {
  enum: EnumValidator,
  regex: RegexValidator
};

// src/expect.ts
function expect(value, type) {
  const Validator = validators[type];
  if (!Validator) {
    throw new UnexpectedTypeError();
  }
  const validator = new Validator();
  const params = validator.params.reduce((accumulator, param) => {
    const value2 = core.getInput(param);
    if (!value2) {
      throw new RequiredParamError(param);
    }
    return __spreadProps(__spreadValues({}, accumulator), {
      [param]: value2
    });
  }, {});
  const valid = validator.validate(value, params);
  if (!valid) {
    throw new UnexpectedValueError();
  }
}

// src/index.ts
try {
  const type = core2.getInput("type");
  const value = core2.getInput("value");
  expect(value, type);
} catch (error) {
  core2.setFailed(error.message);
}
