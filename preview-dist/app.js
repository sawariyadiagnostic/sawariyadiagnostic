(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
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

  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
  var init_clsx = __esm({
    "node_modules/clsx/dist/clsx.mjs"() {
    }
  });

  // node_modules/class-variance-authority/dist/index.mjs
  var falsyToString, cx, cva;
  var init_dist = __esm({
    "node_modules/class-variance-authority/dist/index.mjs"() {
      init_clsx();
      falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
      cx = clsx;
      cva = (base, config) => (props) => {
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant) => {
          const variantProp = props === null || props === void 0 ? void 0 : props[variant];
          const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
          if (variantProp === null) return null;
          const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
          return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
          let [key, value] = param;
          if (value === void 0) {
            return acc;
          }
          acc[key] = value;
          return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
          let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
          return Object.entries(compoundVariantOptions).every((param2) => {
            let [key, value] = param2;
            return Array.isArray(value) ? value.includes({
              ...defaultVariants,
              ...propsWithoutUndefined
            }[key]) : {
              ...defaultVariants,
              ...propsWithoutUndefined
            }[key] === value;
          }) ? [
            ...acc,
            cvClass,
            cvClassName
          ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
      };
    }
  });

  // node_modules/tailwind-merge/dist/bundle-mjs.mjs
  function twJoin() {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < arguments.length) {
      if (argument = arguments[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  }
  function createTailwindMerge(createConfigFirst, ...createConfigRest) {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall = initTailwindMerge;
    function initTailwindMerge(classList) {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    }
    function tailwindMerge(classList) {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    }
    return function callTailwindMerge() {
      return functionToCall(twJoin.apply(null, arguments));
    };
  }
  var CLASS_PART_SEPARATOR, createClassGroupUtils, getGroupRecursive, arbitraryPropertyRegex, getGroupIdForArbitraryProperty, createClassMap, processClassesRecursively, getPart, isThemeGetter, getPrefixedClassGroupEntries, createLruCache, IMPORTANT_MODIFIER, createParseClassName, sortModifiers, createConfigUtils, SPLIT_CLASSES_REGEX, mergeClassList, toValue, fromTheme, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, isLength, isArbitraryLength, isNumber, isArbitraryNumber, isInteger, isPercent, isArbitraryValue, isTshirtSize, sizeLabels, isArbitrarySize, isArbitraryPosition, imageLabels, isArbitraryImage, isArbitraryShadow, isAny, getIsArbitraryValue, isLengthOnly, isNever, isShadow, isImage, getDefaultConfig, twMerge;
  var init_bundle_mjs = __esm({
    "node_modules/tailwind-merge/dist/bundle-mjs.mjs"() {
      CLASS_PART_SEPARATOR = "-";
      createClassGroupUtils = (config) => {
        const classMap = createClassMap(config);
        const {
          conflictingClassGroups,
          conflictingClassGroupModifiers
        } = config;
        const getClassGroupId = (className) => {
          const classParts = className.split(CLASS_PART_SEPARATOR);
          if (classParts[0] === "" && classParts.length !== 1) {
            classParts.shift();
          }
          return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
        };
        const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
          const conflicts = conflictingClassGroups[classGroupId] || [];
          if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
            return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
          }
          return conflicts;
        };
        return {
          getClassGroupId,
          getConflictingClassGroupIds
        };
      };
      getGroupRecursive = (classParts, classPartObject) => {
        if (classParts.length === 0) {
          return classPartObject.classGroupId;
        }
        const currentClassPart = classParts[0];
        const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
        const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
        if (classGroupFromNextClassPart) {
          return classGroupFromNextClassPart;
        }
        if (classPartObject.validators.length === 0) {
          return void 0;
        }
        const classRest = classParts.join(CLASS_PART_SEPARATOR);
        return classPartObject.validators.find(({
          validator
        }) => validator(classRest))?.classGroupId;
      };
      arbitraryPropertyRegex = /^\[(.+)\]$/;
      getGroupIdForArbitraryProperty = (className) => {
        if (arbitraryPropertyRegex.test(className)) {
          const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
          const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
          if (property) {
            return "arbitrary.." + property;
          }
        }
      };
      createClassMap = (config) => {
        const {
          theme,
          prefix
        } = config;
        const classMap = {
          nextPart: /* @__PURE__ */ new Map(),
          validators: []
        };
        const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
        prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
          processClassesRecursively(classGroup, classMap, classGroupId, theme);
        });
        return classMap;
      };
      processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
        classGroup.forEach((classDefinition) => {
          if (typeof classDefinition === "string") {
            const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
            classPartObjectToEdit.classGroupId = classGroupId;
            return;
          }
          if (typeof classDefinition === "function") {
            if (isThemeGetter(classDefinition)) {
              processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
              return;
            }
            classPartObject.validators.push({
              validator: classDefinition,
              classGroupId
            });
            return;
          }
          Object.entries(classDefinition).forEach(([key, classGroup2]) => {
            processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
          });
        });
      };
      getPart = (classPartObject, path) => {
        let currentClassPartObject = classPartObject;
        path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
          if (!currentClassPartObject.nextPart.has(pathPart)) {
            currentClassPartObject.nextPart.set(pathPart, {
              nextPart: /* @__PURE__ */ new Map(),
              validators: []
            });
          }
          currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
        });
        return currentClassPartObject;
      };
      isThemeGetter = (func) => func.isThemeGetter;
      getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
        if (!prefix) {
          return classGroupEntries;
        }
        return classGroupEntries.map(([classGroupId, classGroup]) => {
          const prefixedClassGroup = classGroup.map((classDefinition) => {
            if (typeof classDefinition === "string") {
              return prefix + classDefinition;
            }
            if (typeof classDefinition === "object") {
              return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
            }
            return classDefinition;
          });
          return [classGroupId, prefixedClassGroup];
        });
      };
      createLruCache = (maxCacheSize) => {
        if (maxCacheSize < 1) {
          return {
            get: () => void 0,
            set: () => {
            }
          };
        }
        let cacheSize = 0;
        let cache = /* @__PURE__ */ new Map();
        let previousCache = /* @__PURE__ */ new Map();
        const update = (key, value) => {
          cache.set(key, value);
          cacheSize++;
          if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = /* @__PURE__ */ new Map();
          }
        };
        return {
          get(key) {
            let value = cache.get(key);
            if (value !== void 0) {
              return value;
            }
            if ((value = previousCache.get(key)) !== void 0) {
              update(key, value);
              return value;
            }
          },
          set(key, value) {
            if (cache.has(key)) {
              cache.set(key, value);
            } else {
              update(key, value);
            }
          }
        };
      };
      IMPORTANT_MODIFIER = "!";
      createParseClassName = (config) => {
        const {
          separator,
          experimentalParseClassName
        } = config;
        const isSeparatorSingleCharacter = separator.length === 1;
        const firstSeparatorCharacter = separator[0];
        const separatorLength = separator.length;
        const parseClassName = (className) => {
          const modifiers = [];
          let bracketDepth = 0;
          let modifierStart = 0;
          let postfixModifierPosition;
          for (let index = 0; index < className.length; index++) {
            let currentCharacter = className[index];
            if (bracketDepth === 0) {
              if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
                modifiers.push(className.slice(modifierStart, index));
                modifierStart = index + separatorLength;
                continue;
              }
              if (currentCharacter === "/") {
                postfixModifierPosition = index;
                continue;
              }
            }
            if (currentCharacter === "[") {
              bracketDepth++;
            } else if (currentCharacter === "]") {
              bracketDepth--;
            }
          }
          const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
          const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
          const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
          const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
          return {
            modifiers,
            hasImportantModifier,
            baseClassName,
            maybePostfixModifierPosition
          };
        };
        if (experimentalParseClassName) {
          return (className) => experimentalParseClassName({
            className,
            parseClassName
          });
        }
        return parseClassName;
      };
      sortModifiers = (modifiers) => {
        if (modifiers.length <= 1) {
          return modifiers;
        }
        const sortedModifiers = [];
        let unsortedModifiers = [];
        modifiers.forEach((modifier) => {
          const isArbitraryVariant = modifier[0] === "[";
          if (isArbitraryVariant) {
            sortedModifiers.push(...unsortedModifiers.sort(), modifier);
            unsortedModifiers = [];
          } else {
            unsortedModifiers.push(modifier);
          }
        });
        sortedModifiers.push(...unsortedModifiers.sort());
        return sortedModifiers;
      };
      createConfigUtils = (config) => ({
        cache: createLruCache(config.cacheSize),
        parseClassName: createParseClassName(config),
        ...createClassGroupUtils(config)
      });
      SPLIT_CLASSES_REGEX = /\s+/;
      mergeClassList = (classList, configUtils) => {
        const {
          parseClassName,
          getClassGroupId,
          getConflictingClassGroupIds
        } = configUtils;
        const classGroupsInConflict = [];
        const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
        let result = "";
        for (let index = classNames.length - 1; index >= 0; index -= 1) {
          const originalClassName = classNames[index];
          const {
            modifiers,
            hasImportantModifier,
            baseClassName,
            maybePostfixModifierPosition
          } = parseClassName(originalClassName);
          let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
          let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
          if (!classGroupId) {
            if (!hasPostfixModifier) {
              result = originalClassName + (result.length > 0 ? " " + result : result);
              continue;
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
              result = originalClassName + (result.length > 0 ? " " + result : result);
              continue;
            }
            hasPostfixModifier = false;
          }
          const variantModifier = sortModifiers(modifiers).join(":");
          const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
          const classId = modifierId + classGroupId;
          if (classGroupsInConflict.includes(classId)) {
            continue;
          }
          classGroupsInConflict.push(classId);
          const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
          for (let i = 0; i < conflictGroups.length; ++i) {
            const group = conflictGroups[i];
            classGroupsInConflict.push(modifierId + group);
          }
          result = originalClassName + (result.length > 0 ? " " + result : result);
        }
        return result;
      };
      toValue = (mix) => {
        if (typeof mix === "string") {
          return mix;
        }
        let resolvedValue;
        let string = "";
        for (let k = 0; k < mix.length; k++) {
          if (mix[k]) {
            if (resolvedValue = toValue(mix[k])) {
              string && (string += " ");
              string += resolvedValue;
            }
          }
        }
        return string;
      };
      fromTheme = (key) => {
        const themeGetter = (theme) => theme[key] || [];
        themeGetter.isThemeGetter = true;
        return themeGetter;
      };
      arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
      fractionRegex = /^\d+\/\d+$/;
      stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
      tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
      lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
      colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
      shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
      imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
      isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
      isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
      isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
      isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
      isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
      isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
      isArbitraryValue = (value) => arbitraryValueRegex.test(value);
      isTshirtSize = (value) => tshirtUnitRegex.test(value);
      sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
      isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
      isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
      imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
      isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
      isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
      isAny = () => true;
      getIsArbitraryValue = (value, label, testValue) => {
        const result = arbitraryValueRegex.exec(value);
        if (result) {
          if (result[1]) {
            return typeof label === "string" ? result[1] === label : label.has(result[1]);
          }
          return testValue(result[2]);
        }
        return false;
      };
      isLengthOnly = (value) => (
        // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
        // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
        // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
        lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
      );
      isNever = () => false;
      isShadow = (value) => shadowRegex.test(value);
      isImage = (value) => imageRegex.test(value);
      getDefaultConfig = () => {
        const colors = fromTheme("colors");
        const spacing = fromTheme("spacing");
        const blur = fromTheme("blur");
        const brightness = fromTheme("brightness");
        const borderColor = fromTheme("borderColor");
        const borderRadius = fromTheme("borderRadius");
        const borderSpacing = fromTheme("borderSpacing");
        const borderWidth = fromTheme("borderWidth");
        const contrast = fromTheme("contrast");
        const grayscale = fromTheme("grayscale");
        const hueRotate = fromTheme("hueRotate");
        const invert = fromTheme("invert");
        const gap = fromTheme("gap");
        const gradientColorStops = fromTheme("gradientColorStops");
        const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
        const inset = fromTheme("inset");
        const margin = fromTheme("margin");
        const opacity = fromTheme("opacity");
        const padding = fromTheme("padding");
        const saturate = fromTheme("saturate");
        const scale = fromTheme("scale");
        const sepia = fromTheme("sepia");
        const skew = fromTheme("skew");
        const space = fromTheme("space");
        const translate = fromTheme("translate");
        const getOverscroll = () => ["auto", "contain", "none"];
        const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
        const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
        const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
        const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
        const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
        const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
        const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
        const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
        const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
        const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
        const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
        const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
        return {
          cacheSize: 500,
          separator: ":",
          theme: {
            colors: [isAny],
            spacing: [isLength, isArbitraryLength],
            blur: ["none", "", isTshirtSize, isArbitraryValue],
            brightness: getNumberAndArbitrary(),
            borderColor: [colors],
            borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
            borderSpacing: getSpacingWithArbitrary(),
            borderWidth: getLengthWithEmptyAndArbitrary(),
            contrast: getNumberAndArbitrary(),
            grayscale: getZeroAndEmpty(),
            hueRotate: getNumberAndArbitrary(),
            invert: getZeroAndEmpty(),
            gap: getSpacingWithArbitrary(),
            gradientColorStops: [colors],
            gradientColorStopPositions: [isPercent, isArbitraryLength],
            inset: getSpacingWithAutoAndArbitrary(),
            margin: getSpacingWithAutoAndArbitrary(),
            opacity: getNumberAndArbitrary(),
            padding: getSpacingWithArbitrary(),
            saturate: getNumberAndArbitrary(),
            scale: getNumberAndArbitrary(),
            sepia: getZeroAndEmpty(),
            skew: getNumberAndArbitrary(),
            space: getSpacingWithArbitrary(),
            translate: getSpacingWithArbitrary()
          },
          classGroups: {
            // Layout
            /**
             * Aspect Ratio
             * @see https://tailwindcss.com/docs/aspect-ratio
             */
            aspect: [{
              aspect: ["auto", "square", "video", isArbitraryValue]
            }],
            /**
             * Container
             * @see https://tailwindcss.com/docs/container
             */
            container: ["container"],
            /**
             * Columns
             * @see https://tailwindcss.com/docs/columns
             */
            columns: [{
              columns: [isTshirtSize]
            }],
            /**
             * Break After
             * @see https://tailwindcss.com/docs/break-after
             */
            "break-after": [{
              "break-after": getBreaks()
            }],
            /**
             * Break Before
             * @see https://tailwindcss.com/docs/break-before
             */
            "break-before": [{
              "break-before": getBreaks()
            }],
            /**
             * Break Inside
             * @see https://tailwindcss.com/docs/break-inside
             */
            "break-inside": [{
              "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
            }],
            /**
             * Box Decoration Break
             * @see https://tailwindcss.com/docs/box-decoration-break
             */
            "box-decoration": [{
              "box-decoration": ["slice", "clone"]
            }],
            /**
             * Box Sizing
             * @see https://tailwindcss.com/docs/box-sizing
             */
            box: [{
              box: ["border", "content"]
            }],
            /**
             * Display
             * @see https://tailwindcss.com/docs/display
             */
            display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
            /**
             * Floats
             * @see https://tailwindcss.com/docs/float
             */
            float: [{
              float: ["right", "left", "none", "start", "end"]
            }],
            /**
             * Clear
             * @see https://tailwindcss.com/docs/clear
             */
            clear: [{
              clear: ["left", "right", "both", "none", "start", "end"]
            }],
            /**
             * Isolation
             * @see https://tailwindcss.com/docs/isolation
             */
            isolation: ["isolate", "isolation-auto"],
            /**
             * Object Fit
             * @see https://tailwindcss.com/docs/object-fit
             */
            "object-fit": [{
              object: ["contain", "cover", "fill", "none", "scale-down"]
            }],
            /**
             * Object Position
             * @see https://tailwindcss.com/docs/object-position
             */
            "object-position": [{
              object: [...getPositions(), isArbitraryValue]
            }],
            /**
             * Overflow
             * @see https://tailwindcss.com/docs/overflow
             */
            overflow: [{
              overflow: getOverflow()
            }],
            /**
             * Overflow X
             * @see https://tailwindcss.com/docs/overflow
             */
            "overflow-x": [{
              "overflow-x": getOverflow()
            }],
            /**
             * Overflow Y
             * @see https://tailwindcss.com/docs/overflow
             */
            "overflow-y": [{
              "overflow-y": getOverflow()
            }],
            /**
             * Overscroll Behavior
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            overscroll: [{
              overscroll: getOverscroll()
            }],
            /**
             * Overscroll Behavior X
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            "overscroll-x": [{
              "overscroll-x": getOverscroll()
            }],
            /**
             * Overscroll Behavior Y
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            "overscroll-y": [{
              "overscroll-y": getOverscroll()
            }],
            /**
             * Position
             * @see https://tailwindcss.com/docs/position
             */
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            /**
             * Top / Right / Bottom / Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            inset: [{
              inset: [inset]
            }],
            /**
             * Right / Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            "inset-x": [{
              "inset-x": [inset]
            }],
            /**
             * Top / Bottom
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            "inset-y": [{
              "inset-y": [inset]
            }],
            /**
             * Start
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            start: [{
              start: [inset]
            }],
            /**
             * End
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            end: [{
              end: [inset]
            }],
            /**
             * Top
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            top: [{
              top: [inset]
            }],
            /**
             * Right
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            right: [{
              right: [inset]
            }],
            /**
             * Bottom
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            bottom: [{
              bottom: [inset]
            }],
            /**
             * Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            left: [{
              left: [inset]
            }],
            /**
             * Visibility
             * @see https://tailwindcss.com/docs/visibility
             */
            visibility: ["visible", "invisible", "collapse"],
            /**
             * Z-Index
             * @see https://tailwindcss.com/docs/z-index
             */
            z: [{
              z: ["auto", isInteger, isArbitraryValue]
            }],
            // Flexbox and Grid
            /**
             * Flex Basis
             * @see https://tailwindcss.com/docs/flex-basis
             */
            basis: [{
              basis: getSpacingWithAutoAndArbitrary()
            }],
            /**
             * Flex Direction
             * @see https://tailwindcss.com/docs/flex-direction
             */
            "flex-direction": [{
              flex: ["row", "row-reverse", "col", "col-reverse"]
            }],
            /**
             * Flex Wrap
             * @see https://tailwindcss.com/docs/flex-wrap
             */
            "flex-wrap": [{
              flex: ["wrap", "wrap-reverse", "nowrap"]
            }],
            /**
             * Flex
             * @see https://tailwindcss.com/docs/flex
             */
            flex: [{
              flex: ["1", "auto", "initial", "none", isArbitraryValue]
            }],
            /**
             * Flex Grow
             * @see https://tailwindcss.com/docs/flex-grow
             */
            grow: [{
              grow: getZeroAndEmpty()
            }],
            /**
             * Flex Shrink
             * @see https://tailwindcss.com/docs/flex-shrink
             */
            shrink: [{
              shrink: getZeroAndEmpty()
            }],
            /**
             * Order
             * @see https://tailwindcss.com/docs/order
             */
            order: [{
              order: ["first", "last", "none", isInteger, isArbitraryValue]
            }],
            /**
             * Grid Template Columns
             * @see https://tailwindcss.com/docs/grid-template-columns
             */
            "grid-cols": [{
              "grid-cols": [isAny]
            }],
            /**
             * Grid Column Start / End
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-start-end": [{
              col: ["auto", {
                span: ["full", isInteger, isArbitraryValue]
              }, isArbitraryValue]
            }],
            /**
             * Grid Column Start
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-start": [{
              "col-start": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Column End
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-end": [{
              "col-end": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Template Rows
             * @see https://tailwindcss.com/docs/grid-template-rows
             */
            "grid-rows": [{
              "grid-rows": [isAny]
            }],
            /**
             * Grid Row Start / End
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-start-end": [{
              row: ["auto", {
                span: [isInteger, isArbitraryValue]
              }, isArbitraryValue]
            }],
            /**
             * Grid Row Start
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-start": [{
              "row-start": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Row End
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-end": [{
              "row-end": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Auto Flow
             * @see https://tailwindcss.com/docs/grid-auto-flow
             */
            "grid-flow": [{
              "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
            }],
            /**
             * Grid Auto Columns
             * @see https://tailwindcss.com/docs/grid-auto-columns
             */
            "auto-cols": [{
              "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
            }],
            /**
             * Grid Auto Rows
             * @see https://tailwindcss.com/docs/grid-auto-rows
             */
            "auto-rows": [{
              "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
            }],
            /**
             * Gap
             * @see https://tailwindcss.com/docs/gap
             */
            gap: [{
              gap: [gap]
            }],
            /**
             * Gap X
             * @see https://tailwindcss.com/docs/gap
             */
            "gap-x": [{
              "gap-x": [gap]
            }],
            /**
             * Gap Y
             * @see https://tailwindcss.com/docs/gap
             */
            "gap-y": [{
              "gap-y": [gap]
            }],
            /**
             * Justify Content
             * @see https://tailwindcss.com/docs/justify-content
             */
            "justify-content": [{
              justify: ["normal", ...getAlign()]
            }],
            /**
             * Justify Items
             * @see https://tailwindcss.com/docs/justify-items
             */
            "justify-items": [{
              "justify-items": ["start", "end", "center", "stretch"]
            }],
            /**
             * Justify Self
             * @see https://tailwindcss.com/docs/justify-self
             */
            "justify-self": [{
              "justify-self": ["auto", "start", "end", "center", "stretch"]
            }],
            /**
             * Align Content
             * @see https://tailwindcss.com/docs/align-content
             */
            "align-content": [{
              content: ["normal", ...getAlign(), "baseline"]
            }],
            /**
             * Align Items
             * @see https://tailwindcss.com/docs/align-items
             */
            "align-items": [{
              items: ["start", "end", "center", "baseline", "stretch"]
            }],
            /**
             * Align Self
             * @see https://tailwindcss.com/docs/align-self
             */
            "align-self": [{
              self: ["auto", "start", "end", "center", "stretch", "baseline"]
            }],
            /**
             * Place Content
             * @see https://tailwindcss.com/docs/place-content
             */
            "place-content": [{
              "place-content": [...getAlign(), "baseline"]
            }],
            /**
             * Place Items
             * @see https://tailwindcss.com/docs/place-items
             */
            "place-items": [{
              "place-items": ["start", "end", "center", "baseline", "stretch"]
            }],
            /**
             * Place Self
             * @see https://tailwindcss.com/docs/place-self
             */
            "place-self": [{
              "place-self": ["auto", "start", "end", "center", "stretch"]
            }],
            // Spacing
            /**
             * Padding
             * @see https://tailwindcss.com/docs/padding
             */
            p: [{
              p: [padding]
            }],
            /**
             * Padding X
             * @see https://tailwindcss.com/docs/padding
             */
            px: [{
              px: [padding]
            }],
            /**
             * Padding Y
             * @see https://tailwindcss.com/docs/padding
             */
            py: [{
              py: [padding]
            }],
            /**
             * Padding Start
             * @see https://tailwindcss.com/docs/padding
             */
            ps: [{
              ps: [padding]
            }],
            /**
             * Padding End
             * @see https://tailwindcss.com/docs/padding
             */
            pe: [{
              pe: [padding]
            }],
            /**
             * Padding Top
             * @see https://tailwindcss.com/docs/padding
             */
            pt: [{
              pt: [padding]
            }],
            /**
             * Padding Right
             * @see https://tailwindcss.com/docs/padding
             */
            pr: [{
              pr: [padding]
            }],
            /**
             * Padding Bottom
             * @see https://tailwindcss.com/docs/padding
             */
            pb: [{
              pb: [padding]
            }],
            /**
             * Padding Left
             * @see https://tailwindcss.com/docs/padding
             */
            pl: [{
              pl: [padding]
            }],
            /**
             * Margin
             * @see https://tailwindcss.com/docs/margin
             */
            m: [{
              m: [margin]
            }],
            /**
             * Margin X
             * @see https://tailwindcss.com/docs/margin
             */
            mx: [{
              mx: [margin]
            }],
            /**
             * Margin Y
             * @see https://tailwindcss.com/docs/margin
             */
            my: [{
              my: [margin]
            }],
            /**
             * Margin Start
             * @see https://tailwindcss.com/docs/margin
             */
            ms: [{
              ms: [margin]
            }],
            /**
             * Margin End
             * @see https://tailwindcss.com/docs/margin
             */
            me: [{
              me: [margin]
            }],
            /**
             * Margin Top
             * @see https://tailwindcss.com/docs/margin
             */
            mt: [{
              mt: [margin]
            }],
            /**
             * Margin Right
             * @see https://tailwindcss.com/docs/margin
             */
            mr: [{
              mr: [margin]
            }],
            /**
             * Margin Bottom
             * @see https://tailwindcss.com/docs/margin
             */
            mb: [{
              mb: [margin]
            }],
            /**
             * Margin Left
             * @see https://tailwindcss.com/docs/margin
             */
            ml: [{
              ml: [margin]
            }],
            /**
             * Space Between X
             * @see https://tailwindcss.com/docs/space
             */
            "space-x": [{
              "space-x": [space]
            }],
            /**
             * Space Between X Reverse
             * @see https://tailwindcss.com/docs/space
             */
            "space-x-reverse": ["space-x-reverse"],
            /**
             * Space Between Y
             * @see https://tailwindcss.com/docs/space
             */
            "space-y": [{
              "space-y": [space]
            }],
            /**
             * Space Between Y Reverse
             * @see https://tailwindcss.com/docs/space
             */
            "space-y-reverse": ["space-y-reverse"],
            // Sizing
            /**
             * Width
             * @see https://tailwindcss.com/docs/width
             */
            w: [{
              w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
            }],
            /**
             * Min-Width
             * @see https://tailwindcss.com/docs/min-width
             */
            "min-w": [{
              "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
            }],
            /**
             * Max-Width
             * @see https://tailwindcss.com/docs/max-width
             */
            "max-w": [{
              "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
                screen: [isTshirtSize]
              }, isTshirtSize]
            }],
            /**
             * Height
             * @see https://tailwindcss.com/docs/height
             */
            h: [{
              h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
            }],
            /**
             * Min-Height
             * @see https://tailwindcss.com/docs/min-height
             */
            "min-h": [{
              "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
            }],
            /**
             * Max-Height
             * @see https://tailwindcss.com/docs/max-height
             */
            "max-h": [{
              "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
            }],
            /**
             * Size
             * @see https://tailwindcss.com/docs/size
             */
            size: [{
              size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
            }],
            // Typography
            /**
             * Font Size
             * @see https://tailwindcss.com/docs/font-size
             */
            "font-size": [{
              text: ["base", isTshirtSize, isArbitraryLength]
            }],
            /**
             * Font Smoothing
             * @see https://tailwindcss.com/docs/font-smoothing
             */
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            /**
             * Font Style
             * @see https://tailwindcss.com/docs/font-style
             */
            "font-style": ["italic", "not-italic"],
            /**
             * Font Weight
             * @see https://tailwindcss.com/docs/font-weight
             */
            "font-weight": [{
              font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
            }],
            /**
             * Font Family
             * @see https://tailwindcss.com/docs/font-family
             */
            "font-family": [{
              font: [isAny]
            }],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-normal": ["normal-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-ordinal": ["ordinal"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-slashed-zero": ["slashed-zero"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
            /**
             * Letter Spacing
             * @see https://tailwindcss.com/docs/letter-spacing
             */
            tracking: [{
              tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
            }],
            /**
             * Line Clamp
             * @see https://tailwindcss.com/docs/line-clamp
             */
            "line-clamp": [{
              "line-clamp": ["none", isNumber, isArbitraryNumber]
            }],
            /**
             * Line Height
             * @see https://tailwindcss.com/docs/line-height
             */
            leading: [{
              leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
            }],
            /**
             * List Style Image
             * @see https://tailwindcss.com/docs/list-style-image
             */
            "list-image": [{
              "list-image": ["none", isArbitraryValue]
            }],
            /**
             * List Style Type
             * @see https://tailwindcss.com/docs/list-style-type
             */
            "list-style-type": [{
              list: ["none", "disc", "decimal", isArbitraryValue]
            }],
            /**
             * List Style Position
             * @see https://tailwindcss.com/docs/list-style-position
             */
            "list-style-position": [{
              list: ["inside", "outside"]
            }],
            /**
             * Placeholder Color
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/placeholder-color
             */
            "placeholder-color": [{
              placeholder: [colors]
            }],
            /**
             * Placeholder Opacity
             * @see https://tailwindcss.com/docs/placeholder-opacity
             */
            "placeholder-opacity": [{
              "placeholder-opacity": [opacity]
            }],
            /**
             * Text Alignment
             * @see https://tailwindcss.com/docs/text-align
             */
            "text-alignment": [{
              text: ["left", "center", "right", "justify", "start", "end"]
            }],
            /**
             * Text Color
             * @see https://tailwindcss.com/docs/text-color
             */
            "text-color": [{
              text: [colors]
            }],
            /**
             * Text Opacity
             * @see https://tailwindcss.com/docs/text-opacity
             */
            "text-opacity": [{
              "text-opacity": [opacity]
            }],
            /**
             * Text Decoration
             * @see https://tailwindcss.com/docs/text-decoration
             */
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            /**
             * Text Decoration Style
             * @see https://tailwindcss.com/docs/text-decoration-style
             */
            "text-decoration-style": [{
              decoration: [...getLineStyles(), "wavy"]
            }],
            /**
             * Text Decoration Thickness
             * @see https://tailwindcss.com/docs/text-decoration-thickness
             */
            "text-decoration-thickness": [{
              decoration: ["auto", "from-font", isLength, isArbitraryLength]
            }],
            /**
             * Text Underline Offset
             * @see https://tailwindcss.com/docs/text-underline-offset
             */
            "underline-offset": [{
              "underline-offset": ["auto", isLength, isArbitraryValue]
            }],
            /**
             * Text Decoration Color
             * @see https://tailwindcss.com/docs/text-decoration-color
             */
            "text-decoration-color": [{
              decoration: [colors]
            }],
            /**
             * Text Transform
             * @see https://tailwindcss.com/docs/text-transform
             */
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            /**
             * Text Overflow
             * @see https://tailwindcss.com/docs/text-overflow
             */
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            /**
             * Text Wrap
             * @see https://tailwindcss.com/docs/text-wrap
             */
            "text-wrap": [{
              text: ["wrap", "nowrap", "balance", "pretty"]
            }],
            /**
             * Text Indent
             * @see https://tailwindcss.com/docs/text-indent
             */
            indent: [{
              indent: getSpacingWithArbitrary()
            }],
            /**
             * Vertical Alignment
             * @see https://tailwindcss.com/docs/vertical-align
             */
            "vertical-align": [{
              align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
            }],
            /**
             * Whitespace
             * @see https://tailwindcss.com/docs/whitespace
             */
            whitespace: [{
              whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
            }],
            /**
             * Word Break
             * @see https://tailwindcss.com/docs/word-break
             */
            break: [{
              break: ["normal", "words", "all", "keep"]
            }],
            /**
             * Hyphens
             * @see https://tailwindcss.com/docs/hyphens
             */
            hyphens: [{
              hyphens: ["none", "manual", "auto"]
            }],
            /**
             * Content
             * @see https://tailwindcss.com/docs/content
             */
            content: [{
              content: ["none", isArbitraryValue]
            }],
            // Backgrounds
            /**
             * Background Attachment
             * @see https://tailwindcss.com/docs/background-attachment
             */
            "bg-attachment": [{
              bg: ["fixed", "local", "scroll"]
            }],
            /**
             * Background Clip
             * @see https://tailwindcss.com/docs/background-clip
             */
            "bg-clip": [{
              "bg-clip": ["border", "padding", "content", "text"]
            }],
            /**
             * Background Opacity
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/background-opacity
             */
            "bg-opacity": [{
              "bg-opacity": [opacity]
            }],
            /**
             * Background Origin
             * @see https://tailwindcss.com/docs/background-origin
             */
            "bg-origin": [{
              "bg-origin": ["border", "padding", "content"]
            }],
            /**
             * Background Position
             * @see https://tailwindcss.com/docs/background-position
             */
            "bg-position": [{
              bg: [...getPositions(), isArbitraryPosition]
            }],
            /**
             * Background Repeat
             * @see https://tailwindcss.com/docs/background-repeat
             */
            "bg-repeat": [{
              bg: ["no-repeat", {
                repeat: ["", "x", "y", "round", "space"]
              }]
            }],
            /**
             * Background Size
             * @see https://tailwindcss.com/docs/background-size
             */
            "bg-size": [{
              bg: ["auto", "cover", "contain", isArbitrarySize]
            }],
            /**
             * Background Image
             * @see https://tailwindcss.com/docs/background-image
             */
            "bg-image": [{
              bg: ["none", {
                "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
              }, isArbitraryImage]
            }],
            /**
             * Background Color
             * @see https://tailwindcss.com/docs/background-color
             */
            "bg-color": [{
              bg: [colors]
            }],
            /**
             * Gradient Color Stops From Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-from-pos": [{
              from: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops Via Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-via-pos": [{
              via: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops To Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-to-pos": [{
              to: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops From
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-from": [{
              from: [gradientColorStops]
            }],
            /**
             * Gradient Color Stops Via
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-via": [{
              via: [gradientColorStops]
            }],
            /**
             * Gradient Color Stops To
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-to": [{
              to: [gradientColorStops]
            }],
            // Borders
            /**
             * Border Radius
             * @see https://tailwindcss.com/docs/border-radius
             */
            rounded: [{
              rounded: [borderRadius]
            }],
            /**
             * Border Radius Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-s": [{
              "rounded-s": [borderRadius]
            }],
            /**
             * Border Radius End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-e": [{
              "rounded-e": [borderRadius]
            }],
            /**
             * Border Radius Top
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-t": [{
              "rounded-t": [borderRadius]
            }],
            /**
             * Border Radius Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-r": [{
              "rounded-r": [borderRadius]
            }],
            /**
             * Border Radius Bottom
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-b": [{
              "rounded-b": [borderRadius]
            }],
            /**
             * Border Radius Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-l": [{
              "rounded-l": [borderRadius]
            }],
            /**
             * Border Radius Start Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-ss": [{
              "rounded-ss": [borderRadius]
            }],
            /**
             * Border Radius Start End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-se": [{
              "rounded-se": [borderRadius]
            }],
            /**
             * Border Radius End End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-ee": [{
              "rounded-ee": [borderRadius]
            }],
            /**
             * Border Radius End Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-es": [{
              "rounded-es": [borderRadius]
            }],
            /**
             * Border Radius Top Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-tl": [{
              "rounded-tl": [borderRadius]
            }],
            /**
             * Border Radius Top Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-tr": [{
              "rounded-tr": [borderRadius]
            }],
            /**
             * Border Radius Bottom Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-br": [{
              "rounded-br": [borderRadius]
            }],
            /**
             * Border Radius Bottom Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-bl": [{
              "rounded-bl": [borderRadius]
            }],
            /**
             * Border Width
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w": [{
              border: [borderWidth]
            }],
            /**
             * Border Width X
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-x": [{
              "border-x": [borderWidth]
            }],
            /**
             * Border Width Y
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-y": [{
              "border-y": [borderWidth]
            }],
            /**
             * Border Width Start
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-s": [{
              "border-s": [borderWidth]
            }],
            /**
             * Border Width End
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-e": [{
              "border-e": [borderWidth]
            }],
            /**
             * Border Width Top
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-t": [{
              "border-t": [borderWidth]
            }],
            /**
             * Border Width Right
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-r": [{
              "border-r": [borderWidth]
            }],
            /**
             * Border Width Bottom
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-b": [{
              "border-b": [borderWidth]
            }],
            /**
             * Border Width Left
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-l": [{
              "border-l": [borderWidth]
            }],
            /**
             * Border Opacity
             * @see https://tailwindcss.com/docs/border-opacity
             */
            "border-opacity": [{
              "border-opacity": [opacity]
            }],
            /**
             * Border Style
             * @see https://tailwindcss.com/docs/border-style
             */
            "border-style": [{
              border: [...getLineStyles(), "hidden"]
            }],
            /**
             * Divide Width X
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-x": [{
              "divide-x": [borderWidth]
            }],
            /**
             * Divide Width X Reverse
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-x-reverse": ["divide-x-reverse"],
            /**
             * Divide Width Y
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-y": [{
              "divide-y": [borderWidth]
            }],
            /**
             * Divide Width Y Reverse
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-y-reverse": ["divide-y-reverse"],
            /**
             * Divide Opacity
             * @see https://tailwindcss.com/docs/divide-opacity
             */
            "divide-opacity": [{
              "divide-opacity": [opacity]
            }],
            /**
             * Divide Style
             * @see https://tailwindcss.com/docs/divide-style
             */
            "divide-style": [{
              divide: getLineStyles()
            }],
            /**
             * Border Color
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color": [{
              border: [borderColor]
            }],
            /**
             * Border Color X
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-x": [{
              "border-x": [borderColor]
            }],
            /**
             * Border Color Y
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-y": [{
              "border-y": [borderColor]
            }],
            /**
             * Border Color S
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-s": [{
              "border-s": [borderColor]
            }],
            /**
             * Border Color E
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-e": [{
              "border-e": [borderColor]
            }],
            /**
             * Border Color Top
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-t": [{
              "border-t": [borderColor]
            }],
            /**
             * Border Color Right
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-r": [{
              "border-r": [borderColor]
            }],
            /**
             * Border Color Bottom
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-b": [{
              "border-b": [borderColor]
            }],
            /**
             * Border Color Left
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-l": [{
              "border-l": [borderColor]
            }],
            /**
             * Divide Color
             * @see https://tailwindcss.com/docs/divide-color
             */
            "divide-color": [{
              divide: [borderColor]
            }],
            /**
             * Outline Style
             * @see https://tailwindcss.com/docs/outline-style
             */
            "outline-style": [{
              outline: ["", ...getLineStyles()]
            }],
            /**
             * Outline Offset
             * @see https://tailwindcss.com/docs/outline-offset
             */
            "outline-offset": [{
              "outline-offset": [isLength, isArbitraryValue]
            }],
            /**
             * Outline Width
             * @see https://tailwindcss.com/docs/outline-width
             */
            "outline-w": [{
              outline: [isLength, isArbitraryLength]
            }],
            /**
             * Outline Color
             * @see https://tailwindcss.com/docs/outline-color
             */
            "outline-color": [{
              outline: [colors]
            }],
            /**
             * Ring Width
             * @see https://tailwindcss.com/docs/ring-width
             */
            "ring-w": [{
              ring: getLengthWithEmptyAndArbitrary()
            }],
            /**
             * Ring Width Inset
             * @see https://tailwindcss.com/docs/ring-width
             */
            "ring-w-inset": ["ring-inset"],
            /**
             * Ring Color
             * @see https://tailwindcss.com/docs/ring-color
             */
            "ring-color": [{
              ring: [colors]
            }],
            /**
             * Ring Opacity
             * @see https://tailwindcss.com/docs/ring-opacity
             */
            "ring-opacity": [{
              "ring-opacity": [opacity]
            }],
            /**
             * Ring Offset Width
             * @see https://tailwindcss.com/docs/ring-offset-width
             */
            "ring-offset-w": [{
              "ring-offset": [isLength, isArbitraryLength]
            }],
            /**
             * Ring Offset Color
             * @see https://tailwindcss.com/docs/ring-offset-color
             */
            "ring-offset-color": [{
              "ring-offset": [colors]
            }],
            // Effects
            /**
             * Box Shadow
             * @see https://tailwindcss.com/docs/box-shadow
             */
            shadow: [{
              shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
            }],
            /**
             * Box Shadow Color
             * @see https://tailwindcss.com/docs/box-shadow-color
             */
            "shadow-color": [{
              shadow: [isAny]
            }],
            /**
             * Opacity
             * @see https://tailwindcss.com/docs/opacity
             */
            opacity: [{
              opacity: [opacity]
            }],
            /**
             * Mix Blend Mode
             * @see https://tailwindcss.com/docs/mix-blend-mode
             */
            "mix-blend": [{
              "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
            }],
            /**
             * Background Blend Mode
             * @see https://tailwindcss.com/docs/background-blend-mode
             */
            "bg-blend": [{
              "bg-blend": getBlendModes()
            }],
            // Filters
            /**
             * Filter
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/filter
             */
            filter: [{
              filter: ["", "none"]
            }],
            /**
             * Blur
             * @see https://tailwindcss.com/docs/blur
             */
            blur: [{
              blur: [blur]
            }],
            /**
             * Brightness
             * @see https://tailwindcss.com/docs/brightness
             */
            brightness: [{
              brightness: [brightness]
            }],
            /**
             * Contrast
             * @see https://tailwindcss.com/docs/contrast
             */
            contrast: [{
              contrast: [contrast]
            }],
            /**
             * Drop Shadow
             * @see https://tailwindcss.com/docs/drop-shadow
             */
            "drop-shadow": [{
              "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
            }],
            /**
             * Grayscale
             * @see https://tailwindcss.com/docs/grayscale
             */
            grayscale: [{
              grayscale: [grayscale]
            }],
            /**
             * Hue Rotate
             * @see https://tailwindcss.com/docs/hue-rotate
             */
            "hue-rotate": [{
              "hue-rotate": [hueRotate]
            }],
            /**
             * Invert
             * @see https://tailwindcss.com/docs/invert
             */
            invert: [{
              invert: [invert]
            }],
            /**
             * Saturate
             * @see https://tailwindcss.com/docs/saturate
             */
            saturate: [{
              saturate: [saturate]
            }],
            /**
             * Sepia
             * @see https://tailwindcss.com/docs/sepia
             */
            sepia: [{
              sepia: [sepia]
            }],
            /**
             * Backdrop Filter
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/backdrop-filter
             */
            "backdrop-filter": [{
              "backdrop-filter": ["", "none"]
            }],
            /**
             * Backdrop Blur
             * @see https://tailwindcss.com/docs/backdrop-blur
             */
            "backdrop-blur": [{
              "backdrop-blur": [blur]
            }],
            /**
             * Backdrop Brightness
             * @see https://tailwindcss.com/docs/backdrop-brightness
             */
            "backdrop-brightness": [{
              "backdrop-brightness": [brightness]
            }],
            /**
             * Backdrop Contrast
             * @see https://tailwindcss.com/docs/backdrop-contrast
             */
            "backdrop-contrast": [{
              "backdrop-contrast": [contrast]
            }],
            /**
             * Backdrop Grayscale
             * @see https://tailwindcss.com/docs/backdrop-grayscale
             */
            "backdrop-grayscale": [{
              "backdrop-grayscale": [grayscale]
            }],
            /**
             * Backdrop Hue Rotate
             * @see https://tailwindcss.com/docs/backdrop-hue-rotate
             */
            "backdrop-hue-rotate": [{
              "backdrop-hue-rotate": [hueRotate]
            }],
            /**
             * Backdrop Invert
             * @see https://tailwindcss.com/docs/backdrop-invert
             */
            "backdrop-invert": [{
              "backdrop-invert": [invert]
            }],
            /**
             * Backdrop Opacity
             * @see https://tailwindcss.com/docs/backdrop-opacity
             */
            "backdrop-opacity": [{
              "backdrop-opacity": [opacity]
            }],
            /**
             * Backdrop Saturate
             * @see https://tailwindcss.com/docs/backdrop-saturate
             */
            "backdrop-saturate": [{
              "backdrop-saturate": [saturate]
            }],
            /**
             * Backdrop Sepia
             * @see https://tailwindcss.com/docs/backdrop-sepia
             */
            "backdrop-sepia": [{
              "backdrop-sepia": [sepia]
            }],
            // Tables
            /**
             * Border Collapse
             * @see https://tailwindcss.com/docs/border-collapse
             */
            "border-collapse": [{
              border: ["collapse", "separate"]
            }],
            /**
             * Border Spacing
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing": [{
              "border-spacing": [borderSpacing]
            }],
            /**
             * Border Spacing X
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing-x": [{
              "border-spacing-x": [borderSpacing]
            }],
            /**
             * Border Spacing Y
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing-y": [{
              "border-spacing-y": [borderSpacing]
            }],
            /**
             * Table Layout
             * @see https://tailwindcss.com/docs/table-layout
             */
            "table-layout": [{
              table: ["auto", "fixed"]
            }],
            /**
             * Caption Side
             * @see https://tailwindcss.com/docs/caption-side
             */
            caption: [{
              caption: ["top", "bottom"]
            }],
            // Transitions and Animation
            /**
             * Tranisition Property
             * @see https://tailwindcss.com/docs/transition-property
             */
            transition: [{
              transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
            }],
            /**
             * Transition Duration
             * @see https://tailwindcss.com/docs/transition-duration
             */
            duration: [{
              duration: getNumberAndArbitrary()
            }],
            /**
             * Transition Timing Function
             * @see https://tailwindcss.com/docs/transition-timing-function
             */
            ease: [{
              ease: ["linear", "in", "out", "in-out", isArbitraryValue]
            }],
            /**
             * Transition Delay
             * @see https://tailwindcss.com/docs/transition-delay
             */
            delay: [{
              delay: getNumberAndArbitrary()
            }],
            /**
             * Animation
             * @see https://tailwindcss.com/docs/animation
             */
            animate: [{
              animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
            }],
            // Transforms
            /**
             * Transform
             * @see https://tailwindcss.com/docs/transform
             */
            transform: [{
              transform: ["", "gpu", "none"]
            }],
            /**
             * Scale
             * @see https://tailwindcss.com/docs/scale
             */
            scale: [{
              scale: [scale]
            }],
            /**
             * Scale X
             * @see https://tailwindcss.com/docs/scale
             */
            "scale-x": [{
              "scale-x": [scale]
            }],
            /**
             * Scale Y
             * @see https://tailwindcss.com/docs/scale
             */
            "scale-y": [{
              "scale-y": [scale]
            }],
            /**
             * Rotate
             * @see https://tailwindcss.com/docs/rotate
             */
            rotate: [{
              rotate: [isInteger, isArbitraryValue]
            }],
            /**
             * Translate X
             * @see https://tailwindcss.com/docs/translate
             */
            "translate-x": [{
              "translate-x": [translate]
            }],
            /**
             * Translate Y
             * @see https://tailwindcss.com/docs/translate
             */
            "translate-y": [{
              "translate-y": [translate]
            }],
            /**
             * Skew X
             * @see https://tailwindcss.com/docs/skew
             */
            "skew-x": [{
              "skew-x": [skew]
            }],
            /**
             * Skew Y
             * @see https://tailwindcss.com/docs/skew
             */
            "skew-y": [{
              "skew-y": [skew]
            }],
            /**
             * Transform Origin
             * @see https://tailwindcss.com/docs/transform-origin
             */
            "transform-origin": [{
              origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
            }],
            // Interactivity
            /**
             * Accent Color
             * @see https://tailwindcss.com/docs/accent-color
             */
            accent: [{
              accent: ["auto", colors]
            }],
            /**
             * Appearance
             * @see https://tailwindcss.com/docs/appearance
             */
            appearance: [{
              appearance: ["none", "auto"]
            }],
            /**
             * Cursor
             * @see https://tailwindcss.com/docs/cursor
             */
            cursor: [{
              cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
            }],
            /**
             * Caret Color
             * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
             */
            "caret-color": [{
              caret: [colors]
            }],
            /**
             * Pointer Events
             * @see https://tailwindcss.com/docs/pointer-events
             */
            "pointer-events": [{
              "pointer-events": ["none", "auto"]
            }],
            /**
             * Resize
             * @see https://tailwindcss.com/docs/resize
             */
            resize: [{
              resize: ["none", "y", "x", ""]
            }],
            /**
             * Scroll Behavior
             * @see https://tailwindcss.com/docs/scroll-behavior
             */
            "scroll-behavior": [{
              scroll: ["auto", "smooth"]
            }],
            /**
             * Scroll Margin
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-m": [{
              "scroll-m": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin X
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mx": [{
              "scroll-mx": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Y
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-my": [{
              "scroll-my": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Start
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-ms": [{
              "scroll-ms": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin End
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-me": [{
              "scroll-me": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Top
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mt": [{
              "scroll-mt": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Right
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mr": [{
              "scroll-mr": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Bottom
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mb": [{
              "scroll-mb": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Left
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-ml": [{
              "scroll-ml": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-p": [{
              "scroll-p": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding X
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-px": [{
              "scroll-px": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Y
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-py": [{
              "scroll-py": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Start
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-ps": [{
              "scroll-ps": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding End
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pe": [{
              "scroll-pe": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Top
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pt": [{
              "scroll-pt": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Right
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pr": [{
              "scroll-pr": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Bottom
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pb": [{
              "scroll-pb": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Left
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pl": [{
              "scroll-pl": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Snap Align
             * @see https://tailwindcss.com/docs/scroll-snap-align
             */
            "snap-align": [{
              snap: ["start", "end", "center", "align-none"]
            }],
            /**
             * Scroll Snap Stop
             * @see https://tailwindcss.com/docs/scroll-snap-stop
             */
            "snap-stop": [{
              snap: ["normal", "always"]
            }],
            /**
             * Scroll Snap Type
             * @see https://tailwindcss.com/docs/scroll-snap-type
             */
            "snap-type": [{
              snap: ["none", "x", "y", "both"]
            }],
            /**
             * Scroll Snap Type Strictness
             * @see https://tailwindcss.com/docs/scroll-snap-type
             */
            "snap-strictness": [{
              snap: ["mandatory", "proximity"]
            }],
            /**
             * Touch Action
             * @see https://tailwindcss.com/docs/touch-action
             */
            touch: [{
              touch: ["auto", "none", "manipulation"]
            }],
            /**
             * Touch Action X
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-x": [{
              "touch-pan": ["x", "left", "right"]
            }],
            /**
             * Touch Action Y
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-y": [{
              "touch-pan": ["y", "up", "down"]
            }],
            /**
             * Touch Action Pinch Zoom
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-pz": ["touch-pinch-zoom"],
            /**
             * User Select
             * @see https://tailwindcss.com/docs/user-select
             */
            select: [{
              select: ["none", "text", "all", "auto"]
            }],
            /**
             * Will Change
             * @see https://tailwindcss.com/docs/will-change
             */
            "will-change": [{
              "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
            }],
            // SVG
            /**
             * Fill
             * @see https://tailwindcss.com/docs/fill
             */
            fill: [{
              fill: [colors, "none"]
            }],
            /**
             * Stroke Width
             * @see https://tailwindcss.com/docs/stroke-width
             */
            "stroke-w": [{
              stroke: [isLength, isArbitraryLength, isArbitraryNumber]
            }],
            /**
             * Stroke
             * @see https://tailwindcss.com/docs/stroke
             */
            stroke: [{
              stroke: [colors, "none"]
            }],
            // Accessibility
            /**
             * Screen Readers
             * @see https://tailwindcss.com/docs/screen-readers
             */
            sr: ["sr-only", "not-sr-only"],
            /**
             * Forced Color Adjust
             * @see https://tailwindcss.com/docs/forced-color-adjust
             */
            "forced-color-adjust": [{
              "forced-color-adjust": ["auto", "none"]
            }]
          },
          conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"]
          },
          conflictingClassGroupModifiers: {
            "font-size": ["leading"]
          }
        };
      };
      twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
    }
  });

  // src/lib/utils.ts
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  var init_utils = __esm({
    "src/lib/utils.ts"() {
      init_clsx();
      init_bundle_mjs();
    }
  });

  // src/components/ui/button.tsx
  var React2, import_react_slot, buttonVariants, Button;
  var init_button = __esm({
    "src/components/ui/button.tsx"() {
      React2 = __toESM(__require("react"), 1);
      import_react_slot = __require("@radix-ui/react-slot");
      init_dist();
      init_utils();
      buttonVariants = cva(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-xs sm:text-sm font-bold tracking-wide ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155E9A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none min-w-0 max-w-full",
        {
          variants: {
            variant: {
              default: "btn-primary",
              primary: "btn-primary",
              emerald: "btn-emerald",
              gold: "btn-gold",
              secondary: "btn-secondary",
              outline: "btn-outline",
              destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
              ghost: "hover:bg-teal-50 hover:text-[#155E9A] text-slate-700",
              link: "text-[#155E9A] underline-offset-4 hover:underline"
            },
            size: {
              default: "h-11 px-5 py-2.5",
              sm: "h-9 px-4 py-2 text-xs",
              lg: "h-12 sm:h-13 px-7 sm:px-8 text-xs sm:text-sm",
              xl: "h-14 px-8 py-3.5 text-sm sm:text-base",
              icon: "h-10 w-10 p-0 rounded-full"
            }
          },
          defaultVariants: {
            variant: "default",
            size: "default"
          }
        }
      );
      Button = React2.forwardRef(
        ({ className, variant, size, asChild = false, ...props }, ref) => {
          const Comp = asChild ? import_react_slot.Slot : "button";
          return /* @__PURE__ */ React2.createElement(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
        }
      );
      Button.displayName = "Button";
    }
  });

  // src/components/ui/input.tsx
  var React3, Input;
  var init_input = __esm({
    "src/components/ui/input.tsx"() {
      React3 = __toESM(__require("react"), 1);
      init_utils();
      Input = React3.forwardRef(
        ({ className, type, ...props }, ref) => {
          return /* @__PURE__ */ React3.createElement(
            "input",
            {
              type,
              className: cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
              ),
              ref,
              ...props
            }
          );
        }
      );
      Input.displayName = "Input";
    }
  });

  // src/config/site.ts
  function telHref(value) {
    return value.startsWith("YOUR_") ? void 0 : `tel:${value.replace(/\s/g, "")}`;
  }
  function whatsappHref(message) {
    if (siteConfig.contact.whatsapp.startsWith("YOUR_")) return void 0;
    return `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }
  var import_meta, siteConfig;
  var init_site = __esm({
    "src/config/site.ts"() {
      import_meta = {};
      siteConfig = {
        name: "Sawariya Diagnostic Lab",
        shortName: "Sawariya Diagnostic",
        tagline: "Detect \u2022 Diagnose \u2022 Deliver",
        location: {
          address: "Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana 127306",
          city: "Charkhi Dadri",
          region: "Haryana",
          postalCode: "127306",
          country: "IN",
          mapsUrl: "https://maps.app.goo.gl/Kcxzwy1dq65FB6g8A"
        },
        contact: {
          phone: import_meta.env.VITE_LAB_PHONE || "YOUR_LAB_PHONE",
          emergencyPhone: import_meta.env.VITE_EMERGENCY_PHONE || "YOUR_EMERGENCY_PHONE",
          whatsapp: import_meta.env.VITE_LAB_WHATSAPP || "YOUR_LAB_WHATSAPP",
          email: import_meta.env.VITE_LAB_EMAIL || "YOUR_LAB_EMAIL"
        },
        brand: { red: "#C62828", blue: "#155E9A", brown: "#7A4B2A", navy: "#102A43", cream: "#FFF9F3" },
        integrations: {
          bookingUrl: import_meta.env.VITE_BOOKING_URL || "",
          web3FormsAccessKey: import_meta.env.VITE_WEB3FORMS_ACCESS_KEY || ""
        },
        claims: {
          accreditation: import_meta.env.VITE_ACCREDITATION_CLAIM || "Accreditation details available on request",
          operatingHours: import_meta.env.VITE_OPERATING_HOURS || "Hours to be confirmed",
          reportTurnaround: import_meta.env.VITE_REPORT_TAT || "Turnaround depends on the test",
          serviceArea: import_meta.env.VITE_SERVICE_AREA || "Service area to be confirmed"
        }
      };
    }
  });

  // src/components/ui/Logo.tsx
  function Logo({
    variant = "horizontal",
    size = "md",
    className = "",
    inverted = false,
    showTagline = true
  }) {
    const brandColor = inverted ? "text-white" : "text-[#C62828]";
    const diagColor = inverted ? "text-[#B9D9FF]" : "text-[#155E9A]";
    const taglineColor = inverted ? "text-[#F1D4BE]" : "text-[#7A4B2A]";
    const accentColor = inverted ? "text-[#F2B38B]" : "text-[#7A4B2A]";
    const sizeConfigs = {
      xs: {
        brand: "text-base sm:text-lg font-black tracking-tight leading-none",
        diag: "text-xs sm:text-sm font-bold tracking-widest leading-none",
        tagline: "text-[8px] xs:text-[9px]",
        icon: "w-6 h-6 sm:w-7 sm:h-7 -rotate-45"
      },
      sm: {
        brand: "text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-none",
        diag: "text-xs sm:text-sm md:text-base font-bold tracking-widest leading-none",
        tagline: "text-[8.5px] xs:text-[9.5px] sm:text-[10.5px]",
        icon: "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 -rotate-45"
      },
      md: {
        brand: "text-xl sm:text-2xl md:text-[26px] font-black tracking-tight leading-none",
        diag: "text-sm sm:text-base md:text-[17px] font-bold tracking-widest leading-tight",
        tagline: "text-[10px] sm:text-xs",
        icon: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 -rotate-45"
      },
      lg: {
        brand: "text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none",
        diag: "text-base sm:text-xl lg:text-2xl font-bold tracking-widest leading-none",
        tagline: "text-xs sm:text-sm",
        icon: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 -rotate-45"
      },
      xl: {
        brand: "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none",
        diag: "text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest leading-none",
        tagline: "text-sm sm:text-base",
        icon: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 -rotate-45"
      }
    };
    const cfg = sizeConfigs[size];
    const gradientDef = /* @__PURE__ */ import_react.default.createElement("svg", { width: "0", height: "0", className: "absolute pointer-events-none" }, /* @__PURE__ */ import_react.default.createElement("defs", null, /* @__PURE__ */ import_react.default.createElement("linearGradient", { id: "sawariya-dna-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%" }, /* @__PURE__ */ import_react.default.createElement("stop", { offset: "0%", stopColor: "#C62828" }), /* @__PURE__ */ import_react.default.createElement("stop", { offset: "50%", stopColor: "#7A4B2A" }), /* @__PURE__ */ import_react.default.createElement("stop", { offset: "100%", stopColor: "#155E9A" }))));
    if (variant === "compact") {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: `inline-flex flex-col leading-tight select-none ${className}` }, /* @__PURE__ */ import_react.default.createElement("span", { className: `font-sans ${brandColor} ${cfg.brand}` }, "SAWARIYA"), /* @__PURE__ */ import_react.default.createElement("span", { className: `font-sans uppercase ${diagColor} ${cfg.diag}` }, "DIAGNOSTIC"));
    }
    if (variant === "full") {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: `flex flex-col items-center text-center select-none ${className}` }, gradientDef, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center leading-none space-y-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Dna, { className: `${cfg.icon} mb-2`, stroke: "url(#sawariya-dna-gradient)", strokeWidth: 2.2 }), /* @__PURE__ */ import_react.default.createElement("span", { className: `font-black tracking-tight font-sans text-2xl sm:text-3xl lg:text-4xl ${brandColor}` }, "SAWARIYA"), /* @__PURE__ */ import_react.default.createElement("span", { className: `font-bold tracking-widest uppercase font-sans text-base sm:text-lg lg:text-xl ${diagColor}` }, "DIAGNOSTIC LAB")), showTagline && /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-3 flex flex-col items-center" }, /* @__PURE__ */ import_react.default.createElement("p", { className: `font-semibold tracking-wide ${taglineColor} ${cfg.tagline}` }, "Detect ", /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-400 font-normal" }, "|"), " Diagnose ", /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-400 font-normal" }, "|"), " Deliver"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 mt-2 w-full max-w-[200px]" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `h-[1px] flex-1 ${inverted ? "bg-white/20" : "bg-slate-200"}` }), /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ShieldCheck, { className: `w-3.5 h-3.5 ${accentColor}` }), /* @__PURE__ */ import_react.default.createElement("div", { className: `h-[1px] flex-1 ${inverted ? "bg-white/20" : "bg-slate-200"}` }))));
    }
    if (variant === "badge") {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: `inline-flex flex-col bg-white/70 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] select-none text-left leading-none ${className}` }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-black tracking-tight text-[#C62828] text-sm sm:text-base" }, "SAWARIYA"), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold tracking-widest uppercase text-[10px] sm:text-xs text-[#155E9A] mt-0.5" }, "DIAGNOSTIC LAB"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[8.5px] font-semibold text-slate-500 mt-1.5 flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ShieldCheck, { className: "w-2.5 h-2.5 text-[#7A4B2A]" }), "Detect \u2022 Diagnose \u2022 Deliver"));
    }
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `inline-flex flex-col text-left leading-none select-none ${className}` }, gradientDef, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 flex-nowrap" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Dna, { className: `${cfg.icon} flex-shrink-0`, stroke: "url(#sawariya-dna-gradient)", strokeWidth: 2.2 }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-baseline gap-1 sm:gap-1.5 flex-nowrap" }, /* @__PURE__ */ import_react.default.createElement("span", { className: `font-sans tracking-tight ${brandColor} ${cfg.brand}` }, "SAWARIYA"), /* @__PURE__ */ import_react.default.createElement("span", { className: `font-sans uppercase ${diagColor} ${cfg.diag}` }, "DIAGNOSTIC"))), showTagline && /* @__PURE__ */ import_react.default.createElement("div", { className: "hidden sm:flex items-center gap-1.5 mt-1.5 ml-1 leading-none pl-6 sm:pl-8" }, /* @__PURE__ */ import_react.default.createElement("span", { className: `font-semibold tracking-wide whitespace-nowrap ${taglineColor} ${cfg.tagline}` }, "Detect ", /* @__PURE__ */ import_react.default.createElement("span", { className: "opacity-40" }, "|"), " Diagnose ", /* @__PURE__ */ import_react.default.createElement("span", { className: "opacity-40" }, "|"), " Deliver")));
  }
  var import_react, import_lucide_react;
  var init_Logo = __esm({
    "src/components/ui/Logo.tsx"() {
      import_react = __toESM(__require("react"), 1);
      import_lucide_react = __require("lucide-react");
    }
  });

  // src/data/website-content.ts
  var import_lucide_react2, navigation, team, footer, services, homeCollection;
  var init_website_content = __esm({
    "src/data/website-content.ts"() {
      init_site();
      import_lucide_react2 = __require("lucide-react");
      navigation = {
        links: [
          { label: "Tests", href: "tests" },
          { label: "About", href: "about" },
          { label: "Services", href: "services" },
          { label: "Our Team", href: "team" },
          { label: "Contact", href: "contact" }
        ]
      };
      team = {
        members: [
          {
            name: "Dr. Radhika Vashisth",
            role: "Chief Pathologist",
            qualification: "MBBS, MD (Pathology)",
            bio: "Over 20 years of experience in clinical pathology and laboratory medicine.",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format"
          },
          {
            name: "Dr. Ankit Sangwan",
            role: "Microbiologist",
            qualification: "MSc, PhD (Microbiology)",
            bio: "Expert in infectious disease diagnostics and antimicrobial testing.",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&auto=format"
          },
          {
            name: "Ms. Manisha Saini",
            role: "Senior Medical Biochemist",
            qualification: "MSc(Medical Biotechnology)",
            bio: "Specialist in hormone analysis and metabolic disorders testing.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format"
          }
        ]
      };
      footer = {
        description: `${siteConfig.name} provides patient-focused diagnostic testing and home sample collection in ${siteConfig.location.city}.`,
        quickLinks: [
          { label: "Home", href: "hero" },
          { label: "About Us", href: "about" },
          { label: "Services", href: "services" },
          { label: "Test Menu", href: "tests" },
          { label: "Contact & Map", href: "contact" }
        ],
        services: [
          { label: "Blood Testing", href: "tests" },
          { label: "Thyroid Profile", href: "tests" },
          { label: "Lipid Profile", href: "tests" },
          { label: "Diabetes Screening", href: "tests" },
          { label: "Home Collection", href: "home-collection" }
        ],
        contact: {
          address: siteConfig.location.address,
          phone: siteConfig.contact.phone,
          emergencyPhone: siteConfig.contact.emergencyPhone,
          whatsapp: siteConfig.contact.whatsapp,
          email: siteConfig.contact.email,
          mapsLink: siteConfig.location.mapsUrl,
          mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.94865952338844!2d76.26119347664967!3d28.59441983972724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39128f006f7356b7%3A0x7cfffa574a7089ec!2sSAWARIYA%20DIAGNOSTIC%20LAB!5e0!3m2!1sen!2sin!4v1786996989470!5m2!1sen!2sin"
        }
      };
      services = {
        list: [
          {
            title: "Clinical Pathology",
            description: "Automated blood, fluid & cytology examination with multi-level QC calibration.",
            icon: import_lucide_react2.Microscope,
            theme: {
              badge: "bg-blue-50 text-blue-900 border-blue-200/80",
              iconBg: "bg-blue-50 text-blue-800 border-blue-200/80 group-hover:bg-[#0A3663] group-hover:text-white",
              border: "hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(10,54,99,0.08)]",
              accentBar: "bg-[#0A3663]"
            }
          },
          {
            title: "Biochemistry & Metabolism",
            description: "Kidney (KFT), Liver (LFT), Lipid profile & automated electrolyte panels.",
            icon: import_lucide_react2.Activity,
            theme: {
              badge: "bg-cyan-50 text-cyan-900 border-cyan-200/80",
              iconBg: "bg-cyan-50 text-cyan-800 border-cyan-200/80 group-hover:bg-[#00A896] group-hover:text-white",
              border: "hover:border-cyan-300 hover:shadow-[0_12px_28px_rgba(0,168,150,0.08)]",
              accentBar: "bg-[#00A896]"
            }
          },
          {
            title: "Microbiology & Cultures",
            description: "Sterile culture, antibiotic sensitivity, fungal stains & infectious disease testing.",
            icon: import_lucide_react2.Dna,
            theme: {
              badge: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
              iconBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80 group-hover:bg-[#0A6E5C] group-hover:text-white",
              border: "hover:border-emerald-300 hover:shadow-[0_12px_28px_rgba(10,110,92,0.08)]",
              accentBar: "bg-[#0A6E5C]"
            }
          },
          {
            title: "Hematology & Coagulation",
            description: "Complete CBC 5-part differential, ESR, PT-INR & blood disorder screening.",
            icon: import_lucide_react2.FileCheck,
            theme: {
              badge: "bg-purple-50 text-purple-900 border-purple-200/80",
              iconBg: "bg-purple-50 text-purple-800 border-purple-200/80 group-hover:bg-[#581C87] group-hover:text-white",
              border: "hover:border-purple-300 hover:shadow-[0_12px_28px_rgba(88,28,135,0.08)]",
              accentBar: "bg-[#581C87]"
            }
          },
          {
            title: "Hormone & Thyroid Profiles",
            description: "Chemiluminescence T3, T4, TSH, fertility panels & endocrine biomarkers.",
            icon: import_lucide_react2.Stethoscope,
            theme: {
              badge: "bg-teal-50 text-teal-900 border-teal-200/80",
              iconBg: "bg-teal-50 text-teal-800 border-teal-200/80 group-hover:bg-[#0D5C75] group-hover:text-white",
              border: "hover:border-teal-300 hover:shadow-[0_12px_28px_rgba(13,92,117,0.08)]",
              accentBar: "bg-[#0D5C75]"
            }
          },
          {
            title: "Cardiovascular Risk Panels",
            description: "High-sensitivity Troponin, Lipid fractions, Apolipoprotein & Homocysteine.",
            icon: import_lucide_react2.Heart,
            theme: {
              badge: "bg-amber-50 text-amber-900 border-amber-200/80",
              iconBg: "bg-amber-50 text-amber-800 border-amber-200/80 group-hover:bg-[#B45309] group-hover:text-white",
              border: "hover:border-amber-300 hover:shadow-[0_12px_28px_rgba(180,83,9,0.08)]",
              accentBar: "bg-[#B45309]"
            }
          },
          {
            title: "Immunology & Serology",
            description: "Viral markers (HBsAg, HCV, HIV), Dengue NS1, Widal & autoimmune screening.",
            icon: import_lucide_react2.Shield,
            theme: {
              badge: "bg-rose-50 text-rose-900 border-rose-200/80",
              iconBg: "bg-rose-50 text-rose-800 border-rose-200/80 group-hover:bg-[#831843] group-hover:text-white",
              border: "hover:border-rose-300 hover:shadow-[0_12px_28px_rgba(131,24,67,0.08)]",
              accentBar: "bg-[#831843]"
            }
          },
          {
            title: "Priority Diagnostic Requests",
            description: "Immediate STAT turnaround for critical care, ICU referrals & trauma support.",
            icon: import_lucide_react2.Sparkles,
            theme: {
              badge: "bg-gradient-to-r from-teal-50 to-emerald-50 text-emerald-900 border-emerald-200/80",
              iconBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80 group-hover:bg-gradient-to-r group-hover:from-[#072448] group-hover:to-[#0A6E5C] group-hover:text-white",
              border: "hover:border-emerald-400 hover:shadow-[0_12px_28px_rgba(10,110,92,0.12)]",
              accentBar: "bg-gradient-to-r from-[#0A3663] to-[#0A6E5C]"
            }
          }
        ]
      };
      homeCollection = {
        title: "Home Collection Service",
        subtitle: "Get tested from the comfort of your home. Our trained phlebotomists ensure safe and hygienic sample collection.",
        features: [
          "Flexible Timing",
          "Hygienic Collection",
          "On-time Arrival",
          "Digital Reports"
        ]
      };
    }
  });

  // src/components/ui/dialog.tsx
  var React5, DialogPrimitive, import_lucide_react3, Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription;
  var init_dialog = __esm({
    "src/components/ui/dialog.tsx"() {
      React5 = __toESM(__require("react"), 1);
      DialogPrimitive = __toESM(__require("@radix-ui/react-dialog"), 1);
      import_lucide_react3 = __require("lucide-react");
      init_utils();
      Dialog = DialogPrimitive.Root;
      DialogTrigger = DialogPrimitive.Trigger;
      DialogPortal = DialogPrimitive.Portal;
      DialogOverlay = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5.createElement(
        DialogPrimitive.Overlay,
        {
          ref,
          className: cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
          ),
          ...props
        }
      ));
      DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
      DialogContent = React5.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React5.createElement(DialogPortal, null, /* @__PURE__ */ React5.createElement(DialogOverlay, null), /* @__PURE__ */ React5.createElement(
        DialogPrimitive.Content,
        {
          ref,
          className: cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className
          ),
          ...props
        },
        children,
        /* @__PURE__ */ React5.createElement(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" }, /* @__PURE__ */ React5.createElement(import_lucide_react3.X, { className: "h-4 w-4" }), /* @__PURE__ */ React5.createElement("span", { className: "sr-only" }, "Close"))
      )));
      DialogContent.displayName = DialogPrimitive.Content.displayName;
      DialogHeader = ({ className, ...props }) => /* @__PURE__ */ React5.createElement("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
      DialogHeader.displayName = "DialogHeader";
      DialogFooter = ({ className, ...props }) => /* @__PURE__ */ React5.createElement("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
      DialogFooter.displayName = "DialogFooter";
      DialogTitle = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5.createElement(
        DialogPrimitive.Title,
        {
          ref,
          className: cn("text-lg font-semibold leading-none tracking-tight", className),
          ...props
        }
      ));
      DialogTitle.displayName = DialogPrimitive.Title.displayName;
      DialogDescription = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5.createElement(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
      DialogDescription.displayName = DialogPrimitive.Description.displayName;
    }
  });

  // src/components/seo/SEOHead.tsx
  function SEOHead({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    canonicalUrl = BASE_CANONICAL,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    jsonLd
  }) {
    return /* @__PURE__ */ React.createElement(import_react_helmet_async.Helmet, null, /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("meta", { name: "description", content: description }), /* @__PURE__ */ React.createElement("link", { rel: "canonical", href: canonicalUrl }), /* @__PURE__ */ React.createElement("meta", { property: "og:title", content: title }), /* @__PURE__ */ React.createElement("meta", { property: "og:description", content: description }), /* @__PURE__ */ React.createElement("meta", { property: "og:url", content: canonicalUrl }), /* @__PURE__ */ React.createElement("meta", { property: "og:type", content: ogType }), /* @__PURE__ */ React.createElement("meta", { property: "og:image", content: ogImage }), /* @__PURE__ */ React.createElement("meta", { name: "twitter:title", content: title }), /* @__PURE__ */ React.createElement("meta", { name: "twitter:description", content: description }), /* @__PURE__ */ React.createElement("meta", { name: "twitter:image", content: ogImage }), jsonLd && /* @__PURE__ */ React.createElement("script", { type: "application/ld+json" }, JSON.stringify(jsonLd)));
  }
  var import_react_helmet_async, DEFAULT_TITLE, DEFAULT_DESC, BASE_CANONICAL, DEFAULT_OG_IMAGE;
  var init_SEOHead = __esm({
    "src/components/seo/SEOHead.tsx"() {
      "use client";
      import_react_helmet_async = __require("react-helmet-async");
      DEFAULT_TITLE = "Sawariya Diagnostic Lab - Diagnostic Testing & Home Collection";
      DEFAULT_DESC = "Diagnostic testing, health packages, home sample collection, and patient report access in Charkhi Dadri.";
      BASE_CANONICAL = "https://sawariyadiagnostic.github.io/sawariyadiagnostic/";
      DEFAULT_OG_IMAGE = "https://sawariyadiagnostic.github.io/sawariyadiagnostic/og-image.jpg";
    }
  });

  // src/lib/analytics.ts
  var Analytics;
  var init_analytics = __esm({
    "src/lib/analytics.ts"() {
      Analytics = {
        track: async (eventName, payload = {}) => {
          try {
            console.log(`[Analytics Client] Tracking: ${eventName}`, payload);
            await fetch("/api/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: eventName,
                payload,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
                // include anonymous user ID / session ID here for CAPI dedup
              })
            });
          } catch (e) {
            console.error("[Analytics Engine] Failed to dispatch event", e);
          }
        },
        pageView: (path) => Analytics.track("PAGE_VIEW", { path }),
        leadContact: (source) => Analytics.track("LEAD_CONTACT", { source }),
        reportDownloaded: (reportId) => Analytics.track("REPORT_DOWNLOAD", { reportId }),
        testViewed: (testName) => Analytics.track("TEST_VIEW", { testName })
      };
    }
  });

  // src/lib/lis-client.ts
  var lis_client_exports = {};
  __export(lis_client_exports, {
    LISClient: () => LISClient
  });
  var import_sonner, LISClient;
  var init_lis_client = __esm({
    "src/lib/lis-client.ts"() {
      import_sonner = __require("sonner");
      init_analytics();
      LISClient = {
        /**
         * Securely requests a report from the internal LIS
         */
        downloadReport: async (patientId, reportId, otp) => {
          try {
            const res = await fetch("/api/lis/download-report", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ patientId, reportId, otp })
            });
            if (!res.ok) {
              throw new Error("Failed to authenticate or retrieve report from LIS");
            }
            const data = await res.json();
            if (data.success && data.downloadUrl) {
              Analytics.reportDownloaded(reportId);
              import_sonner.toast.success("Report successfully retrieved from LIS");
              if (!data.downloadUrl) throw new Error("LIS returned no downloadable report");
              window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
              return data;
            }
            throw new Error("Invalid response format from LIS");
          } catch (e) {
            console.error("[LIS Client] Error", e);
            import_sonner.toast.error("Failed to retrieve report. Please verify Patient ID.");
            throw e;
          }
        }
      };
    }
  });

  // src/lib/forms.ts
  var import_sonner3, FormsService;
  var init_forms = __esm({
    "src/lib/forms.ts"() {
      import_sonner3 = __require("sonner");
      init_site();
      FormsService = {
        /**
         * Submit to Web3Forms / Formspree
         */
        submitForm: async (payload, apiKey) => {
          if (apiKey) {
            try {
              const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  access_key: apiKey,
                  subject: `New Diagnostic Booking from ${payload.name} (${payload.phone})`,
                  from_name: "Sawariya Lab Portal",
                  ...payload
                })
              });
              const data = await response.json();
              if (data.success) {
                import_sonner3.toast.success("Your booking request was received! Confirmation SMS sent.");
                return { success: true, message: "Request submitted via Web3Forms" };
              }
            } catch (err) {
              console.warn("Web3Forms direct submission fallback", err);
            }
          }
          const whatsappUrl = whatsappHref(
            `New booking request: ${payload.name} | ${payload.phone} | ${payload.serviceType} | ${payload.address || "Lab walk-in"}`
          );
          const message = whatsappUrl ? "No online form provider is configured. WhatsApp is ready as a manual handoff." : `Request captured locally only. Configure VITE_WEB3FORMS_ACCESS_KEY or ${siteConfig.contact.whatsapp}.`;
          return { success: false, message };
        },
        /**
         * Open direct WhatsApp dispatch with pre-filled booking details
         */
        dispatchToWhatsApp: (payload) => {
          const text = `\u{1F3E5} *NEW LAB APPOINTMENT REQUEST*

*Patient Name:* ${payload.name}
*Phone:* ${payload.phone}
*Service/Test:* ${payload.serviceType}
*Address:* ${payload.address || "Lab Walk-in"}
*Date:* ${payload.date || "Earliest available"}

Please confirm my sample collection slot!`;
          const url = whatsappHref(text);
          if (url && typeof window !== "undefined") {
            window.open(url, "_blank");
          }
          return url;
        }
      };
    }
  });

  // src/components/ui/tabs.tsx
  var React6, TabsPrimitive, Tabs, TabsList, TabsTrigger, TabsContent;
  var init_tabs = __esm({
    "src/components/ui/tabs.tsx"() {
      React6 = __toESM(__require("react"), 1);
      TabsPrimitive = __toESM(__require("@radix-ui/react-tabs"), 1);
      init_utils();
      Tabs = TabsPrimitive.Root;
      TabsList = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React6.createElement(
        TabsPrimitive.List,
        {
          ref,
          className: cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
          ),
          ...props
        }
      ));
      TabsList.displayName = TabsPrimitive.List.displayName;
      TabsTrigger = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React6.createElement(
        TabsPrimitive.Trigger,
        {
          ref,
          className: cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            className
          ),
          ...props
        }
      ));
      TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
      TabsContent = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React6.createElement(
        TabsPrimitive.Content,
        {
          ref,
          className: cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          ),
          ...props
        }
      ));
      TabsContent.displayName = TabsPrimitive.Content.displayName;
    }
  });

  // src/components/ui/label.tsx
  var React7, LabelPrimitive, labelVariants, Label;
  var init_label = __esm({
    "src/components/ui/label.tsx"() {
      React7 = __toESM(__require("react"), 1);
      LabelPrimitive = __toESM(__require("@radix-ui/react-label"), 1);
      init_dist();
      init_utils();
      labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
      Label = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
      Label.displayName = LabelPrimitive.Root.displayName;
    }
  });

  // src/components/booking/TestBookingModal.tsx
  function TestBookingModal({
    testName,
    price,
    originalPrice,
    isPackage,
    trigger,
    isOpen: externalOpen,
    onOpenChange: externalOnOpenChange
  }) {
    const [internalOpen, setInternalOpen] = (0, import_react5.useState)(false);
    const open = externalOpen !== void 0 ? externalOpen : internalOpen;
    const setOpen = externalOnOpenChange || setInternalOpen;
    const [step, setStep] = (0, import_react5.useState)("DETAILS");
    const [patientName, setPatientName] = (0, import_react5.useState)("");
    const [phone, setPhone] = (0, import_react5.useState)("");
    const [address, setAddress] = (0, import_react5.useState)("");
    const [visitType, setVisitType] = (0, import_react5.useState)("HOME");
    const [selectedSlot, setSelectedSlot] = (0, import_react5.useState)("Morning (07:00 AM - 09:30 AM)");
    const [isProcessing, setIsProcessing] = (0, import_react5.useState)(false);
    const [confirmedBookingId, setConfirmedBookingId] = (0, import_react5.useState)("");
    const slots = [
      "Morning (07:00 AM - 09:30 AM)",
      "Mid-day (10:00 AM - 01:00 PM)",
      "Afternoon (02:00 PM - 05:00 PM)",
      "Evening (05:00 PM - 08:00 PM)"
    ];
    const handleProceedToReview = (e) => {
      e.preventDefault();
      const cleanPhone = phone.replace(/\D/g, "");
      if (!patientName.trim()) {
        import_sonner5.toast.error("Please enter patient name");
        return;
      }
      if (!cleanPhone || cleanPhone.length < 10) {
        import_sonner5.toast.error("Please enter a valid 10-digit mobile number");
        return;
      }
      if (visitType === "HOME" && !address.trim()) {
        import_sonner5.toast.error("Please enter your home address in Charkhi Dadri");
        return;
      }
      setStep("REVIEW");
    };
    const handleQuickWhatsAppBook = () => {
      const text = `Hi Sawariya Diagnostic, I would like to book the test "${testName}" (\u20B9${price}) with doorstep collection in Charkhi Dadri.`;
      const url = whatsappHref(text);
      if (url) window.open(url, "_blank");
      setOpen(false);
    };
    const handleFinalBooking = async () => {
      setIsProcessing(true);
      try {
        const result = await FormsService.submitForm({
          name: patientName.trim(),
          phone: phone.trim(),
          address: visitType === "HOME" ? address.trim() || "Charkhi Dadri" : "Lab Walk-in",
          serviceType: `${testName} (\u20B9${price}) - Pay on Sample Collection`,
          date: selectedSlot
        }, import_meta5.env.VITE_WEB3FORMS_ACCESS_KEY);
        if (!result.success) {
          const handoff = FormsService.dispatchToWhatsApp({
            name: patientName,
            phone,
            address: visitType === "HOME" ? address : "Lab Walk-in",
            serviceType: `${testName} (\u20B9${price}) - Pay on Sample Collection`,
            date: selectedSlot
          });
          import_sonner5.toast.info(handoff ? "WhatsApp opened. Send the prepared request to finish booking." : result.message);
          setOpen(false);
          return;
        }
        setConfirmedBookingId("REQUEST-SENT");
        setStep("CONFIRMED");
        import_sonner5.toast.success("Booking request sent to the lab team.");
      } catch (err) {
        console.error("Booking failed", err);
        import_sonner5.toast.error("Could not complete booking record. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    };
    const resetModal = () => {
      setStep("DETAILS");
      setPatientName("");
      setPhone("");
      setAddress("");
      setVisitType("HOME");
      setOpen(false);
    };
    return /* @__PURE__ */ React.createElement(Dialog, { open, onOpenChange: (val) => {
      if (!val) resetModal();
      else setOpen(val);
    } }, trigger && /* @__PURE__ */ React.createElement(DialogTrigger, { asChild: true }, trigger), /* @__PURE__ */ React.createElement(DialogContent, { className: "w-[calc(100vw-32px)] sm:max-w-[480px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[28px] sm:rounded-[32px] mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-4 sm:p-5 text-white relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between relative z-10 gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-teal-200 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1" }, isPackage ? "Health Package Booking" : "Diagnostic Test Booking"), /* @__PURE__ */ React.createElement(DialogTitle, { className: "text-base sm:text-xl font-bold text-white tracking-tight leading-snug truncate" }, testName)), /* @__PURE__ */ React.createElement("div", { className: "text-right flex-shrink-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl sm:text-2xl font-black text-white" }, "\u20B9", price), originalPrice && /* @__PURE__ */ React.createElement("span", { className: "text-xs text-teal-200 line-through block font-normal" }, "\u20B9", originalPrice))), /* @__PURE__ */ React.createElement(DialogDescription, { className: "text-xs text-teal-100/80 mt-1 relative z-10" }, "Quality-focused lab \u2022 Home collection where available \u2022 Report timing depends on the test")), step === "DETAILS" && /* @__PURE__ */ React.createElement("form", { onSubmit: handleProceedToReview, className: "p-4 sm:p-6 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-emerald-50/80 border border-emerald-200/80 rounded-[18px] p-3 flex items-center justify-between gap-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-emerald-900 flex items-center gap-1" }, /* @__PURE__ */ React.createElement(import_lucide_react15.Sparkles, { className: "w-3.5 h-3.5 text-emerald-600" }), " Fast Booking Option"), /* @__PURE__ */ React.createElement("p", { className: "text-[10.5px] text-emerald-800 truncate" }, "Book directly with our coordinator in 10 seconds")), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: handleQuickWhatsAppBook,
        className: "bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
      },
      /* @__PURE__ */ React.createElement("span", null, "WhatsApp")
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-[18px]" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setVisitType("HOME"),
        className: `py-2 px-2.5 rounded-[14px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${visitType === "HOME" ? "bg-white text-[#155E9A] shadow-xs" : "text-slate-600 hover:text-slate-900"}`
      },
      /* @__PURE__ */ React.createElement(import_lucide_react15.Home, { className: "w-3.5 h-3.5 flex-shrink-0" }),
      /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Home Collection (Free)")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setVisitType("LAB"),
        className: `py-2 px-2.5 rounded-[14px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${visitType === "LAB" ? "bg-white text-[#155E9A] shadow-xs" : "text-slate-600 hover:text-slate-900"}`
      },
      /* @__PURE__ */ React.createElement(import_lucide_react15.Building2, { className: "w-3.5 h-3.5 flex-shrink-0" }),
      /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Lab Walk-in (24*7)")
    )), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "b-patient-name", className: "text-xs font-bold text-slate-700" }, "Patient Full Name"), /* @__PURE__ */ React.createElement(
      Input,
      {
        id: "b-patient-name",
        placeholder: "e.g. Ramesh Kumar",
        value: patientName,
        onChange: (e) => setPatientName(e.target.value),
        required: true,
        className: "h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#155E9A] rounded-[14px] mt-1 text-sm font-medium text-slate-900"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "b-phone", className: "text-xs font-bold text-slate-700" }, "Mobile Number (10 Digits)"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400" }, "For SMS & Reports")), /* @__PURE__ */ React.createElement(
      Input,
      {
        id: "b-phone",
        type: "tel",
        maxLength: 10,
        placeholder: "e.g. your mobile number",
        value: phone,
        onChange: (e) => setPhone(e.target.value.replace(/\D/g, "")),
        required: true,
        className: "h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#155E9A] rounded-[14px] mt-1 text-sm font-medium text-slate-900 font-mono"
      }
    )), visitType === "HOME" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "b-address", className: "text-xs font-bold text-slate-700" }, "Home Address in Charkhi Dadri"), /* @__PURE__ */ React.createElement(
      Input,
      {
        id: "b-address",
        placeholder: "e.g. Loharu Road / Model Town / Sector 8",
        value: address,
        onChange: (e) => setAddress(e.target.value),
        required: true,
        className: "h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#155E9A] rounded-[14px] mt-1 text-sm font-medium text-slate-900"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "b-slot", className: "text-xs font-bold text-slate-700" }, "Preferred Time Slot"), /* @__PURE__ */ React.createElement(
      "select",
      {
        id: "b-slot",
        value: selectedSlot,
        onChange: (e) => setSelectedSlot(e.target.value),
        className: "w-full h-11 bg-slate-50 border border-slate-200 focus:border-[#155E9A] rounded-[14px] px-3 mt-1 text-xs font-medium text-slate-900"
      },
      slots.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s))
    ))), /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "submit",
        className: "w-full h-12 btn-primary rounded-[16px] font-bold text-sm shadow-md mt-2 cursor-pointer"
      },
      /* @__PURE__ */ React.createElement("span", null, "Continue to Confirmation (Pay on Collection)")
    )), step === "REVIEW" && /* @__PURE__ */ React.createElement("div", { className: "p-4 sm:p-6 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-[18px] p-3.5 space-y-1.5 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between font-bold text-slate-900 text-sm" }, /* @__PURE__ */ React.createElement("span", null, "Total Amount Payable:"), /* @__PURE__ */ React.createElement("span", { className: "text-[#155E9A] font-black text-base" }, "\u20B9", price)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-500" }, /* @__PURE__ */ React.createElement("span", null, "Patient: ", patientName), /* @__PURE__ */ React.createElement("span", null, "Slot: ", selectedSlot.split(" ")[0])), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-500" }, /* @__PURE__ */ React.createElement("span", null, "Mode: ", visitType === "HOME" ? "Home Doorstep Sample" : "Lab Walk-in"), /* @__PURE__ */ React.createElement("span", null, "Advance: \u20B90 (No Prepayment)"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-800" }, "Payment Mode"), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-[18px] border-2 border-[#155E9A] bg-teal-50/60 ring-2 ring-[#C62828]/20 transition-all" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-full bg-[#155E9A] text-white flex items-center justify-center flex-shrink-0 shadow-xs" }, /* @__PURE__ */ React.createElement(import_lucide_react15.Banknote, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs sm:text-sm text-slate-900" }, "Pay on Sample Collection"), /* @__PURE__ */ React.createElement("span", { className: "bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300" }, "Default")), /* @__PURE__ */ React.createElement("p", { className: "text-[11.5px] text-slate-600 leading-relaxed font-normal" }, "Pay ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900 font-bold" }, "\u20B9", price), " via ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-800" }, "Cash"), " or ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-800" }, "UPI QR Code"), " (GPay, PhonePe, Paytm) directly to the certified phlebotomist when your sample is collected."), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-[11px] text-[#155E9A] font-semibold pt-1" }, /* @__PURE__ */ React.createElement(import_lucide_react15.ShieldCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Zero advance fee \u2022 100% Secure & Verified")))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 pt-2" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "button",
        variant: "outline",
        onClick: () => setStep("DETAILS"),
        className: "h-12 rounded-[16px] text-xs font-bold px-4"
      },
      "Back"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "button",
        onClick: handleFinalBooking,
        disabled: isProcessing,
        className: "flex-1 h-12 btn-primary rounded-[16px] text-xs sm:text-sm font-bold shadow-md"
      },
      isProcessing ? /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(import_lucide_react15.Sparkles, { className: "w-4 h-4 animate-spin text-[#FDE047]" }), " Confirming...") : /* @__PURE__ */ React.createElement("span", null, "Confirm Booking (Pay \u20B9", price, " on Collection)")
    ))), step === "CONFIRMED" && /* @__PURE__ */ React.createElement("div", { className: "p-5 sm:p-6 text-center space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md" }, /* @__PURE__ */ React.createElement(import_lucide_react15.CheckCircle2, { className: "w-7 h-7 sm:w-8 sm:h-8" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg sm:text-xl font-bold text-slate-900" }, "Booking Confirmed!"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Booking ID: ", /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-[#155E9A]" }, confirmedBookingId))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-[20px] p-3.5 sm:p-4 text-left space-y-2 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Patient Name:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, patientName)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Test / Package:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 truncate max-w-[200px]" }, testName)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Time Slot:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900" }, selectedSlot)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Payment:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-emerald-700" }, "Pay \u20B9", price, " on Sample Collection"))), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 leading-relaxed" }, "Our Phlebotomy desk has scheduled your visit. A confirmation summary has been dispatched to your WhatsApp number."), /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: resetModal,
        className: "w-full h-11 btn-primary rounded-[16px] text-xs font-bold"
      },
      "Done & Return to Test Catalog"
    ))));
  }
  var import_react5, import_lucide_react15, import_sonner5, import_meta5;
  var init_TestBookingModal = __esm({
    "src/components/booking/TestBookingModal.tsx"() {
      init_site();
      import_react5 = __require("react");
      init_dialog();
      init_button();
      init_input();
      init_label();
      import_lucide_react15 = __require("lucide-react");
      init_forms();
      import_sonner5 = __require("sonner");
      import_meta5 = {};
    }
  });

  // src/lib/seo-ssg.ts
  var BASE_URL, SEOManager;
  var init_seo_ssg = __esm({
    "src/lib/seo-ssg.ts"() {
      BASE_URL = "https://sawariyadiagnostic.github.io/sawariyadiagnostic";
      SEOManager = {
        /**
         * Updates document meta tags dynamically
         */
        updateMeta: (metadata) => {
          if (typeof document === "undefined") return;
          document.title = metadata.title;
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.setAttribute("name", "description");
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute("content", metadata.description);
          const setMetaProperty = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
              tag = document.createElement("meta");
              tag.setAttribute("property", property);
              document.head.appendChild(tag);
            }
            tag.setAttribute("content", content);
          };
          setMetaProperty("og:title", metadata.title);
          setMetaProperty("og:description", metadata.description);
          setMetaProperty("og:type", metadata.type || "website");
          if (metadata.canonicalUrl) {
            setMetaProperty("og:url", metadata.canonicalUrl);
          }
          if (metadata.ogImage) {
            setMetaProperty("og:image", metadata.ogImage);
          }
          const setMetaName = (name, content) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
              tag = document.createElement("meta");
              tag.setAttribute("name", name);
              document.head.appendChild(tag);
            }
            tag.setAttribute("content", content);
          };
          setMetaName("twitter:title", metadata.title);
          setMetaName("twitter:description", metadata.description);
          let canonicalTag = document.querySelector('link[rel="canonical"]');
          if (metadata.canonicalUrl) {
            if (!canonicalTag) {
              canonicalTag = document.createElement("link");
              canonicalTag.setAttribute("rel", "canonical");
              document.head.appendChild(canonicalTag);
            }
            canonicalTag.setAttribute("href", metadata.canonicalUrl);
          }
          if (metadata.jsonLd) {
            const existingScript = document.getElementById("dynamic-jsonld-schema");
            if (existingScript) {
              existingScript.remove();
            }
            const script = document.createElement("script");
            script.id = "dynamic-jsonld-schema";
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(metadata.jsonLd);
            document.head.appendChild(script);
          }
        },
        /**
         * Generates Schema.org MedicalTest JSON-LD for an individual blood test
         */
        generateTestSchema: (test) => {
          return {
            "@context": "https://schema.org",
            "@type": "MedicalTest",
            name: test.name,
            description: test.description,
            url: `${BASE_URL}/#/test/${test.id}`,
            code: {
              "@type": "MedicalCode",
              code: test.id.toUpperCase(),
              codingSystem: "Internal-LIS"
            },
            offers: {
              "@type": "Offer",
              price: test.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              validFrom: "2025-01-01",
              seller: {
                "@type": "DiagnosticLab",
                name: "Sawariya Diagnostic",
                telephone: "+917015290782"
              }
            },
            usedToDiagnose: test.parameters?.map((p) => ({
              "@type": "MedicalCondition",
              name: p
            })) || [],
            relevantSpecialty: {
              "@type": "MedicalSpecialty",
              name: "Pathology"
            }
          };
        },
        /**
         * Generates Schema.org MedicalBusiness / HealthPackage schema
         */
        generatePackageSchema: (pkg) => {
          return {
            "@context": "https://schema.org",
            "@type": "Product",
            name: pkg.name,
            description: pkg.description,
            url: `${BASE_URL}/#/package/${pkg.id}`,
            offers: {
              "@type": "Offer",
              price: pkg.price,
              priceCurrency: "INR",
              priceValidUntil: "2026-12-31",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "DiagnosticLab",
                name: "Sawariya Diagnostic"
              }
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "342"
            }
          };
        },
        /**
         * Generates BreadcrumbList schema
         */
        generateBreadcrumbSchema: (items) => {
          return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url
            }))
          };
        }
      };
    }
  });

  // src/components/catalog/TestDetailModal.tsx
  function TestDetailModal({ item, isOpen, onClose }) {
    const [showBooking, setShowBooking] = (0, import_react6.useState)(false);
    const [showSchemaPreview, setShowSchemaPreview] = (0, import_react6.useState)(false);
    if (!item) return null;
    const isPackage = "testsIncluded" in item;
    const discountPercent = item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : null;
    const handleShare = () => {
      const url = `${window.location.origin}/#/${isPackage ? "package" : "test"}/${item.id}`;
      navigator.clipboard.writeText(url);
      import_sonner6.toast.success("Canonical link copied to clipboard!");
    };
    const schemaJson = isPackage ? SEOManager.generatePackageSchema(item) : SEOManager.generateTestSchema(item);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, isOpen && /* @__PURE__ */ React.createElement(
      SEOHead,
      {
        title: `${item.name} - Price \u20B9${item.price} | Sawariya Diagnostic`,
        description: item.description || `Book ${item.name} test at Sawariya Diagnostic Lab with free home sample collection.`,
        canonicalUrl: `https://sawariyadiagnostic.github.io/sawariyadiagnostic/${isPackage ? "package" : "test"}/${item.id}.html`,
        jsonLd: schemaJson
      }
    ), /* @__PURE__ */ React.createElement(Dialog, { open: isOpen, onOpenChange: (val) => !val && onClose() }, /* @__PURE__ */ React.createElement(DialogContent, { className: "sm:max-w-[620px] max-h-[90vh] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-6 text-white relative overflow-hidden flex-shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-4 relative z-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold text-teal-200 mb-2" }, /* @__PURE__ */ React.createElement(import_lucide_react16.TestTube, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, isPackage ? "PREVENTIVE HEALTH PACKAGE" : `${item.category?.toUpperCase()} PATHOLOGY`)), /* @__PURE__ */ React.createElement(DialogTitle, { className: "text-xl sm:text-2xl font-black text-white tracking-tight leading-tight" }, item.name), /* @__PURE__ */ React.createElement(DialogDescription, { className: "text-xs text-teal-100/90 mt-1" }, "Documented laboratory protocols \u2022 Confirm current scope with the lab")), /* @__PURE__ */ React.createElement("div", { className: "text-right flex-shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl sm:text-3xl font-black text-white" }, "\u20B9", item.price), item.originalPrice && /* @__PURE__ */ React.createElement("div", { className: "text-xs text-teal-200 line-through" }, "\u20B9", item.originalPrice), discountPercent && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold bg-[#FDE047] text-[#102A43] px-2 py-0.5 rounded-full inline-block mt-1" }, "Save ", discountPercent, "%")))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs space-y-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block" }, "Clinical Overview & Purpose"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-700 leading-relaxed font-normal" }, item.description)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Turnaround Time:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-[#155E9A] flex items-center gap-1 mt-0.5" }, /* @__PURE__ */ React.createElement(import_lucide_react16.Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, isPackage ? "12-24 hours" : item.turnaroundTime))), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Sample Collection:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800 flex items-center gap-1 mt-0.5" }, /* @__PURE__ */ React.createElement(import_lucide_react16.Home, { className: "w-3.5 h-3.5 text-[#C62828]" }), /* @__PURE__ */ React.createElement("span", null, "Free Doorstep"))), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs col-span-2 sm:col-span-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Fasting Advice:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800 mt-0.5 block" }, item.name.toLowerCase().includes("lipid") || item.name.toLowerCase().includes("sugar") || item.name.toLowerCase().includes("glucose") ? "10-12 Hrs Fasting" : "No Fasting Needed"))), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs space-y-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block" }, isPackage ? `Tests Included in Package (${item.testsIncluded.length})` : "Diagnostic Parameters Measured:"), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-2" }, (isPackage ? item.testsIncluded : item.parameters || [item.name]).map((param, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-[12px] border border-slate-100" }, /* @__PURE__ */ React.createElement(import_lucide_react16.Check, { className: "w-3.5 h-3.5 text-emerald-600 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, param))))), /* @__PURE__ */ React.createElement("div", { className: "pt-1" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setShowSchemaPreview(!showSchemaPreview),
        className: "text-[11px] font-bold text-[#155E9A] hover:underline flex items-center gap-1 cursor-pointer"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react16.Code, { className: "w-3 h-3" }),
      /* @__PURE__ */ React.createElement("span", null, showSchemaPreview ? "Hide" : "View", " Schema.org Structured Data & SEO Preview")
    ), showSchemaPreview && /* @__PURE__ */ React.createElement("div", { className: "mt-2 bg-slate-900 text-slate-200 p-3.5 rounded-[16px] text-[10px] font-mono overflow-x-auto max-h-[160px]" }, /* @__PURE__ */ React.createElement("pre", null, JSON.stringify(schemaJson, null, 2))))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white border-t border-slate-200 flex gap-2 flex-shrink-0" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "outline",
        onClick: handleShare,
        className: "h-11 px-3.5 rounded-[14px] text-xs font-bold gap-1.5 border-slate-200",
        title: "Copy canonical share link"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react16.Share2, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Share")
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: () => setShowBooking(true),
        className: "flex-1 h-11 btn-primary rounded-[14px] text-xs sm:text-sm font-bold shadow-md gap-1.5"
      },
      /* @__PURE__ */ React.createElement("span", null, "Book Appointment (\u20B9", item.price, ")"),
      /* @__PURE__ */ React.createElement(import_lucide_react16.ArrowRight, { className: "w-4 h-4" })
    )))), showBooking && /* @__PURE__ */ React.createElement(
      TestBookingModal,
      {
        testName: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        isPackage,
        isOpen: showBooking,
        onOpenChange: (v) => setShowBooking(v)
      }
    ));
  }
  var import_react6, import_lucide_react16, import_sonner6;
  var init_TestDetailModal = __esm({
    "src/components/catalog/TestDetailModal.tsx"() {
      import_react6 = __require("react");
      init_dialog();
      init_button();
      import_lucide_react16 = __require("lucide-react");
      init_seo_ssg();
      init_SEOHead();
      init_TestBookingModal();
      import_sonner6 = __require("sonner");
    }
  });

  // src/components/ui/TestCard.tsx
  function TestCard({ test, onBook, onViewDetails }) {
    const [showBooking, setShowBooking] = (0, import_react7.useState)(false);
    const [showDetail, setShowDetail] = (0, import_react7.useState)(false);
    const handleBookClick = (e) => {
      e.stopPropagation();
      if (onBook) {
        onBook(test.id);
      } else {
        setShowBooking(true);
      }
    };
    const handleCardClick = () => {
      if (onViewDetails) {
        onViewDetails(test);
      } else {
        setShowDetail(true);
      }
    };
    const getCategoryBadge = (category) => {
      switch (category.toLowerCase()) {
        case "routine":
        case "blood":
          return "bg-blue-50 text-blue-900 border-blue-200/80";
        case "diabetes":
          return "bg-emerald-50 text-emerald-900 border-emerald-200/80";
        case "thyroid":
        case "hormone":
          return "bg-purple-50 text-purple-900 border-purple-200/80";
        case "lipid":
          return "bg-amber-50 text-amber-900 border-amber-200/80";
        case "specialized":
          return "bg-cyan-50 text-cyan-900 border-cyan-200/80";
        default:
          return "bg-teal-50 text-teal-900 border-teal-200/80";
      }
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: handleCardClick,
        className: "glass-card p-5 sm:p-6 flex flex-col justify-between h-full group rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-[#155E9A]/40 transition-all duration-300 relative overflow-hidden cursor-pointer"
      },
      /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-teal-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-emerald-500/5 transition-colors duration-500 pointer-events-none" }),
      /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3 gap-2" }, test.popular ? /* @__PURE__ */ React.createElement("span", { className: "bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-[#FDE047] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs border border-teal-300/30" }, "\u2605 Popular") : /* @__PURE__ */ React.createElement("span", { className: `text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize border ${getCategoryBadge(test.category)}` }, test.category), test.homeCollection && /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1 bg-teal-50 text-teal-800 border border-teal-200/80 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full" }, /* @__PURE__ */ React.createElement(import_lucide_react17.Home, { className: "w-3 h-3 text-[#155E9A]" }), " Home Visit")), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base sm:text-lg text-[#1D1D1F] mb-1.5 group-hover:text-[#155E9A] transition-colors leading-snug" }, test.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed font-normal" }, test.description)), test.parameters && test.parameters.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4 space-y-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block" }, "Key Parameters:"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1" }, test.parameters.slice(0, 3).map((param) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: param,
          className: "text-[10.5px] bg-slate-50 text-slate-700 px-2.5 py-0.5 rounded-md font-medium border border-slate-200/80"
        },
        param
      )), test.parameters.length > 3 && /* @__PURE__ */ React.createElement("span", { className: "text-[10.5px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-semibold border border-teal-200/80" }, "+", test.parameters.length - 3, " more")))),
      /* @__PURE__ */ React.createElement("div", { className: "pt-4 mt-auto border-t border-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3.5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black text-[#1D1D1F]" }, "\u20B9", test.price), test.originalPrice && test.originalPrice > test.price && /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400 line-through font-normal" }, "\u20B9", test.originalPrice)), /* @__PURE__ */ React.createElement("span", { className: "text-[9.5px] text-slate-400 font-medium" }, "NABL Certified")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 text-[10.5px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full" }, /* @__PURE__ */ React.createElement(import_lucide_react17.Clock, { className: "w-3 h-3 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", null, test.turnaroundTime))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: (e) => {
            e.stopPropagation();
            setShowDetail(true);
          },
          className: "h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] border-slate-200 hover:bg-slate-50 w-full min-w-0"
        },
        /* @__PURE__ */ React.createElement(import_lucide_react17.Info, { className: "w-3.5 h-3.5 text-slate-500 shrink-0" }),
        /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Details")
      ), /* @__PURE__ */ React.createElement(
        Button,
        {
          size: "sm",
          onClick: handleBookClick,
          className: "btn-primary h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] active:scale-[0.98] transition-all shadow-xs hover:shadow-md w-full min-w-0"
        },
        /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Book Now"),
        /* @__PURE__ */ React.createElement(import_lucide_react17.ArrowRight, { className: "w-3.5 h-3.5 shrink-0" })
      )))
    ), /* @__PURE__ */ React.createElement(
      TestBookingModal,
      {
        testName: test.name,
        price: test.price,
        originalPrice: test.originalPrice,
        isOpen: showBooking,
        onOpenChange: (v) => setShowBooking(v)
      }
    ), /* @__PURE__ */ React.createElement(
      TestDetailModal,
      {
        item: test,
        isOpen: showDetail,
        onClose: () => setShowDetail(false)
      }
    ));
  }
  var import_react7, import_lucide_react17;
  var init_TestCard = __esm({
    "src/components/ui/TestCard.tsx"() {
      import_react7 = __require("react");
      import_lucide_react17 = __require("lucide-react");
      init_button();
      init_TestBookingModal();
      init_TestDetailModal();
    }
  });

  // src/data/mockTests.ts
  var medicalTests, healthPackages, categories;
  var init_mockTests = __esm({
    "src/data/mockTests.ts"() {
      medicalTests = [
        {
          id: "cbc",
          name: "Complete Blood Count (CBC)",
          description: "Comprehensive analysis of blood cells including RBC, WBC, platelets, and hemoglobin levels.",
          price: 220,
          originalPrice: 400,
          turnaroundTime: "4-6 hours",
          category: "blood",
          parameters: ["RBC Count", "WBC Count", "Hemoglobin", "Platelet Count", "Hematocrit"],
          homeCollection: true,
          popular: true
        },
        {
          id: "esr",
          name: "ESR (Erythrocyte Sedimentation Rate)",
          description: "Measures the rate at which red blood cells settle, used to detect inflammation.",
          price: 150,
          originalPrice: 250,
          turnaroundTime: "4-6 hours",
          category: "blood",
          parameters: ["ESR"],
          homeCollection: true
        },
        {
          id: "lipid",
          name: "Lipid Profile",
          description: "Complete cholesterol assessment including HDL, LDL, triglycerides, and total cholesterol.",
          price: 500,
          originalPrice: 699,
          turnaroundTime: "4-6 hours",
          category: "blood",
          parameters: ["Total Cholesterol", "HDL", "LDL", "Triglycerides", "VLDL"],
          homeCollection: true,
          popular: true
        },
        {
          id: "thyroid",
          name: "Thyroid Profile (T3, T4, TSH)",
          description: "Complete thyroid function test to assess thyroid health and hormone levels.",
          price: 499,
          originalPrice: 899,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["T3", "T4", "TSH"],
          homeCollection: true,
          popular: true
        },
        {
          id: "free-thyroid",
          name: "Free Thyroid Profile",
          description: "Measures unbound active thyroid hormones (Free T3, Free T4) along with TSH.",
          price: 599,
          originalPrice: 1099,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["Free T3", "Free T4", "TSH"],
          homeCollection: true
        },
        {
          id: "fsh",
          name: "FSH",
          description: "Follicle-stimulating hormone (FSH) is a hormone that plays a crucial role in sexual development and reproduction.",
          price: 399,
          originalPrice: 899,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["FSH"],
          homeCollection: true
        },
        {
          id: "lh",
          name: "LH",
          description: "Luteinizing hormone (LH) is a hormone that plays a crucial role in sexual development and reproduction.",
          price: 499,
          originalPrice: 899,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["LH"],
          homeCollection: true
        },
        {
          id: "prl",
          name: "Prolactin (PRL)",
          description: "Measures the level of prolactin hormone, important for reproductive health.",
          price: 450,
          originalPrice: 850,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["Prolactin"],
          homeCollection: true
        },
        {
          id: "testo-total",
          name: "Testosterone Total",
          description: "Measures total testosterone levels in the blood.",
          price: 550,
          originalPrice: 999,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["Total Testosterone"],
          homeCollection: true
        },
        {
          id: "free-testo",
          name: "Free Testosterone",
          description: "Measures the active, unbound form of testosterone in the blood.",
          price: 850,
          originalPrice: 1299,
          turnaroundTime: "8-10 hours",
          category: "hormone",
          parameters: ["Free Testosterone"],
          homeCollection: true
        },
        {
          id: "shbg",
          name: "SHBG",
          description: "Sex Hormone Binding Globulin test, often used with testosterone levels.",
          price: 950,
          originalPrice: 1499,
          turnaroundTime: "12-24 hours",
          category: "hormone",
          parameters: ["SHBG"],
          homeCollection: true
        },
        {
          id: "amh",
          name: "AMH (Anti-Mullerian Hormone)",
          description: "Assesses ovarian reserve and fertility potential in women.",
          price: 1500,
          originalPrice: 2200,
          turnaroundTime: "12-24 hours",
          category: "hormone",
          parameters: ["AMH"],
          homeCollection: true
        },
        {
          id: "dheas",
          name: "DHEAS",
          description: "Measures DHEAS levels, evaluating adrenal gland function.",
          price: 850,
          originalPrice: 1250,
          turnaroundTime: "12-24 hours",
          category: "hormone",
          parameters: ["DHEAS"],
          homeCollection: true
        },
        {
          id: "growth-hormone",
          name: "Growth Hormone (GH)",
          description: "Measures human growth hormone levels.",
          price: 750,
          originalPrice: 1150,
          turnaroundTime: "12-24 hours",
          category: "hormone",
          parameters: ["Growth Hormone"],
          homeCollection: true
        },
        {
          id: "igf1",
          name: "IGF-1",
          description: "Insulin-like Growth Factor 1, helps assess growth hormone disorders.",
          price: 1100,
          originalPrice: 1800,
          turnaroundTime: "12-24 hours",
          category: "hormone",
          parameters: ["IGF-1"],
          homeCollection: true
        },
        {
          id: "beta-hcg",
          name: "Beta HCG",
          description: "Quantitative measurement of Beta HCG for pregnancy confirmation.",
          price: 600,
          originalPrice: 950,
          turnaroundTime: "6-8 hours",
          category: "hormone",
          parameters: ["Beta HCG"],
          homeCollection: true
        },
        {
          id: "hba1c",
          name: "HbA1c (Glycated Hemoglobin)",
          description: "Measures average blood sugar levels over the past 2-3 months for diabetes monitoring.",
          price: 399,
          originalPrice: 699,
          turnaroundTime: "4-6 hours",
          category: "blood",
          parameters: ["HbA1c Percentage", "Estimated Average Glucose"],
          homeCollection: true
        },
        {
          id: "vitamin-d",
          name: "Vitamin D (25-OH)",
          description: "Measures vitamin D levels to assess bone health and immune function.",
          price: 799,
          originalPrice: 1199,
          turnaroundTime: "8-10 hours",
          category: "specialized",
          parameters: ["25-Hydroxy Vitamin D"],
          homeCollection: true,
          popular: true
        },
        {
          id: "vitamin-b12",
          name: "Vitamin B12",
          description: "Essential test for detecting B12 deficiency affecting energy and nerve function.",
          price: 1199,
          originalPrice: 1999,
          turnaroundTime: "24 hours",
          category: "specialized",
          parameters: ["Vitamin B12 Level"],
          homeCollection: true
        },
        {
          id: "liver",
          name: "Liver Function Test (LFT)",
          description: "Comprehensive assessment of liver health including enzymes and bilirubin.",
          price: 599,
          originalPrice: 999,
          turnaroundTime: "12-24 hours",
          category: "blood",
          parameters: ["SGOT", "SGPT", "Total Bilirubin", "Direct Bilirubin", "Alkaline Phosphatase", "Total Protein", "Globulin", "Albumin"],
          homeCollection: true
        },
        {
          id: "kidney",
          name: "Kidney Function Test (KFT)",
          description: "Evaluates kidney health through creatinine, urea, and other markers.",
          price: 599,
          originalPrice: 999,
          turnaroundTime: "12-24 hours",
          category: "blood",
          parameters: ["Creatinine", "Urea", "Uric Acid", "BUN", "Calcium", "Phosphorus", "Potassium", "Sodium", "Chloride"],
          homeCollection: true
        },
        {
          id: "iron",
          name: "Iron (Serum)",
          description: "Measurement of iron levels in the blood.",
          price: 350,
          originalPrice: 550,
          turnaroundTime: "8-10 hours",
          category: "blood",
          parameters: ["Serum Iron"],
          homeCollection: true
        },
        {
          id: "ferritin",
          name: "Ferritin",
          description: "Measures the amount of iron stored in the body.",
          price: 500,
          originalPrice: 850,
          turnaroundTime: "8-10 hours",
          category: "blood",
          parameters: ["Ferritin"],
          homeCollection: true
        },
        {
          id: "crp-quant",
          name: "CRP Quantitative",
          description: "C-Reactive Protein test to measure general levels of inflammation in the body.",
          price: 450,
          originalPrice: 750,
          turnaroundTime: "6-8 hours",
          category: "specialized",
          parameters: ["CRP Quantitative"],
          homeCollection: true
        },
        {
          id: "ra-quant",
          name: "RA Quantitative",
          description: "Rheumatoid Factor quantitative test for autoimmune diagnosis.",
          price: 550,
          originalPrice: 900,
          turnaroundTime: "8-10 hours",
          category: "specialized",
          parameters: ["RA Factor"],
          homeCollection: true
        },
        {
          id: "ige",
          name: "IgE (Immunoglobulin E)",
          description: "Measures total IgE antibodies in the blood, indicating allergic response.",
          price: 650,
          originalPrice: 1050,
          turnaroundTime: "8-10 hours",
          category: "specialized",
          parameters: ["Total IgE"],
          homeCollection: true
        },
        {
          id: "ttg-iga",
          name: "tTG IgA",
          description: "Tissue Transglutaminase IgA, primary test for Celiac disease.",
          price: 800,
          originalPrice: 1300,
          turnaroundTime: "12-24 hours",
          category: "specialized",
          parameters: ["tTG IgA"],
          homeCollection: true
        },
        {
          id: "troponin-i",
          name: "Troponin I",
          description: "Cardiac marker test used to detect heart injury.",
          price: 850,
          originalPrice: 1400,
          turnaroundTime: "4-6 hours",
          category: "specialized",
          parameters: ["Troponin I"],
          homeCollection: true
        },
        {
          id: "troponin-t",
          name: "Troponin T",
          description: "Cardiac marker test for assessing heart muscle damage.",
          price: 850,
          originalPrice: 1400,
          turnaroundTime: "4-6 hours",
          category: "specialized",
          parameters: ["Troponin T"],
          homeCollection: true
        },
        {
          id: "ck-nac",
          name: "CK-NAC",
          description: "Creatine Kinase NAC to detect muscle damage.",
          price: 350,
          originalPrice: 600,
          turnaroundTime: "6-8 hours",
          category: "specialized",
          parameters: ["CK-NAC"],
          homeCollection: true
        },
        {
          id: "ck-mb",
          name: "CK-MB",
          description: "Creatine Kinase-MB test primarily for heart muscle damage.",
          price: 450,
          originalPrice: 750,
          turnaroundTime: "6-8 hours",
          category: "specialized",
          parameters: ["CK-MB"],
          homeCollection: true
        },
        {
          id: "urine-analysis",
          name: "Urine Analysis",
          description: "Routine examination of urine for various physical, chemical, and microscopic parameters.",
          price: 150,
          originalPrice: 250,
          turnaroundTime: "4-6 hours",
          category: "specialized",
          parameters: ["Physical", "Chemical", "Microscopic"],
          homeCollection: true
        },
        {
          id: "semen-analysis",
          name: "Semen Analysis",
          description: "Evaluation of male fertility and sperm health.",
          price: 600,
          originalPrice: 1e3,
          turnaroundTime: "12-24 hours",
          category: "specialized",
          parameters: ["Count", "Motility", "Morphology"],
          homeCollection: false
        }
      ];
      healthPackages = [
        {
          id: "sdl-1-3",
          name: "SDL 1.3 Profile",
          description: "Our most popular comprehensive health package covering essential diagnostic markers.",
          price: 4850,
          originalPrice: 6500,
          testsIncluded: [
            "Complete Blood Count (CBC)",
            "Liver Function Test (LFT)",
            "Kidney Function Test (KFT)",
            "Lipid Profile",
            "Thyroid Profile (T3, T4, TSH)",
            "HbA1c",
            "Vitamin D3 & B12"
          ],
          recommended: true
        },
        {
          id: "sdl-1-1",
          name: "SDL 1.1 Profile",
          description: "Core baseline tests for routine health monitoring.",
          price: 2350,
          originalPrice: 3500,
          testsIncluded: [
            "Complete Blood Count (CBC)",
            "Urine Analysis",
            "Liver Function Test (LFT)",
            "Kidney Function Test (KFT)",
            "Lipid Profile"
          ],
          recommended: false
        },
        {
          id: "male-gh-profile",
          name: "Male GH Profile",
          description: "Targeted assessment for male health and vitality.",
          price: 4499,
          originalPrice: 6e3,
          testsIncluded: [
            "Testosterone Total",
            "Free Testosterone",
            "Thyroid Profile (T3, T4, TSH)",
            "Complete Blood Count (CBC)",
            "Lipid Profile"
          ],
          recommended: false
        },
        {
          id: "sdl-1-2",
          name: "SDL 1.2 Profile",
          description: "Advanced baseline profile including vital hormone checks.",
          price: 2850,
          originalPrice: 4e3,
          testsIncluded: [
            "Complete Blood Count (CBC)",
            "Thyroid Profile (T3, T4, TSH)",
            "Liver Function Test (LFT)",
            "Kidney Function Test (KFT)"
          ],
          recommended: false
        },
        {
          id: "female-hormone",
          name: "Female Hormone & Fertility",
          description: "Comprehensive hormonal assessment for women.",
          price: 2199,
          originalPrice: 4299,
          testsIncluded: [
            "Thyroid Profile (T3, T4, TSH)",
            "FSH",
            "LH",
            "Prolactin (PRL)",
            "AMH",
            "Beta HCG"
          ],
          recommended: false
        },
        {
          id: "arthritis-immunology",
          name: "Arthritis & Inflammation",
          description: "Key markers to identify inflammation and autoimmune conditions.",
          price: 1299,
          originalPrice: 2499,
          testsIncluded: [
            "Complete Blood Count (CBC)",
            "ESR",
            "CRP Quantitative",
            "RA Quantitative",
            "IgE (Immunoglobulin E)"
          ],
          recommended: false
        }
      ];
      categories = [
        { id: "all", name: "All Tests" },
        { id: "blood", name: "Blood Tests" },
        { id: "hormone", name: "Hormone Tests" },
        { id: "specialized", name: "Specialized Tests" }
      ];
    }
  });

  // src/lib/cms-client.ts
  var STORAGE_KEY_TESTS, STORAGE_KEY_PACKAGES, STORAGE_KEY_CONFIG, CMSClient;
  var init_cms_client = __esm({
    "src/lib/cms-client.ts"() {
      init_mockTests();
      STORAGE_KEY_TESTS = "sawariya_cms_tests_v1";
      STORAGE_KEY_PACKAGES = "sawariya_cms_packages_v1";
      STORAGE_KEY_CONFIG = "sawariya_cms_config_v1";
      CMSClient = {
        /**
         * Get current CMS Configuration
         */
        getConfig: () => {
          try {
            const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
            if (saved) return JSON.parse(saved);
          } catch (e) {
            console.warn("Could not read CMS config from localStorage", e);
          }
          return {
            provider: "local",
            projectId: "sawariya-diagnostics-cms",
            dataset: "production",
            webhookUrl: "https://api.github.com/repos/Sawariya-Diagnostic/Sawariya-Diagnostic/dispatches"
          };
        },
        /**
         * Save CMS Config
         */
        saveConfig: (config) => {
          localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
        },
        /**
         * Fetch all tests from active CMS (or local cached state / defaults)
         */
        getTests: () => {
          try {
            const saved = localStorage.getItem(STORAGE_KEY_TESTS);
            if (saved) {
              return JSON.parse(saved);
            }
          } catch (e) {
            console.error("Failed to parse cached CMS tests", e);
          }
          return medicalTests;
        },
        /**
         * Fetch all health packages
         */
        getPackages: () => {
          try {
            const saved = localStorage.getItem(STORAGE_KEY_PACKAGES);
            if (saved) {
              return JSON.parse(saved);
            }
          } catch (e) {
            console.error("Failed to parse cached CMS packages", e);
          }
          return healthPackages;
        },
        /**
         * Save or update a test in the CMS catalog
         */
        saveTest: (test) => {
          const tests = CMSClient.getTests();
          const existingIndex = tests.findIndex((t) => t.id === test.id);
          let updated;
          if (existingIndex >= 0) {
            updated = [...tests];
            updated[existingIndex] = test;
          } else {
            updated = [test, ...tests];
          }
          localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(updated));
          return updated;
        },
        /**
         * Delete a test
         */
        deleteTest: (testId) => {
          const tests = CMSClient.getTests();
          const updated = tests.filter((t) => t.id !== testId);
          localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(updated));
          return updated;
        },
        /**
         * Save or update a package
         */
        savePackage: (pkg) => {
          const packages = CMSClient.getPackages();
          const existingIndex = packages.findIndex((p) => p.id === pkg.id);
          let updated;
          if (existingIndex >= 0) {
            updated = [...packages];
            updated[existingIndex] = pkg;
          } else {
            updated = [pkg, ...packages];
          }
          localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(updated));
          return updated;
        },
        /**
         * Trigger GitHub Actions Webhook (repository_dispatch event)
         * This triggers the SSG rebuild workflow when staff changes content in CMS!
         */
        triggerRebuildWebhook: async (token) => {
          const config = CMSClient.getConfig();
          if (token && config.webhookUrl) {
            try {
              const res = await fetch(config.webhookUrl, {
                method: "POST",
                headers: {
                  "Accept": "application/vnd.github.v3+json",
                  "Authorization": `token ${token}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  event_type: "cms_content_update",
                  client_payload: {
                    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                    source: "Staff CMS Editor"
                  }
                })
              });
              if (res.ok || res.status === 204) {
                return {
                  success: true,
                  message: "GitHub Actions deployment triggered successfully! Static pages are rebuilding."
                };
              }
            } catch (err) {
              console.error("GitHub Actions webhook call error", err);
            }
          }
          await new Promise((r2) => setTimeout(r2, 900));
          return {
            success: true,
            message: "Simulated Webhook dispatched: GitHub Actions workflow triggered (event: cms_content_update). Changes will be published to GitHub Pages!"
          };
        },
        /**
         * Reset CMS catalog back to original laboratory defaults
         */
        resetToDefaults: () => {
          localStorage.removeItem(STORAGE_KEY_TESTS);
          localStorage.removeItem(STORAGE_KEY_PACKAGES);
        }
      };
    }
  });

  // node_modules/fuse.js/dist/fuse.mjs
  function isArray(value) {
    return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
  }
  function baseToString(value) {
    if (typeof value == "string") return value;
    if (typeof value === "bigint") return value.toString();
    const result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isNumber2(value) {
    return typeof value === "number";
  }
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
  }
  function isObject(value) {
    return typeof value === "object";
  }
  function isObjectLike(value) {
    return isObject(value) && value !== null;
  }
  function isDefined(value) {
    return value !== void 0 && value !== null;
  }
  function isBlank(value) {
    return !value.trim().length;
  }
  function getTag(value) {
    return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
  }
  function createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
    let getFn = null;
    if (isString(key) || isArray(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
      const name = key.name;
      src = name;
      if (hasOwn.call(key, "weight") && key.weight !== void 0) {
        weight = key.weight;
        if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(createKeyId(name)));
      }
      path = createKeyPath(name);
      id = createKeyId(name);
      getFn = key.getFn ?? null;
    }
    return {
      path,
      id,
      weight,
      src,
      getFn
    };
  }
  function createKeyPath(key) {
    return isArray(key) ? key : key.split(".");
  }
  function createKeyId(key) {
    return isArray(key) ? key.join(".") : key;
  }
  function get(obj, path) {
    const list = [];
    let arr = false;
    const deepGet = (obj2, path2, index, arrayIndex) => {
      if (!isDefined(obj2)) return;
      if (!path2[index]) list.push(arrayIndex !== void 0 ? {
        v: obj2,
        i: arrayIndex
      } : obj2);
      else {
        const value = obj2[path2[index]];
        if (!isDefined(value)) return;
        if (index === path2.length - 1 && (isString(value) || isNumber2(value) || isBoolean(value) || typeof value === "bigint")) list.push(arrayIndex !== void 0 ? {
          v: toString(value),
          i: arrayIndex
        } : toString(value));
        else if (isArray(value)) {
          arr = true;
          for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path2, index + 1, i);
        } else if (path2.length) deepGet(value, path2, index + 1, arrayIndex);
      }
    };
    deepGet(obj, isString(path) ? path.split(".") : path, 0);
    return arr ? list : list[0];
  }
  function isWordSeparator(code) {
    return code >= 9 && code <= 13 || code === 32 || code === 160;
  }
  function norm(weight = 1, mantissa = 3) {
    const cache = /* @__PURE__ */ new Map();
    const m = Math.pow(10, mantissa);
    return {
      get(value) {
        let numTokens = 0;
        let inWord = false;
        for (let i = 0; i < value.length; i++) if (!isWordSeparator(value.charCodeAt(i))) {
          if (!inWord) {
            numTokens++;
            inWord = true;
          }
        } else inWord = false;
        if (numTokens === 0) numTokens = 1;
        if (cache.has(numTokens)) return cache.get(numTokens);
        const n = Math.round(m / Math.pow(numTokens, 0.5 * weight)) / m;
        cache.set(numTokens, n);
        return n;
      },
      clear() {
        cache.clear();
      }
    };
  }
  function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
  }
  function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
    const { keys, records } = data;
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
  }
  function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
    const indices = [];
    let start = -1;
    let end = -1;
    let i = 0;
    for (let len = matchmask.length; i < len; i += 1) {
      const match = matchmask[i];
      if (match && start === -1) start = i;
      else if (!match && start !== -1) {
        end = i - 1;
        if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
        start = -1;
      }
    }
    if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
    return indices;
  }
  function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
    if (pattern.length > 32) throw new Error(PATTERN_LENGTH_TOO_LARGE(32));
    const patternLen = pattern.length;
    const textLen = text.length;
    const expectedLocation = Math.max(0, Math.min(location, textLen));
    let currentThreshold = threshold;
    let bestLocation = expectedLocation;
    const calcScore = (errors, currentLocation) => {
      const accuracy = errors / patternLen;
      if (ignoreLocation) return accuracy;
      const proximity = Math.abs(expectedLocation - currentLocation);
      if (!distance) return proximity ? 1 : accuracy;
      return accuracy + proximity / distance;
    };
    const computeMatches = minMatchCharLength > 1 || includeMatches;
    const matchMask = computeMatches ? Array(textLen) : [];
    let index;
    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      const score = calcScore(0, index);
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;
      if (computeMatches) {
        let i = 0;
        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    }
    bestLocation = -1;
    let lastBitArr = [];
    let finalScore = 1;
    let bestErrors = 0;
    let binMax = patternLen + textLen;
    const mask = 1 << patternLen - 1;
    for (let i = 0; i < patternLen; i += 1) {
      let binMin = 0;
      let binMid = binMax;
      while (binMin < binMid) {
        if (calcScore(i, expectedLocation + binMid) <= currentThreshold) binMin = binMid;
        else binMax = binMid;
        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      }
      binMax = binMid;
      let start = Math.max(1, expectedLocation - binMid + 1);
      const finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
      const bitArr = Array(finish + 2);
      bitArr[finish + 1] = (1 << i) - 1;
      for (let j = finish; j >= start; j -= 1) {
        const currentLocation = j - 1;
        const charMatch = patternAlphabet[text[currentLocation]];
        bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
        if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
        if (bitArr[j] & mask) {
          finalScore = calcScore(i, currentLocation);
          if (finalScore <= currentThreshold) {
            currentThreshold = finalScore;
            bestLocation = currentLocation;
            bestErrors = i;
            if (bestLocation <= expectedLocation) break;
            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      }
      if (calcScore(i + 1, expectedLocation) > currentThreshold) break;
      lastBitArr = bitArr;
    }
    if (computeMatches && bestLocation >= 0) {
      const matchEnd = Math.min(textLen - 1, bestLocation + patternLen - 1 + bestErrors);
      for (let k = bestLocation; k <= matchEnd; k += 1) if (patternAlphabet[text[k]]) matchMask[k] = 1;
    }
    const result = {
      isMatch: bestLocation >= 0,
      score: Math.max(1e-3, finalScore)
    };
    if (computeMatches) {
      const indices = convertMaskToIndices(matchMask, minMatchCharLength);
      if (!indices.length) result.isMatch = false;
      else if (includeMatches) result.indices = indices;
    }
    return result;
  }
  function createPatternAlphabet(pattern) {
    const mask = {};
    for (let i = 0, len = pattern.length; i < len; i += 1) {
      const char = pattern.charAt(i);
      mask[char] = (mask[char] || 0) | 1 << len - i - 1;
    }
    return mask;
  }
  function mergeIndices(indices) {
    if (indices.length <= 1) return indices;
    indices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const merged = [indices[0]];
    for (let i = 1, len = indices.length; i < len; i += 1) {
      const last = merged[merged.length - 1];
      const curr = indices[i];
      if (curr[0] <= last[1] + 1) last[1] = Math.max(last[1], curr[1]);
      else merged.push(curr);
    }
    return merged;
  }
  function isInverse(type) {
    return type.startsWith("inverse");
  }
  function tokenize(pattern) {
    const tokens = [];
    const len = pattern.length;
    let i = 0;
    while (i < len) {
      while (i < len && pattern[i] === " ") i++;
      if (i >= len) break;
      let j = i;
      while (j < len && pattern[j] !== " " && pattern[j] !== '"') j++;
      if (j < len && pattern[j] === '"') {
        j++;
        while (j < len) {
          if (pattern[j] === '"') {
            const next = j + 1;
            if (next >= len || pattern[next] === " ") {
              j++;
              break;
            }
            if (pattern[next] === "$" && (next + 1 >= len || pattern[next + 1] === " ")) {
              j += 2;
              break;
            }
          }
          j++;
        }
        tokens.push(pattern.substring(i, j));
        i = j;
      } else {
        while (j < len && pattern[j] !== " ") j++;
        tokens.push(pattern.substring(i, j));
        i = j;
      }
    }
    return tokens;
  }
  function getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null;
  }
  function parseQuery(pattern, options = {}) {
    return pattern.replace(/\\\|/g, ESCAPED_PIPE).split(OR_TOKEN).map((item) => {
      const query = tokenize(item.replace(/\u0000/g, "|").trim()).filter((item2) => item2 && !!item2.trim());
      const results = [];
      for (let i = 0, len = query.length; i < len; i += 1) {
        const queryItem = query[i];
        let found = false;
        let idx = -1;
        while (!found && ++idx < matchersLen) {
          const def = matchers[idx];
          const token = getMatch(queryItem, def.multiRegex);
          if (token) {
            results.push(def.create(token, options));
            found = true;
          }
        }
        if (found) continue;
        idx = -1;
        while (++idx < matchersLen) {
          const def = matchers[idx];
          const token = getMatch(queryItem, def.singleRegex);
          if (token) {
            results.push(def.create(token, options));
            break;
          }
        }
      }
      return results;
    });
  }
  function register(...args) {
    registeredSearchers.push(...args);
  }
  function createSearcher(pattern, options) {
    for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
      const searcherClass = registeredSearchers[i];
      if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
    }
    return new BitapSearch(pattern, options);
  }
  function parse(query, options, { auto = true } = {}) {
    const next = (query2) => {
      if (isString(query2)) {
        const obj = {
          keyId: null,
          pattern: query2
        };
        if (auto) obj.searcher = createSearcher(query2, options);
        return obj;
      }
      const keys = Object.keys(query2);
      const isQueryPath = isPath(query2);
      if (!isQueryPath && keys.length > 1 && !isExpression(query2)) return next(convertToExplicit(query2));
      if (isLeaf(query2)) {
        const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
        const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
        if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
        const obj = {
          keyId: createKeyId(key),
          pattern
        };
        if (auto) obj.searcher = createSearcher(pattern, options);
        return obj;
      }
      const node = {
        children: [],
        operator: keys[0]
      };
      keys.forEach((key) => {
        const value = query2[key];
        if (isArray(value)) value.forEach((item) => {
          node.children.push(next(item));
        });
      });
      return node;
    };
    if (!isExpression(query)) query = convertToExplicit(query);
    return next(query);
  }
  function computeScoreSingle(matches, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
    let totalScore = 1;
    matches.forEach(({ key, norm: norm2, score }) => {
      const weight = key ? key.weight : null;
      totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
    });
    return totalScore;
  }
  function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
    results.forEach((result) => {
      result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
    });
  }
  function formatMatches(result) {
    const matches = [];
    result.matches.forEach((match) => {
      if (!isDefined(match.indices) || !match.indices.length) return;
      const obj = {
        indices: match.indices,
        value: match.value
      };
      if (match.key) obj.key = match.key.id;
      if (match.idx > -1) obj.refIndex = match.idx;
      matches.push(obj);
    });
    return matches;
  }
  function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
    return results.map((result) => {
      const { idx } = result;
      const data = {
        item: docs[idx],
        refIndex: idx
      };
      if (includeMatches) data.matches = formatMatches(result);
      if (includeScore) data.score = result.score;
      return data;
    });
  }
  function warnNonGlobal(regex) {
    if (!warned.has(regex)) {
      warned.add(regex);
      console.warn(`[Fuse] tokenize regex ${regex} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`);
    }
  }
  function resolveTokenize(tokenize2) {
    if (typeof tokenize2 === "function") {
      let validated = false;
      return (text) => {
        const result = tokenize2(text);
        if (!validated) {
          validated = true;
          if (!Array.isArray(result) || result.some((t) => typeof t !== "string")) throw new Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(result) ? "array containing non-strings" : typeof result}.`);
        }
        return result;
      };
    }
    if (tokenize2 instanceof RegExp) {
      if (!tokenize2.global) warnNonGlobal(tokenize2);
      return (text) => text.match(tokenize2) || [];
    }
    return (text) => text.match(DEFAULT_TOKEN) || [];
  }
  function createAnalyzer({ isCaseSensitive = false, ignoreDiacritics = false, tokenize: tokenize2 } = {}) {
    const tokenizeFn = resolveTokenize(tokenize2);
    return { tokenize(text) {
      if (!isCaseSensitive) text = text.toLowerCase();
      if (ignoreDiacritics) text = stripDiacritics(text);
      return tokenizeFn(text);
    } };
  }
  function addField(index, text, docIdx, analyzer) {
    const tokens = analyzer.tokenize(text);
    if (!tokens.length) return;
    index.fieldCount++;
    index.docFieldCount.set(docIdx, (index.docFieldCount.get(docIdx) || 0) + 1);
    const distinctTerms = new Set(tokens);
    let perDocTerms = index.docTermFieldHits.get(docIdx);
    if (!perDocTerms) {
      perDocTerms = /* @__PURE__ */ new Map();
      index.docTermFieldHits.set(docIdx, perDocTerms);
    }
    for (const term of distinctTerms) {
      perDocTerms.set(term, (perDocTerms.get(term) || 0) + 1);
      index.df.set(term, (index.df.get(term) || 0) + 1);
    }
  }
  function ingestRecord(index, record, keyCount, analyzer) {
    const { i: docIdx, v, $: fields } = record;
    if (v !== void 0) {
      addField(index, v, docIdx, analyzer);
      return;
    }
    if (!fields) return;
    for (let keyIdx = 0; keyIdx < keyCount; keyIdx++) {
      const value = fields[keyIdx];
      if (!value) continue;
      if (Array.isArray(value)) for (const sub of value) addField(index, sub.v, docIdx, analyzer);
      else addField(index, value.v, docIdx, analyzer);
    }
  }
  function buildInvertedIndex(records, keyCount, analyzer) {
    const index = {
      fieldCount: 0,
      df: /* @__PURE__ */ new Map(),
      docFieldCount: /* @__PURE__ */ new Map(),
      docTermFieldHits: /* @__PURE__ */ new Map()
    };
    for (const record of records) ingestRecord(index, record, keyCount, analyzer);
    return index;
  }
  function addToInvertedIndex(index, record, keyCount, analyzer) {
    ingestRecord(index, record, keyCount, analyzer);
  }
  function removeFromInvertedIndex(index, docIdx) {
    const fieldCount = index.docFieldCount.get(docIdx);
    if (fieldCount === void 0) return;
    index.fieldCount -= fieldCount;
    index.docFieldCount.delete(docIdx);
    const perDocTerms = index.docTermFieldHits.get(docIdx);
    if (!perDocTerms) return;
    for (const [term, hits] of perDocTerms) {
      const next = (index.df.get(term) || 0) - hits;
      if (next <= 0) index.df.delete(term);
      else index.df.set(term, next);
    }
    index.docTermFieldHits.delete(docIdx);
  }
  function removeAndShiftInvertedIndex(index, removedIndices) {
    if (removedIndices.length === 0) return;
    const sorted = Array.from(new Set(removedIndices)).sort((a, b) => a - b);
    for (const idx of sorted) removeFromInvertedIndex(index, idx);
    const shift = (oldIdx) => {
      let lo = 0;
      let hi = sorted.length;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (sorted[mid] < oldIdx) lo = mid + 1;
        else hi = mid;
      }
      return oldIdx - lo;
    };
    const firstRemoved = sorted[0];
    const shiftedDocFieldCount = /* @__PURE__ */ new Map();
    for (const [oldKey, count] of index.docFieldCount) shiftedDocFieldCount.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, count);
    index.docFieldCount = shiftedDocFieldCount;
    const shiftedDocTermFieldHits = /* @__PURE__ */ new Map();
    for (const [oldKey, terms] of index.docTermFieldHits) shiftedDocTermFieldHits.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, terms);
    index.docTermFieldHits = shiftedDocTermFieldHits;
  }
  var INCORRECT_INDEX_TYPE, INVALID_DOC_INDEX, LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY, PATTERN_LENGTH_TOO_LARGE, MISSING_KEY_PROPERTY, INVALID_KEY_WEIGHT_VALUE, FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED, hasOwn, KeyStore, MatchOptions, BasicOptions, FuzzyOptions, AdvancedOptions, Config, FuseIndex, NON_DECOMPOSABLE_MAP, NON_DECOMPOSABLE_RE, stripDiacritics, BitapSearch, MULTI_MATCH_TYPES, matchers, matchersLen, ESCAPED_PIPE, OR_TOKEN, ExtendedSearch, registeredSearchers, LogicalOperator, KeyType, isExpression, isPath, isLeaf, convertToExplicit, MaxHeap, DEFAULT_TOKEN, warned, TokenSearch, Fuse, entry_default;
  var init_fuse = __esm({
    "node_modules/fuse.js/dist/fuse.mjs"() {
      INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
      INVALID_DOC_INDEX = "Invalid doc index: must be a non-negative integer within the bounds of the docs array";
      LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
      PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
      MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
      INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
      FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED = "Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.";
      hasOwn = Object.prototype.hasOwnProperty;
      KeyStore = class {
        constructor(keys) {
          this._keys = [];
          this._keyMap = {};
          let totalWeight = 0;
          keys.forEach((key) => {
            const obj = createKey(key);
            this._keys.push(obj);
            this._keyMap[obj.id] = obj;
            totalWeight += obj.weight;
          });
          this._keys.forEach((key) => {
            key.weight /= totalWeight;
          });
        }
        get(keyId) {
          return this._keyMap[keyId];
        }
        keys() {
          return this._keys;
        }
        toJSON() {
          return JSON.stringify(this._keys);
        }
      };
      MatchOptions = {
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1
      };
      BasicOptions = {
        isCaseSensitive: false,
        ignoreDiacritics: false,
        includeScore: false,
        keys: [],
        shouldSort: true,
        sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
      };
      FuzzyOptions = {
        location: 0,
        threshold: 0.6,
        distance: 100
      };
      AdvancedOptions = {
        useExtendedSearch: false,
        useTokenSearch: false,
        tokenize: void 0,
        tokenMatch: "any",
        getFn: get,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1
      };
      Config = Object.freeze({
        ...BasicOptions,
        ...MatchOptions,
        ...FuzzyOptions,
        ...AdvancedOptions
      });
      FuseIndex = class {
        constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
          this.norm = norm(fieldNormWeight, 3);
          this.getFn = getFn;
          this.isCreated = false;
          this.docs = [];
          this.keys = [];
          this._keysMap = {};
          this.setIndexRecords();
        }
        setSources(docs = []) {
          this.docs = docs;
        }
        setIndexRecords(records = []) {
          this.records = records;
        }
        setKeys(keys = []) {
          this.keys = keys;
          this._keysMap = {};
          keys.forEach((key, idx) => {
            this._keysMap[key.id] = idx;
          });
        }
        create() {
          if (this.isCreated || !this.docs.length) return;
          this.isCreated = true;
          const len = this.docs.length;
          this.records = new Array(len);
          let recordCount = 0;
          if (isString(this.docs[0])) for (let i = 0; i < len; i++) {
            const record = this._createStringRecord(this.docs[i], i);
            if (record) this.records[recordCount++] = record;
          }
          else for (let i = 0; i < len; i++) this.records[recordCount++] = this._createObjectRecord(this.docs[i], i);
          this.records.length = recordCount;
          this.norm.clear();
        }
        add(doc, docIndex) {
          if (!Number.isInteger(docIndex) || docIndex < 0) throw new Error(INVALID_DOC_INDEX);
          if (isString(doc)) {
            const record2 = this._createStringRecord(doc, docIndex);
            if (record2) this.records.push(record2);
            return record2;
          }
          const record = this._createObjectRecord(doc, docIndex);
          this.records.push(record);
          return record;
        }
        removeAt(idx) {
          if (!Number.isInteger(idx) || idx < 0) throw new Error(INVALID_DOC_INDEX);
          for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i === idx) {
            this.records.splice(i, 1);
            break;
          }
          for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i > idx) this.records[i].i -= 1;
        }
        removeAll(indices) {
          const toRemove = /* @__PURE__ */ new Set();
          for (const v of indices) if (Number.isInteger(v) && v >= 0) toRemove.add(v);
          if (toRemove.size === 0) return;
          this.records = this.records.filter((r2) => !toRemove.has(r2.i));
          const sorted = Array.from(toRemove).sort((a, b) => a - b);
          for (const record of this.records) {
            let lo = 0;
            let hi = sorted.length;
            while (lo < hi) {
              const mid = lo + hi >>> 1;
              if (sorted[mid] < record.i) lo = mid + 1;
              else hi = mid;
            }
            record.i -= lo;
          }
        }
        getValueForItemAtKeyId(item, keyId) {
          return item[this._keysMap[keyId]];
        }
        size() {
          return this.records.length;
        }
        _createStringRecord(doc, docIndex) {
          if (!isDefined(doc) || isBlank(doc)) return null;
          return {
            v: doc,
            i: docIndex,
            n: this.norm.get(doc)
          };
        }
        _createObjectRecord(doc, docIndex) {
          const record = {
            i: docIndex,
            $: {}
          };
          for (let keyIndex = 0, keyLen = this.keys.length; keyIndex < keyLen; keyIndex++) {
            const key = this.keys[keyIndex];
            const value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
            if (!isDefined(value)) continue;
            if (isArray(value)) {
              const subRecords = [];
              for (let i = 0, len = value.length; i < len; i += 1) {
                const item = value[i];
                if (!isDefined(item)) continue;
                if (isString(item)) {
                  if (!isBlank(item)) {
                    const subRecord = {
                      v: item,
                      i,
                      n: this.norm.get(item)
                    };
                    subRecords.push(subRecord);
                  }
                } else if (isDefined(item.v)) {
                  const text = isString(item.v) ? item.v : toString(item.v);
                  if (!isBlank(text)) {
                    const subRecord = {
                      v: text,
                      i: item.i,
                      n: this.norm.get(text)
                    };
                    subRecords.push(subRecord);
                  }
                }
              }
              record.$[keyIndex] = subRecords;
            } else if (isString(value) && !isBlank(value)) {
              const subRecord = {
                v: value,
                n: this.norm.get(value)
              };
              record.$[keyIndex] = subRecord;
            }
          }
          return record;
        }
        toJSON() {
          return {
            keys: this.keys.map(({ getFn, ...key }) => key),
            records: this.records
          };
        }
      };
      NON_DECOMPOSABLE_MAP = {
        "\u0142": "l",
        "\u0141": "L",
        "\u0111": "d",
        "\u0110": "D",
        "\xF8": "o",
        "\xD8": "O",
        "\u0127": "h",
        "\u0126": "H",
        "\u0167": "t",
        "\u0166": "T",
        "\u0131": "i",
        "\xDF": "ss"
      };
      NON_DECOMPOSABLE_RE = new RegExp("[" + Object.keys(NON_DECOMPOSABLE_MAP).join("") + "]", "g");
      stripDiacritics = typeof String.prototype.normalize === "function" ? (str) => str.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(NON_DECOMPOSABLE_RE, (ch) => NON_DECOMPOSABLE_MAP[ch]) : (str) => str;
      BitapSearch = class {
        constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, ignoreLocation = Config.ignoreLocation } = {}) {
          this.options = {
            location,
            threshold,
            distance,
            includeMatches,
            findAllMatches,
            minMatchCharLength,
            isCaseSensitive,
            ignoreDiacritics,
            ignoreLocation
          };
          pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
          pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
          this.pattern = pattern;
          this.chunks = [];
          if (!this.pattern.length) return;
          const addChunk = (pattern2, startIndex) => {
            this.chunks.push({
              pattern: pattern2,
              alphabet: createPatternAlphabet(pattern2),
              startIndex
            });
          };
          const len = this.pattern.length;
          if (len > 32) {
            let i = 0;
            const remainder = len % 32;
            const end = len - remainder;
            while (i < end) {
              addChunk(this.pattern.substr(i, 32), i);
              i += 32;
            }
            if (remainder) {
              const startIndex = len - 32;
              addChunk(this.pattern.substr(startIndex), startIndex);
            }
          } else addChunk(this.pattern, 0);
        }
        searchIn(text) {
          const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;
          text = isCaseSensitive ? text : text.toLowerCase();
          text = ignoreDiacritics ? stripDiacritics(text) : text;
          if (this.pattern === text) {
            if (text.length < this.options.minMatchCharLength) return {
              isMatch: false,
              score: 1
            };
            const result2 = {
              isMatch: true,
              score: 0
            };
            if (includeMatches) result2.indices = [[0, text.length - 1]];
            return result2;
          }
          const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
          const allIndices = [];
          let totalScore = 0;
          let hasMatches = false;
          this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
            const { isMatch, score, indices } = search(text, pattern, alphabet, {
              location: location + startIndex,
              distance,
              threshold,
              findAllMatches,
              minMatchCharLength,
              includeMatches,
              ignoreLocation
            });
            if (isMatch) hasMatches = true;
            totalScore += score;
            if (isMatch && indices) allIndices.push(...indices);
          });
          const result = {
            isMatch: hasMatches,
            score: hasMatches ? totalScore / this.chunks.length : 1
          };
          if (hasMatches && includeMatches) result.indices = mergeIndices(allIndices);
          return result;
        }
      };
      MULTI_MATCH_TYPES = /* @__PURE__ */ new Set(["fuzzy", "include"]);
      matchers = [
        {
          type: "exact",
          multiRegex: /^="(.*)"$/,
          singleRegex: /^=(.*)$/,
          create: (pattern) => ({
            type: "exact",
            search(text) {
              const isMatch = text === pattern;
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [0, pattern.length - 1]
              };
            }
          })
        },
        {
          type: "include",
          multiRegex: /^'"(.*)"$/,
          singleRegex: /^'(.*)$/,
          create: (pattern) => ({
            type: "include",
            search(text) {
              let location = 0;
              let index;
              const indices = [];
              const patternLen = pattern.length;
              while ((index = text.indexOf(pattern, location)) > -1) {
                location = index + patternLen;
                indices.push([index, location - 1]);
              }
              const isMatch = !!indices.length;
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices
              };
            }
          })
        },
        {
          type: "prefix-exact",
          multiRegex: /^\^"(.*)"$/,
          singleRegex: /^\^(.*)$/,
          create: (pattern) => ({
            type: "prefix-exact",
            search(text) {
              const isMatch = text.startsWith(pattern);
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [0, pattern.length - 1]
              };
            }
          })
        },
        {
          type: "inverse-prefix-exact",
          multiRegex: /^!\^"(.*)"$/,
          singleRegex: /^!\^(.*)$/,
          create: (pattern) => ({
            type: "inverse-prefix-exact",
            search(text) {
              const isMatch = !text.startsWith(pattern);
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [0, text.length - 1]
              };
            }
          })
        },
        {
          type: "inverse-suffix-exact",
          multiRegex: /^!"(.*)"\$$/,
          singleRegex: /^!(.*)\$$/,
          create: (pattern) => ({
            type: "inverse-suffix-exact",
            search(text) {
              const isMatch = !text.endsWith(pattern);
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [0, text.length - 1]
              };
            }
          })
        },
        {
          type: "suffix-exact",
          multiRegex: /^"(.*)"\$$/,
          singleRegex: /^(.*)\$$/,
          create: (pattern) => ({
            type: "suffix-exact",
            search(text) {
              const isMatch = text.endsWith(pattern);
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [text.length - pattern.length, text.length - 1]
              };
            }
          })
        },
        {
          type: "inverse-exact",
          multiRegex: /^!"(.*)"$/,
          singleRegex: /^!(.*)$/,
          create: (pattern) => ({
            type: "inverse-exact",
            search(text) {
              const isMatch = text.indexOf(pattern) === -1;
              return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [0, text.length - 1]
              };
            }
          })
        },
        {
          type: "fuzzy",
          multiRegex: /^"(.*)"$/,
          singleRegex: /^(.*)$/,
          create: (pattern, options = {}) => {
            const bitap = new BitapSearch(pattern, {
              location: options.location ?? Config.location,
              threshold: options.threshold ?? Config.threshold,
              distance: options.distance ?? Config.distance,
              includeMatches: options.includeMatches ?? Config.includeMatches,
              findAllMatches: options.findAllMatches ?? Config.findAllMatches,
              minMatchCharLength: options.minMatchCharLength ?? Config.minMatchCharLength,
              isCaseSensitive: options.isCaseSensitive ?? Config.isCaseSensitive,
              ignoreDiacritics: options.ignoreDiacritics ?? Config.ignoreDiacritics,
              ignoreLocation: options.ignoreLocation ?? Config.ignoreLocation
            });
            return {
              type: "fuzzy",
              search(text) {
                return bitap.searchIn(text);
              }
            };
          }
        }
      ];
      matchersLen = matchers.length;
      ESCAPED_PIPE = "\0";
      OR_TOKEN = "|";
      ExtendedSearch = class {
        constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
          this.query = null;
          this.options = {
            isCaseSensitive,
            ignoreDiacritics,
            includeMatches,
            minMatchCharLength,
            findAllMatches,
            ignoreLocation,
            location,
            threshold,
            distance
          };
          pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
          pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
          this.pattern = pattern;
          this.query = parseQuery(this.pattern, this.options);
        }
        static condition(_, options) {
          return options.useExtendedSearch;
        }
        searchIn(text) {
          const query = this.query;
          if (!query) return {
            isMatch: false,
            score: 1
          };
          const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;
          text = isCaseSensitive ? text : text.toLowerCase();
          text = ignoreDiacritics ? stripDiacritics(text) : text;
          let numMatches = 0;
          const allIndices = [];
          let totalScore = 0;
          let hasInverse = false;
          for (let i = 0, qLen = query.length; i < qLen; i += 1) {
            const searchers = query[i];
            allIndices.length = 0;
            numMatches = 0;
            hasInverse = false;
            for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
              const matcher = searchers[j];
              const { isMatch, indices, score } = matcher.search(text);
              if (isMatch) {
                numMatches += 1;
                totalScore += score;
                if (isInverse(matcher.type)) hasInverse = true;
                if (includeMatches) if (MULTI_MATCH_TYPES.has(matcher.type)) allIndices.push(...indices);
                else allIndices.push(indices);
              } else {
                totalScore = 0;
                numMatches = 0;
                allIndices.length = 0;
                hasInverse = false;
                break;
              }
            }
            if (numMatches) {
              const result = {
                isMatch: true,
                score: totalScore / numMatches
              };
              if (hasInverse) result.hasInverse = true;
              if (includeMatches) result.indices = mergeIndices(allIndices);
              return result;
            }
          }
          return {
            isMatch: false,
            score: 1
          };
        }
      };
      registeredSearchers = [];
      LogicalOperator = {
        AND: "$and",
        OR: "$or"
      };
      KeyType = {
        PATH: "$path",
        PATTERN: "$val"
      };
      isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
      isPath = (query) => !!query[KeyType.PATH];
      isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
      convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
      MaxHeap = class {
        constructor(limit, comparator) {
          this.limit = limit;
          this.heap = [];
          this.comparator = comparator;
        }
        get size() {
          return this.heap.length;
        }
        insert(item) {
          if (this.size < this.limit) {
            this.heap.push(item);
            this._bubbleUp(this.size - 1);
          } else if (this.comparator(item, this.heap[0]) < 0) {
            this.heap[0] = item;
            this._sinkDown(0);
          }
        }
        extractSorted() {
          return this.heap.sort(this.comparator);
        }
        _bubbleUp(i) {
          const heap = this.heap;
          while (i > 0) {
            const parent = i - 1 >> 1;
            if (this.comparator(heap[i], heap[parent]) <= 0) break;
            const tmp = heap[i];
            heap[i] = heap[parent];
            heap[parent] = tmp;
            i = parent;
          }
        }
        _sinkDown(i) {
          const heap = this.heap;
          const len = heap.length;
          let largest = i;
          do {
            i = largest;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < len && this.comparator(heap[left], heap[largest]) > 0) largest = left;
            if (right < len && this.comparator(heap[right], heap[largest]) > 0) largest = right;
            if (largest !== i) {
              const tmp = heap[i];
              heap[i] = heap[largest];
              heap[largest] = tmp;
            }
          } while (largest !== i);
        }
      };
      DEFAULT_TOKEN = /[\p{L}\p{M}\p{N}_]+/gu;
      warned = /* @__PURE__ */ new WeakSet();
      TokenSearch = class {
        static condition(_, options) {
          return options.useTokenSearch;
        }
        constructor(pattern, options) {
          this.options = options;
          this.analyzer = createAnalyzer({
            isCaseSensitive: options.isCaseSensitive,
            ignoreDiacritics: options.ignoreDiacritics,
            tokenize: options.tokenize
          });
          const queryTerms = this.analyzer.tokenize(pattern);
          const { df, fieldCount } = options._invertedIndex;
          this.termSearchers = [];
          this.idfWeights = [];
          for (const term of queryTerms) {
            this.termSearchers.push(new BitapSearch(term, {
              location: options.location,
              threshold: options.threshold,
              distance: options.distance,
              includeMatches: options.includeMatches,
              findAllMatches: options.findAllMatches,
              minMatchCharLength: options.minMatchCharLength,
              isCaseSensitive: options.isCaseSensitive,
              ignoreDiacritics: options.ignoreDiacritics,
              ignoreLocation: true
            }));
            const docFreq = df.get(term) || 0;
            const idf = Math.log(1 + (fieldCount - docFreq + 0.5) / (docFreq + 0.5));
            this.idfWeights.push(idf);
          }
          this.combineAll = options.tokenMatch === "all";
          this.numTerms = this.termSearchers.length;
          this.useMask = this.numTerms <= 31;
        }
        searchIn(text) {
          if (!this.termSearchers.length) return {
            isMatch: false,
            score: 1
          };
          const allIndices = [];
          let weightedScore = 0;
          let maxPossibleScore = 0;
          let matchedCount = 0;
          let matchedMask = 0;
          const matchedTerms = this.combineAll && !this.useMask ? /* @__PURE__ */ new Set() : null;
          for (let i = 0; i < this.termSearchers.length; i++) {
            const result = this.termSearchers[i].searchIn(text);
            const idf = this.idfWeights[i];
            maxPossibleScore += idf;
            if (result.isMatch) {
              matchedCount++;
              weightedScore += idf * (1 - result.score);
              if (result.indices) allIndices.push(...result.indices);
              if (this.combineAll) if (this.useMask) matchedMask |= 1 << i;
              else matchedTerms.add(i);
            }
          }
          if (matchedCount === 0) return {
            isMatch: false,
            score: 1
          };
          const normalized = maxPossibleScore > 0 ? 1 - weightedScore / maxPossibleScore : 0;
          const searchResult = {
            isMatch: true,
            score: Math.max(1e-3, normalized)
          };
          if (this.options.includeMatches && allIndices.length) searchResult.indices = mergeIndices(allIndices);
          if (this.combineAll) {
            if (this.useMask) searchResult.matchedMask = matchedMask;
            else searchResult.matchedTerms = matchedTerms;
            searchResult.termCount = this.numTerms;
          }
          return searchResult;
        }
      };
      Fuse = class {
        constructor(docs, options, index) {
          this.options = {
            ...Config,
            ...options
          };
          if (this.options.useExtendedSearch && false) ;
          if (this.options.useTokenSearch && false) ;
          this._keyStore = new KeyStore(this.options.keys);
          this._docs = docs;
          this._myIndex = null;
          this._invertedIndex = null;
          this.setCollection(docs, index);
          this._lastQuery = null;
          this._lastSearcher = null;
        }
        _getSearcher(query) {
          if (this._lastQuery === query) return this._lastSearcher;
          const searcher = createSearcher(query, this._invertedIndex ? {
            ...this.options,
            _invertedIndex: this._invertedIndex
          } : this.options);
          this._lastQuery = query;
          this._lastSearcher = searcher;
          return searcher;
        }
        setCollection(docs, index) {
          this._docs = docs;
          if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
          this._myIndex = index || createIndex(this.options.keys, this._docs, {
            getFn: this.options.getFn,
            fieldNormWeight: this.options.fieldNormWeight
          });
          if (this.options.useTokenSearch) {
            const analyzer = createAnalyzer({
              isCaseSensitive: this.options.isCaseSensitive,
              ignoreDiacritics: this.options.ignoreDiacritics,
              tokenize: this.options.tokenize
            });
            this._invertedIndex = buildInvertedIndex(this._myIndex.records, this._myIndex.keys.length, analyzer);
          }
          this._invalidateSearcherCache();
        }
        add(doc) {
          if (!isDefined(doc)) return;
          this._docs.push(doc);
          const record = this._myIndex.add(doc, this._docs.length - 1);
          if (this._invertedIndex && record) {
            const analyzer = createAnalyzer({
              isCaseSensitive: this.options.isCaseSensitive,
              ignoreDiacritics: this.options.ignoreDiacritics,
              tokenize: this.options.tokenize
            });
            addToInvertedIndex(this._invertedIndex, record, this._myIndex.keys.length, analyzer);
          }
          this._invalidateSearcherCache();
        }
        remove(predicate = () => false) {
          const results = [];
          const indicesToRemove = [];
          for (let i = 0, len = this._docs.length; i < len; i += 1) if (predicate(this._docs[i], i)) {
            results.push(this._docs[i]);
            indicesToRemove.push(i);
          }
          if (indicesToRemove.length) {
            if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, indicesToRemove);
            const toRemove = new Set(indicesToRemove);
            this._docs = this._docs.filter((_, i) => !toRemove.has(i));
            this._myIndex.removeAll(indicesToRemove);
            this._invalidateSearcherCache();
          }
          return results;
        }
        removeAt(idx) {
          if (!Number.isInteger(idx) || idx < 0 || idx >= this._docs.length) throw new Error(INVALID_DOC_INDEX);
          if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, [idx]);
          const doc = this._docs.splice(idx, 1)[0];
          this._myIndex.removeAt(idx);
          this._invalidateSearcherCache();
          return doc;
        }
        _invalidateSearcherCache() {
          this._lastQuery = null;
          this._lastSearcher = null;
        }
        getIndex() {
          return this._myIndex;
        }
        _normalizedKeys() {
          return this._myIndex.keys.map((key) => this._keyStore.get(key.id) || key);
        }
        search(query, options) {
          const { limit = -1 } = options || {};
          const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
          if (isString(query) && !query.trim()) {
            let docs = this._docs.map((item, idx) => ({
              item,
              refIndex: idx
            }));
            if (isNumber2(limit) && limit > -1) docs = docs.slice(0, limit);
            return docs;
          }
          const useHeap = shouldSort && isNumber2(limit) && limit > 0 && isString(query);
          const comparator = sortFn;
          const stable = (a, b) => comparator(a, b) || a.idx - b.idx;
          let results;
          if (useHeap) {
            const heap = new MaxHeap(limit, stable);
            if (isString(this._docs[0])) this._searchStringList(query, {
              heap,
              ignoreFieldNorm
            });
            else this._searchObjectList(query, {
              heap,
              ignoreFieldNorm
            });
            results = heap.extractSorted();
          } else {
            results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
            computeScore(results, { ignoreFieldNorm });
            if (shouldSort) results.sort(isString(query) ? stable : comparator);
            if (isNumber2(limit) && limit > -1) results = results.slice(0, limit);
          }
          return format(results, this._docs, {
            includeMatches,
            includeScore
          });
        }
        _searchStringList(query, { heap, ignoreFieldNorm } = {}) {
          const searcher = this._getSearcher(query);
          const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
          const { records } = this._myIndex;
          const results = heap ? null : [];
          records.forEach(({ v: text, i: idx, n: norm2 }) => {
            if (!isDefined(text)) return;
            const searchResult = searcher.searchIn(text);
            if (searchResult.isMatch) {
              const match = {
                score: searchResult.score,
                value: text,
                norm: norm2,
                indices: searchResult.indices
              };
              if (requireAllTokens) {
                match.matchedMask = searchResult.matchedMask;
                match.matchedTerms = searchResult.matchedTerms;
                match.termCount = searchResult.termCount;
              }
              const matches = [match];
              if (!requireAllTokens || this._coversAllTokens(matches)) {
                const result = {
                  item: text,
                  idx,
                  matches
                };
                if (heap) {
                  result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
                  heap.insert(result);
                } else results.push(result);
              }
            }
          });
          return results;
        }
        _searchLogical(query) {
          const expression = parse(query, this.options);
          const keys = this._normalizedKeys();
          const evaluate = (node, item, idx) => {
            if (!("children" in node)) {
              const { keyId, searcher } = node;
              let matches;
              if (keyId === null) {
                matches = [];
                keys.forEach((key, keyIndex) => {
                  matches.push(...this._findMatches({
                    key,
                    value: item[keyIndex],
                    searcher
                  }));
                });
              } else matches = this._findMatches({
                key: this._keyStore.get(keyId),
                value: this._myIndex.getValueForItemAtKeyId(item, keyId),
                searcher
              });
              if (matches && matches.length) return [{
                idx,
                item,
                matches
              }];
              return [];
            }
            const { children, operator } = node;
            const res = [];
            for (let i = 0, len = children.length; i < len; i += 1) {
              const child = children[i];
              const result = evaluate(child, item, idx);
              if (result.length) res.push(...result);
              else if (operator === LogicalOperator.AND) return [];
            }
            return res;
          };
          const records = this._myIndex.records;
          const resultMap = /* @__PURE__ */ new Map();
          const results = [];
          records.forEach(({ $: item, i: idx }) => {
            if (isDefined(item)) {
              const expResults = evaluate(expression, item, idx);
              if (expResults.length) {
                if (!resultMap.has(idx)) {
                  resultMap.set(idx, {
                    idx,
                    item,
                    matches: []
                  });
                  results.push(resultMap.get(idx));
                }
                expResults.forEach(({ matches }) => {
                  resultMap.get(idx).matches.push(...matches);
                });
              }
            }
          });
          return results;
        }
        _searchObjectList(query, { heap, ignoreFieldNorm } = {}) {
          const searcher = this._getSearcher(query);
          const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
          const { records } = this._myIndex;
          const keys = this._normalizedKeys();
          const results = heap ? null : [];
          records.forEach(({ $: item, i: idx }) => {
            if (!isDefined(item)) return;
            const matches = [];
            let anyKeyFailed = false;
            let hasInverse = false;
            keys.forEach((key, keyIndex) => {
              const keyMatches = this._findMatches({
                key,
                value: item[keyIndex],
                searcher
              });
              if (keyMatches.length) {
                matches.push(...keyMatches);
                if (keyMatches[0].hasInverse) hasInverse = true;
              } else anyKeyFailed = true;
            });
            if (hasInverse && anyKeyFailed) return;
            if (matches.length && (!requireAllTokens || this._coversAllTokens(matches))) {
              const result = {
                idx,
                item,
                matches
              };
              if (heap) {
                result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
                heap.insert(result);
              } else results.push(result);
            }
          });
          return results;
        }
        _findMatches({ key, value, searcher }) {
          if (!isDefined(value)) return [];
          const matches = [];
          if (isArray(value)) value.forEach(({ v: text, i: idx, n: norm2 }) => {
            if (!isDefined(text)) return;
            const searchResult = searcher.searchIn(text);
            if (searchResult.isMatch) {
              const match = {
                score: searchResult.score,
                key,
                value: text,
                idx,
                norm: norm2,
                indices: searchResult.indices,
                hasInverse: searchResult.hasInverse
              };
              if (searchResult.termCount !== void 0) {
                match.matchedMask = searchResult.matchedMask;
                match.matchedTerms = searchResult.matchedTerms;
                match.termCount = searchResult.termCount;
              }
              matches.push(match);
            }
          });
          else {
            const { v: text, n: norm2 } = value;
            const searchResult = searcher.searchIn(text);
            if (searchResult.isMatch) {
              const match = {
                score: searchResult.score,
                key,
                value: text,
                norm: norm2,
                indices: searchResult.indices,
                hasInverse: searchResult.hasInverse
              };
              if (searchResult.termCount !== void 0) {
                match.matchedMask = searchResult.matchedMask;
                match.matchedTerms = searchResult.matchedTerms;
                match.termCount = searchResult.termCount;
              }
              matches.push(match);
            }
          }
          return matches;
        }
        _coversAllTokens(matches) {
          const termCount = matches.length ? matches[0].termCount : void 0;
          if (termCount === void 0) return true;
          if (termCount <= 31) {
            let coverage2 = 0;
            for (let i = 0; i < matches.length; i++) coverage2 |= matches[i].matchedMask || 0;
            return coverage2 === 2 ** termCount - 1;
          }
          const coverage = /* @__PURE__ */ new Set();
          for (let i = 0; i < matches.length; i++) {
            const terms = matches[i].matchedTerms;
            if (terms) for (const t of terms) coverage.add(t);
          }
          return coverage.size === termCount;
        }
      };
      Fuse.version = "7.5.0";
      Fuse.createIndex = createIndex;
      Fuse.parseIndex = parseIndex;
      Fuse.config = Config;
      Fuse.match = function(pattern, text, options) {
        if (options && options.useTokenSearch) throw new Error(FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED);
        return createSearcher(pattern, {
          ...Config,
          ...options
        }).searchIn(text);
      };
      Fuse.parseQuery = parse;
      register(ExtendedSearch);
      register(TokenSearch);
      Fuse.use = function(...plugins) {
        plugins.forEach((plugin) => register(plugin));
      };
      entry_default = Fuse;
    }
  });

  // src/lib/search-fuse.ts
  function buildSearchIndex(tests, packages) {
    const items = [];
    for (const t of tests) {
      const symptoms = [];
      for (const [sym, testIds] of Object.entries(SYMPTOM_MAP)) {
        if (testIds.includes(t.id) || t.description.toLowerCase().includes(sym) || t.name.toLowerCase().includes(sym)) {
          symptoms.push(sym);
        }
      }
      items.push({
        id: t.id,
        type: "test",
        name: t.name,
        category: t.category,
        price: t.price,
        originalPrice: t.originalPrice,
        turnaroundTime: t.turnaroundTime,
        description: t.description,
        parameters: t.parameters || [],
        symptoms,
        homeCollection: t.homeCollection,
        popular: t.popular
      });
    }
    for (const p of packages) {
      items.push({
        id: p.id,
        type: "package",
        name: p.name,
        category: "package",
        price: p.price,
        originalPrice: p.originalPrice,
        turnaroundTime: "12-24 hours",
        description: p.description,
        parameters: p.testsIncluded,
        symptoms: ["full body", "checkup", "preventive", "wellness"],
        homeCollection: true,
        popular: p.recommended
      });
    }
    return items;
  }
  function createSearchEngine(items) {
    const options = {
      keys: [
        { name: "name", weight: 0.4 },
        { name: "parameters", weight: 0.25 },
        { name: "symptoms", weight: 0.2 },
        { name: "category", weight: 0.1 },
        { name: "description", weight: 0.05 }
      ],
      threshold: 0.35,
      // Fuzzy matching tolerance
      ignoreLocation: true,
      minMatchCharLength: 2
    };
    const fuse = new entry_default(items, options);
    return {
      search: (query, categoryFilter) => {
        let results = items;
        if (query && query.trim().length > 0) {
          results = fuse.search(query.trim()).map((r2) => r2.item);
        }
        if (categoryFilter && categoryFilter !== "all") {
          if (categoryFilter === "packages") {
            results = results.filter((i) => i.type === "package");
          } else if (categoryFilter === "tests") {
            results = results.filter((i) => i.type === "test");
          } else {
            results = results.filter((i) => i.category === categoryFilter);
          }
        }
        return results;
      }
    };
  }
  var SYMPTOM_MAP;
  var init_search_fuse = __esm({
    "src/lib/search-fuse.ts"() {
      init_fuse();
      SYMPTOM_MAP = {
        fatigue: ["cbc", "vitamin-d", "vitamin-b12", "thyroid", "ferritin", "iron"],
        fever: ["cbc", "esr", "crp-quant", "urine-analysis"],
        sugar: ["hba1c", "diabetes"],
        diabetes: ["hba1c", "sdl-1-3"],
        thyroid: ["thyroid", "free-thyroid", "sdl-1-3", "sdl-1-2"],
        cholesterol: ["lipid", "sdl-1-3", "sdl-1-1"],
        heart: ["lipid", "troponin-i", "troponin-t", "ck-mb"],
        joint: ["ra-quant", "crp-quant", "esr", "vitamin-d", "arthritis-immunology"],
        hairfall: ["ferritin", "iron", "thyroid", "vitamin-d", "vitamin-b12", "testo-total"],
        pregnancy: ["beta-hcg", "fsh", "lh", "prl", "female-hormone"],
        liver: ["liver", "sdl-1-3", "sdl-1-1", "sdl-1-2"],
        kidney: ["kidney", "sdl-1-3", "sdl-1-1", "sdl-1-2", "urine-analysis"],
        allergy: ["ige", "cbc"],
        weakness: ["vitamin-d", "vitamin-b12", "cbc", "iron", "ferritin"],
        pcos: ["fsh", "lh", "testo-total", "prl", "amh", "female-hormone"],
        fertility: ["semen-analysis", "amh", "fsh", "lh", "prl", "testo-total"]
      };
    }
  });

  // src/components/cms/StaffCMSModal.tsx
  function StaffCMSModal({ trigger, onCatalogUpdated }) {
    const [open, setOpen] = (0, import_react8.useState)(false);
    const [activeTab, setActiveTab] = (0, import_react8.useState)("TESTS");
    const [tests, setTests] = (0, import_react8.useState)(() => CMSClient.getTests());
    const [packages, setPackages] = (0, import_react8.useState)(() => CMSClient.getPackages());
    const [config, setConfig] = (0, import_react8.useState)(() => CMSClient.getConfig());
    const [editingTest, setEditingTest] = (0, import_react8.useState)(null);
    const [isCreatingNew, setIsCreatingNew] = (0, import_react8.useState)(false);
    const [githubToken, setGithubToken] = (0, import_react8.useState)("");
    const [isDispatching, setIsDispatching] = (0, import_react8.useState)(false);
    const [testForm, setTestForm] = (0, import_react8.useState)({
      id: "",
      name: "",
      description: "",
      price: 300,
      originalPrice: 500,
      turnaroundTime: "4-6 hours",
      category: "blood",
      parameters: "Hemoglobin, TLC, Platelets",
      homeCollection: true,
      popular: false
    });
    const handleStartNewTest = () => {
      setTestForm({
        id: `custom-test-${Date.now().toString().slice(-4)}`,
        name: "",
        description: "",
        price: 299,
        originalPrice: 499,
        turnaroundTime: "4-6 hours",
        category: "blood",
        parameters: "",
        homeCollection: true,
        popular: false
      });
      setIsCreatingNew(true);
      setEditingTest(null);
    };
    const handleEditTest = (test) => {
      setTestForm({
        id: test.id,
        name: test.name,
        description: test.description,
        price: test.price,
        originalPrice: test.originalPrice || test.price,
        turnaroundTime: test.turnaroundTime,
        category: test.category,
        parameters: test.parameters ? test.parameters.join(", ") : "",
        homeCollection: test.homeCollection,
        popular: !!test.popular
      });
      setEditingTest(test);
      setIsCreatingNew(false);
    };
    const handleSaveTest = (e) => {
      e.preventDefault();
      if (!testForm.name || !testForm.id) {
        import_sonner7.toast.error("Test Name and ID are required");
        return;
      }
      const newTest = {
        id: testForm.id.toLowerCase().replace(/[^a-z0-9-_]/g, "-"),
        name: testForm.name,
        description: testForm.description || `${testForm.name} pathology test at Sawariya Diagnostic Lab.`,
        price: Number(testForm.price),
        originalPrice: Number(testForm.originalPrice),
        turnaroundTime: testForm.turnaroundTime,
        category: testForm.category,
        parameters: testForm.parameters.split(",").map((p) => p.trim()).filter(Boolean),
        homeCollection: testForm.homeCollection,
        popular: testForm.popular
      };
      const updated = CMSClient.saveTest(newTest);
      setTests(updated);
      setEditingTest(null);
      setIsCreatingNew(false);
      import_sonner7.toast.success(`Saved "${newTest.name}" to Headless CMS test catalog`);
      onCatalogUpdated?.();
    };
    const handleDeleteTest = (id) => {
      if (confirm("Are you sure you want to remove this test from the catalog?")) {
        const updated = CMSClient.deleteTest(id);
        setTests(updated);
        import_sonner7.toast.success("Test removed from catalog");
        onCatalogUpdated?.();
      }
    };
    const handleTriggerWebhook = async () => {
      setIsDispatching(true);
      try {
        const res = await CMSClient.triggerRebuildWebhook(githubToken);
        if (res.success) {
          import_sonner7.toast.success(res.message);
        } else {
          import_sonner7.toast.error(res.message);
        }
      } catch {
        import_sonner7.toast.error("Failed to dispatch webhook");
      } finally {
        setIsDispatching(false);
      }
    };
    const handleResetDefaults = () => {
      if (confirm("Reset CMS catalog back to original lab default tests?")) {
        CMSClient.resetToDefaults();
        setTests(CMSClient.getTests());
        setPackages(CMSClient.getPackages());
        import_sonner7.toast.success("Catalog reset to laboratory defaults");
        onCatalogUpdated?.();
      }
    };
    const handleExportJSON = () => {
      const data = {
        tests,
        packages,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        provider: "Sanity.io / Contentful Export"
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sawariya_cms_catalog_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      a.click();
      import_sonner7.toast.success("Downloaded CMS dataset JSON");
    };
    return /* @__PURE__ */ React.createElement(Dialog, { open, onOpenChange: setOpen }, trigger && /* @__PURE__ */ React.createElement(DialogTrigger, { asChild: true }, trigger), /* @__PURE__ */ React.createElement(DialogContent, { className: "sm:max-w-[840px] max-h-[90vh] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-5 sm:p-6 text-white relative overflow-hidden flex-shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#FDE047]" }, /* @__PURE__ */ React.createElement(import_lucide_react18.Database, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-bold uppercase tracking-wider text-teal-200" }, "Headless CMS & GitHub Actions Engine"), /* @__PURE__ */ React.createElement(DialogTitle, { className: "text-xl sm:text-2xl font-black text-white tracking-tight" }, "Staff Diagnostic Test Catalog Manager"))), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: handleExportJSON,
        className: "bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs gap-1.5"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react18.Download, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Export JSON")
    )), /* @__PURE__ */ React.createElement(DialogDescription, { className: "text-xs text-teal-100/90 mt-1" }, "Dynamic content editing without a backend server. Changes can be published via GitHub Actions webhooks."), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-4 pt-3 border-t border-white/10" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setActiveTab("TESTS");
          setEditingTest(null);
          setIsCreatingNew(false);
        },
        className: `px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "TESTS" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "Diagnostic Tests (",
      tests.length,
      ")"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setActiveTab("PACKAGES");
          setEditingTest(null);
          setIsCreatingNew(false);
        },
        className: `px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "PACKAGES" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "Health Packages (",
      packages.length,
      ")"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("WEBHOOK"),
        className: `px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "WEBHOOK" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "GitHub Actions Webhook"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("SCHEMA"),
        className: `px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "SCHEMA" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "Sanity Studio Schema"
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50" }, activeTab === "TESTS" && /* @__PURE__ */ React.createElement("div", null, isCreatingNew || editingTest ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleSaveTest, className: "bg-white p-5 rounded-[22px] border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between border-b border-slate-100 pb-3" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm text-slate-900" }, isCreatingNew ? "Add New Diagnostic Test" : `Edit "${editingTest?.name}"`), /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        onClick: () => {
          setIsCreatingNew(false);
          setEditingTest(null);
        },
        className: "text-xs"
      },
      "Cancel"
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Test Unique ID"), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: testForm.id,
        onChange: (e) => setTestForm({ ...testForm, id: e.target.value }),
        placeholder: "e.g. lipid-extended",
        disabled: !isCreatingNew,
        required: true,
        className: "h-10 text-xs mt-1"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Category"), /* @__PURE__ */ React.createElement(
      "select",
      {
        value: testForm.category,
        onChange: (e) => setTestForm({ ...testForm, category: e.target.value }),
        className: "w-full h-10 bg-slate-50 border border-slate-200 rounded-[12px] px-3 mt-1 text-xs"
      },
      /* @__PURE__ */ React.createElement("option", { value: "blood" }, "Blood Routine"),
      /* @__PURE__ */ React.createElement("option", { value: "hormone" }, "Hormone & Endocrine"),
      /* @__PURE__ */ React.createElement("option", { value: "specialized" }, "Specialized & Immunology")
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Test Full Name"), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: testForm.name,
        onChange: (e) => setTestForm({ ...testForm, name: e.target.value }),
        placeholder: "e.g. Vitamin D3 (25-Hydroxy)",
        required: true,
        className: "h-10 text-xs mt-1"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Offer Price (\u20B9)"), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "number",
        value: testForm.price,
        onChange: (e) => setTestForm({ ...testForm, price: Number(e.target.value) }),
        required: true,
        className: "h-10 text-xs mt-1"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Original MRP (\u20B9)"), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "number",
        value: testForm.originalPrice,
        onChange: (e) => setTestForm({ ...testForm, originalPrice: Number(e.target.value) }),
        className: "h-10 text-xs mt-1"
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Turnaround Time"), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: testForm.turnaroundTime,
        onChange: (e) => setTestForm({ ...testForm, turnaroundTime: e.target.value }),
        placeholder: "e.g. 4-6 hours, 24 hours",
        className: "h-10 text-xs mt-1"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Parameters (comma separated)"), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: testForm.parameters,
        onChange: (e) => setTestForm({ ...testForm, parameters: e.target.value }),
        placeholder: "e.g. Fasting Sugar, Post Prandial, HbA1c",
        className: "h-10 text-xs mt-1"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "Clinical Description"), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: testForm.description,
        onChange: (e) => setTestForm({ ...testForm, description: e.target.value }),
        placeholder: "e.g. Used to assess metabolic sugar control...",
        className: "h-10 text-xs mt-1"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 pt-1 text-xs" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-1.5 cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        checked: testForm.homeCollection,
        onChange: (e) => setTestForm({ ...testForm, homeCollection: e.target.checked })
      }
    ), /* @__PURE__ */ React.createElement("span", null, "Available for Home Sample")), /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-1.5 cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        checked: testForm.popular,
        onChange: (e) => setTestForm({ ...testForm, popular: e.target.checked })
      }
    ), /* @__PURE__ */ React.createElement("span", null, "Highlight as Popular"))), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full h-11 btn-primary rounded-[14px] text-xs font-bold" }, "Save Changes to CMS")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-600 font-medium" }, "Managing ", /* @__PURE__ */ React.createElement("strong", null, tests.length), " tests in active catalog"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: handleResetDefaults,
        className: "text-xs rounded-full gap-1"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react18.RotateCcw, { className: "w-3 h-3" }),
      /* @__PURE__ */ React.createElement("span", null, "Reset Defaults")
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        onClick: handleStartNewTest,
        className: "btn-primary text-xs rounded-full gap-1"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react18.Plus, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ React.createElement("span", null, "Add New Test")
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-3" }, tests.map((test) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: test.id,
        className: "bg-white p-3.5 rounded-[18px] border border-slate-200 shadow-2xs flex flex-col justify-between"
      },
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono text-slate-400 font-bold" }, test.id), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-black text-[#155E9A]" }, "\u20B9", test.price)), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-slate-900 leading-snug" }, test.name), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 line-clamp-1 mt-0.5" }, test.description)),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-2 mt-2 border-t border-slate-100" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 capitalize" }, test.category), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => handleEditTest(test),
          className: "p-1 rounded-md text-slate-500 hover:text-[#155E9A] hover:bg-slate-100 transition-all cursor-pointer",
          title: "Edit test"
        },
        /* @__PURE__ */ React.createElement(import_lucide_react18.Edit3, { className: "w-3.5 h-3.5" })
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => handleDeleteTest(test.id),
          className: "p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer",
          title: "Delete test"
        },
        /* @__PURE__ */ React.createElement(import_lucide_react18.Trash2, { className: "w-3.5 h-3.5" })
      )))
    ))))), activeTab === "PACKAGES" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-600 font-medium" }, "Comprehensive Diagnostic Profiles (", packages.length, ")"), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-3" }, packages.map((pkg) => /* @__PURE__ */ React.createElement("div", { key: pkg.id, className: "bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-900" }, pkg.name), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-black text-[#155E9A]" }, "\u20B9", pkg.price)), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 mb-2" }, pkg.description), /* @__PURE__ */ React.createElement("div", { className: "text-[10.5px] text-slate-600 bg-slate-50 p-2 rounded-[12px] border border-slate-100" }, /* @__PURE__ */ React.createElement("strong", null, "Includes (", pkg.testsIncluded.length, "):"), " ", pkg.testsIncluded.slice(0, 3).join(", "), "..."))))), activeTab === "WEBHOOK" && /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-[22px] border border-slate-200 p-6 space-y-4 max-w-xl mx-auto" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full" }, "Automated CI/CD Integration"), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 mt-1" }, "GitHub Actions Rebuild Webhook"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "When you make changes to diagnostic tests in Sanity.io, Contentful, or here, dispatching a webhook tells GitHub Actions to generate new static HTML pages and deploy them automatically.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { className: "text-xs font-bold text-slate-700" }, "GitHub Personal Access Token (Optional for live dispatch)"), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "password",
        placeholder: "ghp_xxxxxxxxxxxxxxxxxxxx",
        value: githubToken,
        onChange: (e) => setGithubToken(e.target.value),
        className: "h-10 text-xs"
      }
    ), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-400" }, "Target: ", /* @__PURE__ */ React.createElement("code", null, "Sawariya-Diagnostic/Sawariya-Diagnostic"), " (event: ", /* @__PURE__ */ React.createElement("code", null, "cms_content_update"), ")")), /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: handleTriggerWebhook,
        disabled: isDispatching,
        className: "w-full h-11 btn-primary rounded-[14px] text-xs font-bold gap-2"
      },
      isDispatching ? /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(import_lucide_react18.Sparkles, { className: "w-4 h-4 animate-spin text-[#FDE047]" }), " Dispatched...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_lucide_react18.Send, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, "Dispatch GitHub Actions SSG Rebuild"))
    )), activeTab === "SCHEMA" && /* @__PURE__ */ React.createElement("div", { className: "bg-slate-900 text-slate-100 rounded-[22px] p-4 text-xs font-mono overflow-x-auto space-y-2 max-h-[380px]" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-teal-300 font-sans font-bold" }, "Sanity Studio Schema Code (Ready to deploy to Sanity.io or Contentful):"), /* @__PURE__ */ React.createElement("pre", { className: "text-[11px] leading-relaxed text-slate-300" }, `export default {
  name: 'medicalTest',
  title: 'Diagnostic Test',
  type: 'document',
  fields: [
    { name: 'name', title: 'Test Name', type: 'string' },
    { name: 'price', title: 'Price (INR)', type: 'number' },
    { name: 'originalPrice', title: 'MRP', type: 'number' },
    { name: 'turnaroundTime', title: 'Turnaround Time', type: 'string' },
    { name: 'parameters', title: 'Parameters', type: 'array', of: [{type: 'string'}] },
    { name: 'homeCollection', title: 'Home Collection', type: 'boolean' }
  ]
}`)))));
  }
  var import_react8, import_lucide_react18, import_sonner7;
  var init_StaffCMSModal = __esm({
    "src/components/cms/StaffCMSModal.tsx"() {
      import_react8 = __require("react");
      init_dialog();
      init_button();
      init_input();
      init_label();
      import_lucide_react18 = __require("lucide-react");
      init_cms_client();
      import_sonner7 = __require("sonner");
    }
  });

  // src/components/TestCatalog.tsx
  var TestCatalog_exports = {};
  __export(TestCatalog_exports, {
    TestCatalog: () => TestCatalog
  });
  function TestCatalog() {
    const [searchQuery, setSearchQuery] = (0, import_react9.useState)("");
    const [selectedCategory, setSelectedCategory] = (0, import_react9.useState)("all");
    const [activeTab, setActiveTab] = (0, import_react9.useState)("packages");
    const [tests, setTests] = (0, import_react9.useState)(() => CMSClient.getTests());
    const [packages, setPackages] = (0, import_react9.useState)(() => CMSClient.getPackages());
    const [selectedPackageForBooking, setSelectedPackageForBooking] = (0, import_react9.useState)(null);
    const [selectedItemForDetail, setSelectedItemForDetail] = (0, import_react9.useState)(null);
    (0, import_react9.useEffect)(() => {
      const handleExternalSearch = (e) => {
        const customEvent = e;
        if (customEvent.detail?.query !== void 0) {
          setSearchQuery(customEvent.detail.query);
          if (customEvent.detail.tab) {
            setActiveTab(customEvent.detail.tab);
          }
        }
      };
      window.addEventListener("sawariya:search", handleExternalSearch);
      return () => window.removeEventListener("sawariya:search", handleExternalSearch);
    }, []);
    const refreshCatalog = () => {
      setTests(CMSClient.getTests());
      setPackages(CMSClient.getPackages());
    };
    const searchEngine = (0, import_react9.useMemo)(() => {
      const items = buildSearchIndex(tests, packages);
      return createSearchEngine(items);
    }, [tests, packages]);
    const filteredItems = (0, import_react9.useMemo)(() => {
      return searchEngine.search(searchQuery, selectedCategory);
    }, [searchEngine, searchQuery, selectedCategory]);
    const filteredTests = (0, import_react9.useMemo)(() => {
      return filteredItems.filter((i) => i.type === "test");
    }, [filteredItems]);
    const filteredPackages = (0, import_react9.useMemo)(() => {
      if (searchQuery.trim().length > 0) {
        return filteredItems.filter((i) => i.type === "package");
      }
      return packages;
    }, [filteredItems, searchQuery, packages]);
    const quickSymptoms = [
      { label: "All Tests", query: "", cat: "all" },
      { label: "Sugar & Diabetes", query: "sugar", cat: "all" },
      { label: "Thyroid", query: "thyroid", cat: "all" },
      { label: "Full Body Checkup", query: "full body", cat: "all" },
      { label: "Fatigue & Weakness", query: "fatigue", cat: "all" },
      { label: "Cholesterol & Heart", query: "lipid", cat: "all" },
      { label: "Vitamins D & B12", query: "vitamin", cat: "all" },
      { label: "Fever & Infection", query: "fever", cat: "all" },
      { label: "Kidney & Urine", query: "kidney", cat: "all" }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "tests", className: "relative fluid-section bg-[#F5F5F7] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-blue-300/10 blur-[80px] animate-liquid mix-blend-multiply" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-teal-300/10 blur-[100px] animate-liquid mix-blend-multiply", style: { animationDelay: "-8s" } })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-1 rounded-full shadow-2xs h-[30.1px]" }, /* @__PURE__ */ React.createElement(import_lucide_react19.TestTube, { className: "w-6 h-6 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-slate-800 uppercase tracking-wider" }, "Diagnostic Test Catalog & Packages")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight" }, "Transparent Pricing. Certified Accuracy."), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base text-slate-600 font-normal leading-relaxed" }, "Choose from comprehensive preventive packages or over 180+ individual certified blood tests with instant search & online booking"), /* @__PURE__ */ React.createElement("div", { className: "pt-1 flex justify-center" }, /* @__PURE__ */ React.createElement(
      StaffCMSModal,
      {
        onCatalogUpdated: refreshCatalog,
        trigger: /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
          },
          /* @__PURE__ */ React.createElement(import_lucide_react19.Settings2, { className: "w-3.5 h-3.5 text-[#155E9A]" }),
          /* @__PURE__ */ React.createElement("span", null, "Staff Headless CMS Editor"),
          /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" })
        )
      }
    ))), /* @__PURE__ */ React.createElement(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), className: "w-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center mb-6 px-1" }, /* @__PURE__ */ React.createElement(TabsList, { className: "bg-white/60 backdrop-blur-xl p-1 rounded-full border border-white/80 h-12 grid grid-cols-2 w-full max-w-md shadow-inner" }, /* @__PURE__ */ React.createElement(
      TabsTrigger,
      {
        value: "packages",
        className: "rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react19.Package, { className: "w-4 h-4 text-[#155E9A]" }),
      /* @__PURE__ */ React.createElement("span", null, "Health Packages (", packages.length, ")")
    ), /* @__PURE__ */ React.createElement(
      TabsTrigger,
      {
        value: "tests",
        className: "rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react19.TestTube, { className: "w-4 h-4 text-[#155E9A]" }),
      /* @__PURE__ */ React.createElement("span", null, "Individual Tests (", tests.length, "+)")
    ))), /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3.5 sm:p-4 rounded-[24px] border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex-1" }, /* @__PURE__ */ React.createElement(import_lucide_react19.Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#155E9A]" }), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        placeholder: "Search 180+ tests by name, symptom (e.g. fatigue, sugar, cbc, thyroid)...",
        value: searchQuery,
        onChange: (e) => {
          setSearchQuery(e.target.value);
          if (e.target.value && activeTab === "packages") {
            setActiveTab("tests");
          }
        },
        className: "pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] shadow-2xs text-slate-900"
      }
    ), searchQuery && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSearchQuery(""),
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
      },
      "Clear"
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none items-center" }, categories.map((cat) => {
      const isSelected = selectedCategory === cat.id;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: cat.id,
          onClick: () => setSelectedCategory(cat.id),
          className: `h-9 px-3.5 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer inline-flex items-center shadow-2xs ${isSelected ? "bg-[#102A43] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`
        },
        cat.name
      );
    }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 px-1 scrollbar-none" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react19.Zap, { className: "w-3 h-3 text-amber-500" }), " Popular Searches:"), quickSymptoms.map((sym) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: sym.label,
        onClick: () => {
          setSearchQuery(sym.query);
          setSelectedCategory(sym.cat);
          if (sym.query) setActiveTab("tests");
        },
        className: `text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all whitespace-nowrap cursor-pointer ${searchQuery === sym.query && sym.query !== "" ? "bg-[#155E9A] text-white border-[#155E9A]" : "bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 shadow-2xs"}`
      },
      sym.label
    )))), /* @__PURE__ */ React.createElement(TabsContent, { value: "packages", className: "mt-0" }, /* @__PURE__ */ React.createElement("div", { className: "fluid-grid-cards-md" }, filteredPackages.map((pkg, idx) => {
      const discountPercent = Math.round((1 - pkg.price / pkg.originalPrice) * 100);
      const packageThemes = [
        { accent: "border-blue-200 hover:border-blue-400", badge: "bg-blue-50 text-blue-900" },
        { accent: "border-emerald-300 hover:border-emerald-500", badge: "bg-emerald-50 text-emerald-900" },
        { accent: "border-purple-200 hover:border-purple-400", badge: "bg-purple-50 text-purple-900" },
        { accent: "border-amber-200 hover:border-amber-400", badge: "bg-amber-50 text-amber-900" }
      ];
      const theme = packageThemes[idx % packageThemes.length];
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: pkg.id,
          className: `glass-card p-4 sm:p-6 flex flex-col justify-between h-full relative rounded-[24px] sm:rounded-[26px] bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden ${pkg.recommended ? "border-2 border-[#155E9A] ring-2 ring-[#C62828]/20 bg-white" : ""}`
        },
        pkg.recommended && /* @__PURE__ */ React.createElement("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-white text-[10px] sm:text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border border-teal-300/40 flex items-center gap-1.5 whitespace-nowrap z-10" }, /* @__PURE__ */ React.createElement(import_lucide_react19.Sparkles, { className: "w-3 h-3 text-[#FDE047]" }), " Most Popular Choice"),
        /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col justify-between min-w-0" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement("span", { className: `text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider block mb-1 px-2.5 py-0.5 rounded-md inline-block ${theme.badge}` }, "PREVENTIVE CARE"), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base sm:text-lg text-[#1D1D1F] mb-1 leading-snug" }, pkg.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 leading-relaxed font-normal" }, pkg.description)), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 border border-slate-100 rounded-[18px] p-3.5 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-2 flex-wrap" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl sm:text-3xl font-black text-[#1D1D1F]" }, "\u20B9", pkg.price), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400 line-through font-medium" }, "\u20B9", pkg.originalPrice), /* @__PURE__ */ React.createElement("span", { className: "ml-auto text-[10.5px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-full" }, "Save ", discountPercent, "%")), /* @__PURE__ */ React.createElement("p", { className: "text-[10.5px] text-teal-800 font-semibold mt-1.5 flex items-center gap-1" }, /* @__PURE__ */ React.createElement(import_lucide_react19.ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600 flex-shrink-0" }), " Free Doorstep Home Sample"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5 mb-5" }, /* @__PURE__ */ React.createElement("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "Key Tests Included (", pkg.testsIncluded.length, "):"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-1" }, pkg.testsIncluded.slice(0, 5).map((test) => /* @__PURE__ */ React.createElement("li", { key: test, className: "flex items-start gap-1.5 text-xs text-slate-700 font-medium" }, /* @__PURE__ */ React.createElement(import_lucide_react19.Check, { className: "w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("span", { className: "leading-snug break-words" }, test))), pkg.testsIncluded.length > 5 && /* @__PURE__ */ React.createElement(
          "li",
          {
            onClick: () => setSelectedItemForDetail(pkg),
            className: "text-xs text-[#155E9A] font-semibold pl-5 flex items-center gap-1 cursor-pointer hover:underline active:opacity-75 transition-opacity"
          },
          /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#C62828]" }),
          /* @__PURE__ */ React.createElement("span", null, "+", pkg.testsIncluded.length - 5, " more parameters (View all)")
        )))),
        /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 pt-4 mt-auto border-t border-slate-100" }, /* @__PURE__ */ React.createElement(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setSelectedItemForDetail(pkg),
            className: "h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] border-slate-200 hover:bg-slate-50 w-full min-w-0"
          },
          /* @__PURE__ */ React.createElement(import_lucide_react19.Info, { className: "w-3.5 h-3.5 text-slate-500 shrink-0" }),
          /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Overview")
        ), /* @__PURE__ */ React.createElement(
          Button,
          {
            size: "sm",
            onClick: () => setSelectedPackageForBooking(pkg),
            className: "btn-primary h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] shadow-xs hover:shadow-md w-full min-w-0"
          },
          /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Book Package"),
          /* @__PURE__ */ React.createElement(import_lucide_react19.ArrowRight, { className: "w-3.5 h-3.5 shrink-0" })
        ))
      );
    }))), /* @__PURE__ */ React.createElement(TabsContent, { value: "tests", className: "mt-0" }, searchQuery && /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-600 mb-4 px-1 font-medium" }, "Found ", /* @__PURE__ */ React.createElement("strong", null, filteredTests.length), ' tests matching "', searchQuery, '"'), /* @__PURE__ */ React.createElement("div", { className: "fluid-grid-cards-sm" }, filteredTests.map((test) => /* @__PURE__ */ React.createElement(
      TestCard,
      {
        key: test.id,
        test,
        onViewDetails: (t) => setSelectedItemForDetail(t)
      }
    ))), filteredTests.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-10 bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/90 shadow-sm p-6 max-w-lg mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500" }, /* @__PURE__ */ React.createElement(import_lucide_react19.TestTube, { className: "w-6 h-6 text-[#155E9A]" })), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-800 text-base mb-1" }, 'No Tests Matching "', searchQuery, '"'), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-600 mb-4 max-w-sm mx-auto leading-relaxed" }, "Try searching with generic terms like ", /* @__PURE__ */ React.createElement("em", null, "blood"), ", ", /* @__PURE__ */ React.createElement("em", null, "sugar"), ", or click one of the popular test tags below:"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 justify-center mb-5" }, ["CBC", "Thyroid", "HbA1c", "Lipid", "Vitamin D3", "Liver LFT", "Kidney KFT"].map((tag) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tag,
        onClick: () => {
          setSearchQuery(tag);
          setSelectedCategory("all");
        },
        className: "text-xs bg-slate-100 hover:bg-teal-50 hover:text-[#155E9A] text-slate-700 font-semibold px-3 py-1 rounded-full border border-slate-200 transition-all cursor-pointer"
      },
      tag
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        onClick: () => {
          setSearchQuery("");
          setSelectedCategory("all");
        },
        variant: "outline",
        className: "rounded-full text-xs font-bold border-slate-300 hover:bg-slate-50"
      },
      "Clear Search Filters"
    ), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: whatsappHref("Hi, I am looking for a pathology test not listed in the catalog") || void 0,
        target: "_blank",
        rel: "noreferrer",
        className: "inline-flex items-center gap-1.5 text-xs font-bold bg-[#155E9A] text-white px-3.5 py-2 rounded-full hover:bg-[#102A43] transition-all"
      },
      /* @__PURE__ */ React.createElement("span", null, "Ask Lab on WhatsApp")
    )))))), selectedPackageForBooking && /* @__PURE__ */ React.createElement(
      TestBookingModal,
      {
        testName: selectedPackageForBooking.name,
        price: selectedPackageForBooking.price,
        originalPrice: selectedPackageForBooking.originalPrice,
        isPackage: true,
        isOpen: !!selectedPackageForBooking,
        onOpenChange: (open) => !open && setSelectedPackageForBooking(null)
      }
    ), selectedItemForDetail && /* @__PURE__ */ React.createElement(
      TestDetailModal,
      {
        item: selectedItemForDetail,
        isOpen: !!selectedItemForDetail,
        onClose: () => setSelectedItemForDetail(null)
      }
    ));
  }
  var import_react9, import_lucide_react19;
  var init_TestCatalog = __esm({
    "src/components/TestCatalog.tsx"() {
      "use client";
      import_react9 = __require("react");
      init_site();
      import_lucide_react19 = __require("lucide-react");
      init_tabs();
      init_input();
      init_button();
      init_TestCard();
      init_mockTests();
      init_cms_client();
      init_search_fuse();
      init_StaffCMSModal();
      init_TestBookingModal();
      init_TestDetailModal();
    }
  });

  // src/components/Team.tsx
  var Team_exports = {};
  __export(Team_exports, {
    Team: () => Team
  });
  function Team() {
    const teamMembers = team.members;
    return /* @__PURE__ */ React.createElement("section", { id: "team", className: "relative fluid-section bg-[#FBFBFD] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-blue-300/10 blur-[80px] animate-liquid mix-blend-multiply" })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-[#155E9A]/20 px-3.5 py-1 rounded-full shadow-2xs" }, /* @__PURE__ */ React.createElement(import_lucide_react20.Stethoscope, { className: "w-3.5 h-3.5 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-[#155E9A] uppercase tracking-wider" }, "Clinical Leadership")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight" }, "Led by Experienced Medical Specialists"), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base text-slate-600 font-normal leading-relaxed" }, "Every test report is evaluated, validated, and signed by qualified pathologists and diagnostic consultants")), /* @__PURE__ */ React.createElement("div", { className: "fluid-grid-cards-md max-w-5xl mx-auto" }, teamMembers.map((member, index) => {
      const memberThemes = [
        {
          ring: "ring-blue-100 group-hover:ring-blue-300",
          roleColor: "text-[#102A43]",
          avatarBg: "0A3663",
          avatarText: "93C5FD",
          qualTag: "bg-blue-50 text-blue-900 border-blue-200/80",
          accentBar: "bg-[#102A43]"
        },
        {
          ring: "ring-emerald-100 group-hover:ring-emerald-300",
          roleColor: "text-[#155E9A]",
          avatarBg: "0A6E5C",
          avatarText: "A7F3D0",
          qualTag: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
          accentBar: "bg-[#155E9A]"
        },
        {
          ring: "ring-purple-100 group-hover:ring-purple-300",
          roleColor: "text-[#581C87]",
          avatarBg: "581C87",
          avatarText: "E9D5FF",
          qualTag: "bg-purple-50 text-purple-900 border-purple-200/80",
          accentBar: "bg-[#581C87]"
        }
      ];
      const theme = memberThemes[index % memberThemes.length];
      return /* @__PURE__ */ React.createElement(
        import_framer_motion5.motion.div,
        {
          key: member.name,
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: index * 0.08 },
          viewport: { once: true },
          className: "glass-card p-6 text-center group flex flex-col justify-between bg-white/70 rounded-[26px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
        },
        /* @__PURE__ */ React.createElement("div", { className: `absolute top-0 left-0 right-0 h-1 ${theme.accentBar}` }),
        /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "relative mb-4 mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: `w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ${theme.ring} transition-all flex items-center justify-center shadow-md` }, /* @__PURE__ */ React.createElement(
          "img",
          {
            src: `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${theme.avatarBg}&color=${theme.avatarText}&size=200&bold=true`,
            alt: `Portrait of ${member.name}, ${member.role} at Sawariya Diagnostic Lab`,
            className: "w-full h-full object-cover",
            referrerPolicy: "no-referrer"
          }
        ))), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg text-[#1D1D1F] mb-0.5 leading-snug" }, member.name), /* @__PURE__ */ React.createElement("p", { className: `font-bold text-xs sm:text-sm mb-2 ${theme.roleColor}` }, member.role), /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement("span", { className: `text-[11px] font-bold px-3 py-0.5 rounded-full inline-block border ${theme.qualTag}` }, member.qualification)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 leading-relaxed font-normal" }, member.bio)),
        /* @__PURE__ */ React.createElement("div", { className: "pt-4 mt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium" }, /* @__PURE__ */ React.createElement(import_lucide_react20.ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600" }), /* @__PURE__ */ React.createElement("span", null, "Clinical review workflow"))
      );
    }))));
  }
  var import_framer_motion5, import_lucide_react20;
  var init_Team = __esm({
    "src/components/Team.tsx"() {
      "use client";
      import_framer_motion5 = __require("framer-motion");
      import_lucide_react20 = __require("lucide-react");
      init_website_content();
    }
  });

  // src/components/Contact.tsx
  var Contact_exports = {};
  __export(Contact_exports, {
    Contact: () => Contact
  });
  function Contact() {
    const [showCalendar, setShowCalendar] = (0, import_react10.useState)(false);
    (0, import_react10.useEffect)(() => {
      (async function() {
        const cal = await (0, import_embed_react.getCalApi)({ "namespace": "sawariya-booking" });
        cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
      })();
    }, []);
    const infoCards = [
      {
        icon: import_lucide_react21.FileCheck,
        title: "1. Select Test / Package",
        description: "Choose routine panels or custom doctor prescriptions.",
        style: {
          iconBg: "bg-blue-50 text-[#102A43] border-blue-200/80",
          accentBar: "bg-[#102A43]"
        }
      },
      {
        icon: import_lucide_react21.Home,
        title: "2. Lab or Home Sample",
        description: "Visit our facility or request a doorstep collection; availability is confirmed at booking.",
        style: {
          iconBg: "bg-emerald-50 text-[#155E9A] border-emerald-200/80",
          accentBar: "bg-[#155E9A]"
        }
      },
      {
        icon: import_lucide_react21.Clock,
        title: "3. Express WhatsApp Report",
        description: "Get verified digital PDF reports with direct QR validation.",
        style: {
          iconBg: "bg-amber-50 text-[#7A4B2A] border-amber-200/80",
          accentBar: "bg-[#7A4B2A]"
        }
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "relative fluid-section bg-[#F5F5F7] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 blur-[100px] animate-liquid mix-blend-multiply" })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs" }, /* @__PURE__ */ React.createElement(import_lucide_react21.Calendar, { className: "w-3.5 h-3.5 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-slate-800 uppercase tracking-wider" }, "Appointments & Location")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight" }, "Schedule Your Test or Visit Us"), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base text-slate-600 font-normal leading-relaxed" }, "Walk-in samples and home collections are available subject to current operating capacity.")), /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto mb-10 sm:mb-14 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "glass-panel bg-white/70 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-white/80" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-white px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-500/30" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-0.5 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 flex-wrap" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm sm:text-lg font-bold text-white" }, "Online Appointment & Doctor Desk"), /* @__PURE__ */ React.createElement("span", { className: "bg-white/20 text-[#FDE047] text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-300/30 inline-flex items-center" }, "Availability subject to confirmation")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] sm:text-xs text-teal-100 font-normal truncate" }, "Instant confirmation \u2022 Helpline: ", siteConfig.contact.phone)), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white shrink-0" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 bg-[#FDE047] rounded-full animate-pulse" }), /* @__PURE__ */ React.createElement("span", { className: "font-semibold" }, siteConfig.claims.operatingHours))), /* @__PURE__ */ React.createElement("div", { className: "p-5 sm:p-10 bg-white/40 backdrop-blur-md min-h-[380px] sm:min-h-[420px] flex items-center justify-center" }, !showCalendar ? /* @__PURE__ */ React.createElement("div", { className: "text-center max-w-md mx-auto space-y-4 sm:space-y-5 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-[20px] flex items-center justify-center mx-auto border border-slate-200 shadow-2xs" }, /* @__PURE__ */ React.createElement(import_lucide_react21.Calendar, { className: "w-7 h-7 sm:w-8 sm:h-8 text-[#155E9A]" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("h4", { className: "text-lg sm:text-2xl font-black text-[#1D1D1F] tracking-tight" }, "Choose Your Date & Time"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 leading-relaxed font-normal" }, "Check live available time slots for our Charkhi Dadri center or request a dedicated home visit.")), /* @__PURE__ */ React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        className: "btn-primary h-12 px-7 text-xs sm:text-sm font-bold rounded-[16px] shadow-sm hover:shadow-md active:scale-[0.98]",
        onClick: () => setShowCalendar(true)
      },
      /* @__PURE__ */ React.createElement("span", null, "Launch Interactive Calendar"),
      /* @__PURE__ */ React.createElement(import_lucide_react21.ChevronRight, { className: "w-4 h-4 ml-1.5" })
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        asChild: true,
        variant: "outline",
        className: "btn-outline h-12 px-6 text-xs sm:text-sm font-bold rounded-[16px] shadow-2xs hover:shadow-sm"
      },
      /* @__PURE__ */ React.createElement("a", { href: telHref(siteConfig.contact.phone) }, /* @__PURE__ */ React.createElement(import_lucide_react21.PhoneCall, { className: "w-4 h-4 mr-2 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", null, "Call Desk (", siteConfig.contact.phone, ")"))
    ))) : /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          minHeight: "540px",
          overflow: "scroll"
        }
      },
      /* @__PURE__ */ React.createElement(
        import_embed_react.default,
        {
          namespace: "sawariya-booking",
          calLink: "sawariya-lab/30min",
          style: { width: "100%", height: "100%", overflow: "scroll" },
          config: { layout: "month_view" }
        }
      )
    )))), /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto mb-10 sm:mb-14 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "glass-card bg-white/60 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-white/80 p-5 sm:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-12 gap-6 lg:gap-8 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 space-y-4 sm:space-y-6 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]" }, /* @__PURE__ */ React.createElement(import_lucide_react21.MapPin, { className: "w-3.5 h-3.5 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-[#1D1D1F]" }, "Lab Center Location")), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl sm:text-2xl font-black text-[#1D1D1F] tracking-tight" }, "Visit Our Diagnostic Facility"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 leading-relaxed font-normal" }, "Centrally located on Loharu Road, right opposite R.S. Sangwan Hospital with dedicated patient parking and sample collection rooms.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 text-xs sm:text-sm text-slate-700 border-y border-slate-100 py-3.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement(import_lucide_react21.MapPin, { className: "w-4 h-4 text-[#102A43] flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900 block" }, "Address:"), /* @__PURE__ */ React.createElement("span", { className: "text-[#032B65] leading-relaxed break-words" }, footer.contact.address))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement(import_lucide_react21.Clock, { className: "w-4 h-4 text-[#068174] flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900 block" }, "Operating Hours:"), /* @__PURE__ */ React.createElement("span", { className: "text-[#155E9A] font-bold" }, siteConfig.claims.operatingHours))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement(import_lucide_react21.PhoneCall, { className: "w-4 h-4 text-[#155E9A] flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900 block" }, "Lab contact:"), /* @__PURE__ */ React.createElement("a", { href: telHref(siteConfig.contact.phone), className: "text-[#155E9A] font-bold hover:underline" }, siteConfig.contact.phone))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement(import_lucide_react21.Phone, { className: "w-4 h-4 text-[#AF6106] flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900 block" }, "Emergency & Lab Director:"), /* @__PURE__ */ React.createElement("a", { href: telHref(siteConfig.contact.phone), className: "text-[#7F3304] font-semibold hover:underline" }, siteConfig.contact.emergencyPhone))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement(import_lucide_react21.Mail, { className: "w-4 h-4 text-[#102A43] flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900 block" }, "Official Lab Email:"), /* @__PURE__ */ React.createElement("a", { href: `mailto:${siteConfig.contact.email}`, className: "text-[#102A43] font-medium hover:underline break-all" }, siteConfig.contact.email)))), /* @__PURE__ */ React.createElement("div", { className: "w-full pt-1" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        asChild: true,
        className: "btn-primary h-11 sm:h-12 px-4 sm:px-6 text-xs sm:text-sm font-bold rounded-[16px] shadow-sm hover:shadow-md active:scale-[0.98] w-full sm:w-auto max-w-full"
      },
      /* @__PURE__ */ React.createElement("a", { href: footer.contact.mapsLink, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center gap-2 max-w-full" }, /* @__PURE__ */ React.createElement(import_lucide_react21.Navigation, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Open Google Maps Directions"), /* @__PURE__ */ React.createElement(import_lucide_react21.ExternalLink, { className: "w-3.5 h-3.5 shrink-0" }))
    ))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-[320px] sm:h-[400px] rounded-[22px] overflow-hidden border border-white/80 shadow-[inset_0_2px_12px_rgba(0,0,0,0.08)] relative bg-white/40 backdrop-blur-md" }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        title: "Sawariya Diagnostic Lab Google Maps Location",
        src: footer.contact.mapsEmbedUrl,
        width: "100%",
        height: "100%",
        style: { border: 0, opacity: 0.9 },
        allowFullScreen: true,
        loading: "lazy",
        referrerPolicy: "strict-origin-when-cross-origin",
        className: "w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
      }
    )))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto relative z-10" }, infoCards.map((card) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: card.title,
        className: "glass-card p-5 text-center flex flex-col items-center justify-between bg-white/70 rounded-[24px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
      },
      /* @__PURE__ */ React.createElement("div", { className: `absolute top-0 left-0 right-0 h-1 ${card.style.accentBar}` }),
      /* @__PURE__ */ React.createElement("div", { className: `w-11 h-11 mx-auto mb-3 rounded-[16px] border flex items-center justify-center ${card.style.iconBg}` }, /* @__PURE__ */ React.createElement(card.icon, { className: "w-5 h-5" })),
      /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs sm:text-sm text-[#1D1D1F] mb-1 leading-snug" }, card.title),
      /* @__PURE__ */ React.createElement("p", { className: "text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal" }, card.description)
    )))));
  }
  var import_react10, import_lucide_react21, import_embed_react;
  var init_Contact = __esm({
    "src/components/Contact.tsx"() {
      "use client";
      import_react10 = __require("react");
      init_site();
      import_lucide_react21 = __require("lucide-react");
      init_button();
      import_embed_react = __toESM(__require("@calcom/embed-react"), 1);
      init_website_content();
    }
  });

  // src/components/ui/LegalModal.tsx
  function LegalModal({ type, onClose }) {
    if (!type) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden max-h-[85vh] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 bg-[#102A43] text-white flex items-center justify-between relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none opacity-40 z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-[-50%] right-[-10%] w-[150px] h-[150px] bg-[#C62828] rounded-full blur-[40px] animate-liquid mix-blend-screen" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 relative z-10" }, type === "privacy" && /* @__PURE__ */ React.createElement(import_lucide_react22.ShieldCheck, { className: "w-6 h-6 text-teal-400" }), type === "terms" && /* @__PURE__ */ React.createElement(import_lucide_react22.FileText, { className: "w-6 h-6 text-teal-400" }), type === "charter" && /* @__PURE__ */ React.createElement(import_lucide_react22.HeartHandshake, { className: "w-6 h-6 text-teal-400" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-white" }, type === "privacy" && "Privacy & Medical Data Policy", type === "terms" && "Terms of Service & Patient Rights", type === "charter" && "Patient Quality & Charity Charter"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400" }, "Sawariya Diagnostic Lab \u2022 Charkhi Dadri"))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors relative z-10"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react22.X, { className: "w-5 h-5" })
    )), /* @__PURE__ */ React.createElement("div", { className: "p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white/50 backdrop-blur-md" }, type === "privacy" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "1. Patient Confidentiality & Data Security"), /* @__PURE__ */ React.createElement("p", null, "At Sawariya Diagnostic Lab, we adhere strictly to patient confidentiality ethics and data protection standards under Indian healthcare regulations. All diagnostic reports, blood test results, medical histories, and doctor referral slips are treated with utmost confidentiality."), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "2. Collection & Usage of Diagnostic Data"), /* @__PURE__ */ React.createElement("p", null, "We collect your name, age, gender, contact number, and address strictly for:"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "Accurate sample tagging and barcoding to prevent mix-ups."), /* @__PURE__ */ React.createElement("li", null, "Dispatching digital PDF test reports directly to your WhatsApp / Email."), /* @__PURE__ */ React.createElement("li", null, "Conducting home phlebotomy appointments within Charkhi Dadri and surrounding villages.")), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "3. Non-Disclosure & Encryption"), /* @__PURE__ */ React.createElement("p", null, "Your medical data will never be sold, rented, or shared with unauthorized commercial third parties. Reports are shared only with you or your designated treating physician."), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "4. Contact Grievance Officer"), /* @__PURE__ */ React.createElement("p", null, "For privacy or report verification inquiries, email us at ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900" }, "sawariyadiagnosticckd11@gmail.com"), " or call our 24/7 Desk at ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900" }, "+91 99919 41207"), ".")), type === "terms" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "1. Diagnostic Testing & Interpretation"), /* @__PURE__ */ React.createElement("p", null, "Diagnostic investigations performed at Sawariya Diagnostic are intended to aid clinical decision-making. Results must be interpreted in conjunction with complete clinical findings by a registered medical practitioner."), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "2. Patient Rights"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Right to Precision:"), " Samples processed using automated calibrated analyzers with multi-point QC controls."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Right to Clear Pricing:"), " Complete transparency with no hidden convenience fees or unannounced charges."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Right to Timely Reports:"), " Fast reporting (same day / 6-24 hours) as per test parameters."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Right to Re-verification:"), " In case of clinical discrepancy, free re-run verification of the existing archived sample as per NABL guidelines.")), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "3. Home Collection Protocols"), /* @__PURE__ */ React.createElement("p", null, "Patients requesting home collection must provide accurate location and fasting/pre-test conditions as advised by our staff (e.g. 10-12 hours fasting for Lipid and Blood Glucose tests)."), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "4. 24/7 Lab Escalations"), /* @__PURE__ */ React.createElement("p", null, "For any immediate clinical escalations or urgent reports, our 24/7 Desk is reachable at ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900" }, "+91 99919 41207"), ", and emergency director assistance is available at ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900" }, "+91 70152 90782"), ".")), type === "charter" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "1. Community Health & Quality Commitment"), /* @__PURE__ */ React.createElement("p", null, "Sawariya Diagnostic was founded with a foundational commitment to providing accessible, top-tier clinical diagnostic care to every resident of Charkhi Dadri and adjoining rural Haryana communities."), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "2. Subsidized & Charity Health Camps"), /* @__PURE__ */ React.createElement("p", null, "We conduct regular subsidized community health screenings, free diabetes checks, and concessional testing for underprivileged families, senior citizens, and patients referred by local government healthcare initiatives."), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "3. Strict Ethical Practices"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "Single-use, sterile, vacuum-sealed collection vacutainers for 100% infection prevention."), /* @__PURE__ */ React.createElement("li", null, "Daily calibration using certified standards and bio-medical waste segregation."), /* @__PURE__ */ React.createElement("li", null, "Empathetic, compassionate care for pediatric and geriatric patients during collection.")), /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, "4. Connect for Community Camps"), /* @__PURE__ */ React.createElement("p", null, "Organizations or gram panchayats interested in organizing free or subsidized blood testing camps may write to ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900" }, "sawariyadiagnosticckd11@gmail.com"), "."))), /* @__PURE__ */ React.createElement("div", { className: "p-4 sm:p-5 bg-white/70 backdrop-blur-md border-t border-white/80 flex justify-end" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "px-6 py-2 rounded-full bg-[#102A43] text-white text-xs font-semibold hover:bg-[#155E9A] transition-colors shadow-md shadow-[#102A43]/20"
      },
      "I Understand"
    ))));
  }
  var import_lucide_react22;
  var init_LegalModal = __esm({
    "src/components/ui/LegalModal.tsx"() {
      import_lucide_react22 = __require("lucide-react");
    }
  });

  // src/components/ui/ReportDownloadModal.tsx
  function ReportDownloadModal({ trigger }) {
    const [open, setOpen] = (0, import_react11.useState)(false);
    const [loading, setLoading] = (0, import_react11.useState)(false);
    const [patientId, setPatientId] = (0, import_react11.useState)("");
    const [reportId, setReportId] = (0, import_react11.useState)("");
    const demoMode = import_meta6.env.VITE_DEMO_MODE === "true";
    const handleDownload = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await LISClient.downloadReport(patientId, reportId);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    const handleOpen = (val) => {
      setOpen(val);
      if (val) {
        Analytics.track("REPORT_MODAL_OPEN");
      }
    };
    const handleQuickDemo = () => {
      setPatientId("SD-2026-9082");
      setReportId("REP-CKD-4412");
    };
    return /* @__PURE__ */ React.createElement(Dialog, { open, onOpenChange: handleOpen }, /* @__PURE__ */ React.createElement(DialogTrigger, { asChild: true }, trigger || /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "flex-1 flex items-center justify-center gap-1.5 bg-[#082A45]/90 active:bg-[#051C2E] border border-[#155E9A]/40 rounded-[20px] h-12 px-2 text-xs font-semibold text-slate-100 transition-transform active:scale-[0.96] select-none",
        "aria-label": "Download Report"
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 rounded-lg bg-[#155E9A]/50 flex items-center justify-center text-teal-300 flex-shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react23.FileDown, { className: "w-3.5 h-3.5" })),
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col text-left leading-tight" }, /* @__PURE__ */ React.createElement("span", { className: "text-[8px] text-teal-300 font-bold uppercase tracking-wider" }, "Reports"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-white whitespace-nowrap" }, "Download"))
    )), /* @__PURE__ */ React.createElement(DialogContent, { className: "sm:max-w-[420px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.2)] rounded-[32px]" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#102A43] p-6 text-white text-center relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none opacity-40" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-[150px] h-[150px] bg-[#C62828] rounded-full blur-[40px] animate-liquid mix-blend-screen" })), /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] flex items-center justify-center mx-auto mb-3 shadow-md shadow-black/10 relative z-10" }, /* @__PURE__ */ React.createElement(import_lucide_react23.ShieldCheck, { className: "w-7 h-7 text-[#C62828]" })), /* @__PURE__ */ React.createElement(DialogTitle, { className: "text-xl font-bold tracking-tight text-white mb-1 relative z-10" }, "Download Certified Lab Report"), /* @__PURE__ */ React.createElement(DialogDescription, { className: "text-teal-100/90 text-xs leading-relaxed max-w-xs mx-auto relative z-10" }, "Directly retrieve doctor-signed, QR-verified pathology records from our secure LIS server.")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleDownload, className: "p-5 sm:p-6 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "patientId", className: "text-xs font-bold text-slate-800" }, "Patient UHID / ID"), demoMode && /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: handleQuickDemo,
        className: "text-[10.5px] font-bold text-[#155E9A] hover:underline flex items-center gap-1 cursor-pointer"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react23.Sparkles, { className: "w-3 h-3 text-[#7A4B2A]" }),
      " Development demo"
    )), /* @__PURE__ */ React.createElement(
      Input,
      {
        id: "patientId",
        placeholder: "e.g. SD-2026-9082",
        value: patientId,
        onChange: (e) => setPatientId(e.target.value),
        required: true,
        className: "h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#155E9A] text-sm font-medium rounded-[14px]"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "reportId", className: "text-xs font-bold text-slate-800" }, "Report Reference / Barcode ID"), /* @__PURE__ */ React.createElement(
      Input,
      {
        id: "reportId",
        placeholder: "e.g. REP-CKD-4412",
        value: reportId,
        onChange: (e) => setReportId(e.target.value),
        required: true,
        className: "h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#155E9A] text-sm font-medium rounded-[14px]"
      }
    )), /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "submit",
        disabled: loading,
        className: "w-full h-12 btn-primary rounded-[16px] font-bold text-sm shadow-md active:scale-[0.98] transition-all"
      },
      loading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_lucide_react23.Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Validating LIS Connection...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "Retrieve Digital PDF Report"), /* @__PURE__ */ React.createElement(import_lucide_react23.FileDown, { className: "w-4 h-4 ml-2" }))
    ), /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(import_lucide_react23.Lock, { className: "w-3 h-3 text-emerald-600" }), " 256-Bit Encrypted"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(import_lucide_react23.QrCode, { className: "w-3 h-3 text-blue-600" }), " ICMR QR Verified")))));
  }
  var import_react11, import_lucide_react23, import_meta6;
  var init_ReportDownloadModal = __esm({
    "src/components/ui/ReportDownloadModal.tsx"() {
      import_react11 = __require("react");
      init_dialog();
      init_button();
      init_input();
      init_label();
      import_lucide_react23 = __require("lucide-react");
      init_lis_client();
      init_analytics();
      import_meta6 = {};
    }
  });

  // src/components/Footer.tsx
  var Footer_exports = {};
  __export(Footer_exports, {
    Footer: () => Footer
  });
  function Footer() {
    const { quickLinks, services: services2, contact, description } = footer;
    const [activeModal, setActiveModal] = (0, import_react12.useState)(null);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("footer", { className: "relative pt-[clamp(2.5rem,1.5rem+3vw,4.5rem)] pb-[calc(env(safe-area-inset-bottom,16px)+6.5rem)] sm:pb-[clamp(2.5rem,1.5rem+3vw,4.5rem)] bg-[#071A2E] text-slate-300 border-t border-white/10 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none overflow-hidden z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-[20%] w-[40vw] h-[40vw] bg-[#C62828]/15 rounded-full blur-[100px] animate-liquid mix-blend-screen" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] bg-[#102A43]/40 rounded-full blur-[100px] animate-liquid mix-blend-screen", style: { animationDelay: "-5s" } })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-4 space-y-4" }, /* @__PURE__ */ React.createElement(Logo, { variant: "horizontal", inverted: true, size: "md" }), /* @__PURE__ */ React.createElement("p", { className: "text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal" }, description), /* @__PURE__ */ React.createElement("div", { className: "pt-2 flex flex-wrap gap-2.5" }, /* @__PURE__ */ React.createElement(ReportDownloadModal, { trigger: /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "inline-flex items-center gap-2 bg-[#155E9A] hover:bg-[#085a4b] text-white px-4 py-2.5 rounded-[16px] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react24.FileDown, { className: "w-4 h-4 text-emerald-200" }),
      /* @__PURE__ */ React.createElement("span", null, "Online Booking & Reports")
    ) }), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: contact.mapsLink,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 px-3.5 py-2.5 rounded-[16px] text-xs font-semibold transition-all hover:text-white"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react24.MapPin, { className: "w-3.5 h-3.5 text-teal-300" }),
      /* @__PURE__ */ React.createElement("span", null, "Google Maps"),
      /* @__PURE__ */ React.createElement(import_lucide_react24.ExternalLink, { className: "w-3 h-3 ml-0.5 text-slate-400" })
    )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-400 pt-1" }, /* @__PURE__ */ React.createElement(import_lucide_react24.ShieldCheck, { className: "w-4 h-4 text-emerald-400 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", null, "Quality-focused diagnostic testing"))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 space-y-2.5" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-xs uppercase tracking-wider text-slate-200" }, "Quick Links"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-1.5" }, quickLinks.map((link) => /* @__PURE__ */ React.createElement("li", { key: link.label }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: `#${link.href}`,
        className: "text-slate-400 hover:text-white text-xs transition-colors"
      },
      link.label
    ))))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-3 space-y-2.5" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-xs uppercase tracking-wider text-slate-200" }, "Lab Specialities"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-1.5" }, services2.map((service) => /* @__PURE__ */ React.createElement("li", { key: service.label, className: "text-slate-400 text-xs flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#C62828]" }), service.label)))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-3 space-y-2.5" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-[12px] uppercase tracking-wider text-slate-200" }, "24*7 Calling Desk & Center"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(import_lucide_react24.Phone, { className: "w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", { href: `tel:${contact.phone.replace(/\s/g, "")}`, className: "text-[#A1CDFB] hover:text-teal-300 font-bold transition-colors" }, contact.phone), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-[#F6F6F6] font-medium" }, "Home collection support"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(import_lucide_react24.PhoneCall, { className: "w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", { href: `tel:${contact.emergencyPhone.replace(/\s/g, "")}`, className: "text-[#FDF2C6] hover:text-amber-300 font-semibold transition-colors" }, contact.emergencyPhone), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-400" }, "Lab Director / Escalation line"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(import_lucide_react24.Mail, { className: "w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("a", { href: `mailto:${contact.email}`, className: "text-[#B2D3FC] hover:text-teal-300 transition-colors break-all" }, contact.email)), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(import_lucide_react24.MapPin, { className: "w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: contact.mapsLink,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-[#CDF1D4] hover:text-teal-300 transition-colors leading-relaxed"
      },
      contact.address
    )), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(import_lucide_react24.Clock, { className: "w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("div", { className: "text-slate-300 space-y-0.5" }, /* @__PURE__ */ React.createElement("p", { className: "text-[#B5F3DC] font-bold text-[12px]" }, "Hours: ", siteConfig.claims.operatingHours), /* @__PURE__ */ React.createElement("p", { className: "text-[12px] text-slate-400" }, "Emergency & walk-in samples anytime")))))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-white/10 pt-6 sm:pt-8 mt-10 flex flex-col sm:flex-row justify-between items-center gap-3.5 text-xs text-slate-400" }, /* @__PURE__ */ React.createElement("p", { className: "text-center sm:text-left text-[13px]" }, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Sawariya Diagnostic Lab. All diagnostic reports are confidential."), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 sm:gap-6 flex-wrap justify-center" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveModal("privacy"),
        className: "hover:text-slate-200 text-slate-400 transition-colors cursor-pointer"
      },
      "Privacy Policy"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveModal("terms"),
        className: "hover:text-slate-200 text-slate-400 transition-colors cursor-pointer"
      },
      "Terms & Patient Rights"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveModal("charter"),
        className: "hover:text-slate-200 text-slate-400 transition-colors cursor-pointer"
      },
      "Quality Charter & Charity Camps"
    ))))), /* @__PURE__ */ React.createElement(
      LegalModal,
      {
        type: activeModal,
        onClose: () => setActiveModal(null)
      }
    ));
  }
  var import_react12, import_lucide_react24;
  var init_Footer = __esm({
    "src/components/Footer.tsx"() {
      "use client";
      import_react12 = __require("react");
      init_site();
      import_lucide_react24 = __require("lucide-react");
      init_website_content();
      init_LegalModal();
      init_Logo();
      init_ReportDownloadModal();
    }
  });

  // src/main.tsx
  var import_client = __require("react-dom/client");
  var import_react_helmet_async2 = __require("react-helmet-async");

  // src/App.tsx
  var import_react13 = __require("react");

  // src/components/Hero.tsx
  var import_react3 = __require("react");
  var import_lucide_react7 = __require("lucide-react");
  init_button();
  init_input();

  // src/components/layout/Navbar.tsx
  init_site();
  var import_lucide_react5 = __require("lucide-react");
  init_button();
  init_Logo();
  init_website_content();

  // src/components/portal/PatientReportPortal.tsx
  var import_react2 = __require("react");
  init_dialog();
  init_button();
  init_input();
  var import_lucide_react4 = __require("lucide-react");

  // src/lib/serverless-db.ts
  var import_meta2 = {};
  var STORAGE_KEY_REPORTS = "sawariya_db_reports_v1";
  var STORAGE_KEY_BOOKINGS = "sawariya_db_bookings_v1";
  var SEED_REPORTS = [
    {
      id: "REP-CKD-4412",
      uhid: "SD-2026-9082",
      patientName: "Ramesh Kumar Sharma",
      testName: "Complete Blood Count (CBC) & HbA1c Panel",
      category: "Hematology & Diabetes",
      sampleCollectedAt: "2026-08-30 08:30 AM",
      reportGeneratedAt: "2026-08-30 02:15 PM",
      referringDoctor: "Dr. S. K. Gupta (MD Med)",
      consultantPathologist: "Dr. Vivek Verma (MD Pathology)",
      status: "Report Published",
      findings: [
        { parameter: "Hemoglobin (Hb)", value: 14.2, unit: "g/dL", referenceRange: "13.0 - 17.0", isAbnormal: false, status: "Normal" },
        { parameter: "Total Leucocyte Count (TLC)", value: 7800, unit: "cells/cu.mm", referenceRange: "4,000 - 11,000", isAbnormal: false, status: "Normal" },
        { parameter: "Platelet Count", value: 245e3, unit: "cells/cu.mm", referenceRange: "150,000 - 450,000", isAbnormal: false, status: "Normal" },
        { parameter: "RBC Count", value: 4.8, unit: "mill/cu.mm", referenceRange: "4.5 - 5.5", isAbnormal: false, status: "Normal" },
        { parameter: "Glycated Hemoglobin (HbA1c)", value: 5.6, unit: "%", referenceRange: "< 5.7 (Normal), 5.7-6.4 (Pre-diabetic)", isAbnormal: false, status: "Normal" },
        { parameter: "Estimated Avg Glucose (eAG)", value: 114, unit: "mg/dL", referenceRange: "90 - 120", isAbnormal: false, status: "Normal" }
      ],
      clinicalNotes: "All hematological parameters within biological reference intervals. Glycemic control is optimal.",
      qrVerificationCode: "ICMR-NABL-CKD-9082-4412-V2",
      fileSize: "412 KB"
    },
    {
      id: "REP-THY-8831",
      uhid: "SD-2026-9082",
      patientName: "Ramesh Kumar Sharma",
      testName: "Thyroid Profile Total (T3, T4, TSH)",
      category: "Endocrinology",
      sampleCollectedAt: "2026-08-15 09:00 AM",
      reportGeneratedAt: "2026-08-15 04:30 PM",
      referringDoctor: "Self / Preventive Health",
      consultantPathologist: "Dr. Vivek Verma (MD Pathology)",
      status: "Report Published",
      findings: [
        { parameter: "Triiodothyronine (Total T3)", value: 1.15, unit: "ng/mL", referenceRange: "0.80 - 2.00", isAbnormal: false, status: "Normal" },
        { parameter: "Thyroxine (Total T4)", value: 8.4, unit: "\xB5g/dL", referenceRange: "5.1 - 14.1", isAbnormal: false, status: "Normal" },
        { parameter: "Thyroid Stimulating Hormone (TSH)", value: 2.34, unit: "\xB5IU/mL", referenceRange: "0.27 - 4.20", isAbnormal: false, status: "Normal" }
      ],
      clinicalNotes: "Euthyroid state confirmed. Normal pituitary-thyroid axis function.",
      qrVerificationCode: "ICMR-NABL-CKD-9082-8831-V2",
      fileSize: "368 KB"
    },
    {
      id: "REP-LIP-7729",
      uhid: "SD-2026-9082",
      patientName: "Ramesh Kumar Sharma",
      testName: "Comprehensive Lipid Profile",
      category: "Biochemistry",
      sampleCollectedAt: "2026-07-10 08:00 AM",
      reportGeneratedAt: "2026-07-10 01:45 PM",
      referringDoctor: "Dr. S. K. Gupta (MD Med)",
      consultantPathologist: "Dr. Vivek Verma (MD Pathology)",
      status: "Report Published",
      findings: [
        { parameter: "Total Cholesterol", value: 184, unit: "mg/dL", referenceRange: "< 200 (Desirable)", isAbnormal: false, status: "Normal" },
        { parameter: "HDL Cholesterol (Good)", value: 48, unit: "mg/dL", referenceRange: "> 40 (Optimal)", isAbnormal: false, status: "Normal" },
        { parameter: "LDL Cholesterol (Bad)", value: 108, unit: "mg/dL", referenceRange: "< 100 (Optimal), 100-129 (Near Optimal)", isAbnormal: false, status: "Normal" },
        { parameter: "Triglycerides", value: 140, unit: "mg/dL", referenceRange: "< 150 (Normal)", isAbnormal: false, status: "Normal" },
        { parameter: "VLDL Cholesterol", value: 28, unit: "mg/dL", referenceRange: "5 - 30", isAbnormal: false, status: "Normal" }
      ],
      clinicalNotes: "Lipid profile is within acceptable cardiovascular protection range. Continue balanced diet and exercise.",
      qrVerificationCode: "ICMR-NABL-CKD-9082-7729-V2",
      fileSize: "390 KB"
    }
  ];
  var ServerlessDB = {
    /**
     * Search reports by UHID or Report ID (RLS Protected)
     */
    getReportsByPatient: async (query) => {
      if (import_meta2.env.VITE_DEMO_MODE !== "true") return [];
      await new Promise((r2) => setTimeout(r2, 450));
      const normalized = query.trim().toUpperCase();
      let storedReports = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
        if (raw) {
          storedReports = JSON.parse(raw);
        } else {
          storedReports = SEED_REPORTS;
          localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(SEED_REPORTS));
        }
      } catch {
        storedReports = SEED_REPORTS;
      }
      if (!normalized) return storedReports;
      return storedReports.filter(
        (r2) => r2.uhid.toUpperCase().includes(normalized) || r2.id.toUpperCase().includes(normalized) || r2.patientName.toUpperCase().includes(normalized)
      );
    },
    /**
     * Retrieve single verified report
     */
    getReportById: async (reportId) => {
      const all = await ServerlessDB.getReportsByPatient("");
      return all.find((r2) => r2.id.toUpperCase() === reportId.trim().toUpperCase()) || null;
    },
    /**
     * Create a new test booking
     */
    createBooking: async (bookingData) => {
      if (import_meta2.env.VITE_DEMO_MODE !== "true") throw new Error("Durable booking API is not configured");
      await new Promise((r2) => setTimeout(r2, 600));
      const id = `BOOK-${Date.now().toString().slice(-6)}`;
      const newBooking = {
        ...bookingData,
        id,
        bookingDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        status: "ORDER_PLACED"
      };
      try {
        const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
        const list = raw ? JSON.parse(raw) : [];
        list.unshift(newBooking);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(list));
      } catch (e) {
        console.error("Failed to store booking", e);
      }
      return newBooking;
    },
    /**
     * Get all active bookings
     */
    getBookings: async (phoneOrName) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
        const list = raw ? JSON.parse(raw) : [];
        if (!phoneOrName) return list;
        return list.filter(
          (b) => b.phone.includes(phoneOrName) || b.patientName.toLowerCase().includes(phoneOrName.toLowerCase()) || b.id.toLowerCase().includes(phoneOrName.toLowerCase())
        );
      } catch {
        return [];
      }
    },
    /**
     * Get patient historic biomarker trends
     */
    getBiomarkerTrends: async (uhid) => {
      return {
        "Hemoglobin (g/dL)": [
          { date: "2026-03-10", value: 13.8, unit: "g/dL", label: "CBC", reference: "13.0 - 17.0" },
          { date: "2026-05-22", value: 14, unit: "g/dL", label: "CBC", reference: "13.0 - 17.0" },
          { date: "2026-08-30", value: 14.2, unit: "g/dL", label: "CBC", reference: "13.0 - 17.0" }
        ],
        "HbA1c Glycated Sugar (%)": [
          { date: "2026-01-15", value: 5.9, unit: "%", label: "HbA1c", reference: "< 5.7" },
          { date: "2026-04-18", value: 5.8, unit: "%", label: "HbA1c", reference: "< 5.7" },
          { date: "2026-08-30", value: 5.6, unit: "%", label: "HbA1c", reference: "< 5.7" }
        ],
        "Total Cholesterol (mg/dL)": [
          { date: "2025-11-20", value: 205, unit: "mg/dL", label: "Lipid", reference: "< 200" },
          { date: "2026-03-12", value: 192, unit: "mg/dL", label: "Lipid", reference: "< 200" },
          { date: "2026-07-10", value: 184, unit: "mg/dL", label: "Lipid", reference: "< 200" }
        ]
      };
    }
  };

  // src/components/portal/PatientReportPortal.tsx
  init_SEOHead();
  var import_sonner2 = __require("sonner");
  var import_meta3 = {};
  function PatientReportPortal({
    trigger,
    isOpen: externalOpen,
    onOpenChange: externalOnOpenChange,
    defaultUhid
  }) {
    const [internalOpen, setInternalOpen] = (0, import_react2.useState)(false);
    const open = externalOpen !== void 0 ? externalOpen : internalOpen;
    const setOpen = externalOnOpenChange || setInternalOpen;
    const demoMode = import_meta3.env.VITE_DEMO_MODE === "true";
    const [searchQuery, setSearchQuery] = (0, import_react2.useState)(defaultUhid || "");
    const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
    const [reports, setReports] = (0, import_react2.useState)([]);
    const [selectedReport, setSelectedReport] = (0, import_react2.useState)(null);
    const [activeTab, setActiveTab] = (0, import_react2.useState)("REPORTS");
    const [trends, setTrends] = (0, import_react2.useState)({});
    const handleSearch = async (queryToSearch) => {
      const q = queryToSearch !== void 0 ? queryToSearch : searchQuery;
      if (!q) {
        import_sonner2.toast.error("Please enter a Patient UHID or Report ID");
        return;
      }
      setIsLoading(true);
      try {
        const results = await ServerlessDB.getReportsByPatient(q);
        setReports(results);
        if (results.length > 0) {
          setSelectedReport(results[0]);
          const trendData = await ServerlessDB.getBiomarkerTrends(results[0].uhid);
          setTrends(trendData);
          import_sonner2.toast.success(`Found ${results.length} certified laboratory records`);
        } else {
          import_sonner2.toast.error("No report found. Check the reference or contact the lab.");
        }
      } catch {
        import_sonner2.toast.error("Failed to query serverless database");
      } finally {
        setIsLoading(false);
      }
    };
    (0, import_react2.useEffect)(() => {
      if (open && demoMode) {
        ServerlessDB.getReportsByPatient("SD-2026-9082").then((results) => {
          setReports(results);
          if (results.length > 0) {
            setSelectedReport(results[0]);
            ServerlessDB.getBiomarkerTrends(results[0].uhid).then((trendData) => {
              setTrends(trendData);
            });
          }
        });
      }
    }, [open]);
    const handlePrint = () => {
      window.print();
    };
    const handleDownloadPDF = async () => {
      if (!selectedReport) return;
      try {
        await Promise.resolve().then(() => (init_lis_client(), lis_client_exports)).then(({ LISClient: LISClient2 }) => LISClient2.downloadReport(selectedReport.uhid, selectedReport.id));
      } catch {
      }
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement(
      SEOHead,
      {
        title: "Patient Lab Reports & Digital Sample Tracking Portal | Sawariya Diagnostic",
        description: "Download doctor-signed certified pathology reports, verify QR codes, and track your lab sample live.",
        canonicalUrl: "https://sawariyadiagnostic.github.io/sawariyadiagnostic/portal/reports.html"
      }
    ), /* @__PURE__ */ React.createElement(Dialog, { open, onOpenChange: setOpen }, trigger && /* @__PURE__ */ React.createElement(DialogTrigger, { asChild: true }, trigger), /* @__PURE__ */ React.createElement(DialogContent, { className: "sm:max-w-[840px] max-h-[92vh] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#102A43] p-5 sm:p-6 text-white relative overflow-hidden flex-shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#C62828]" }, /* @__PURE__ */ React.createElement(import_lucide_react4.FileText, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 text-xs font-bold text-teal-300" }, /* @__PURE__ */ React.createElement(import_lucide_react4.ShieldCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Secure Digital Report Portal")), /* @__PURE__ */ React.createElement(DialogTitle, { className: "text-xl sm:text-2xl font-black text-white tracking-tight" }, "Patient Health Records & Reports Portal"))), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        disabled: !demoMode,
        onClick: () => {
          setSearchQuery("SD-2026-9082");
          handleSearch("SD-2026-9082");
        },
        className: "bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs text-teal-100 flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer disabled:cursor-default"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react4.Sparkles, { className: "w-3.5 h-3.5 text-[#FDE047]" }),
      /* @__PURE__ */ React.createElement("span", null, demoMode ? "Development demo data" : "Secure report lookup")
    )), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex flex-col sm:flex-row gap-2 relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex-1" }, /* @__PURE__ */ React.createElement(import_lucide_react4.Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        placeholder: "Enter Patient UHID or Report ID (e.g. SD-2026-9082)...",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && handleSearch(),
        className: "pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-slate-300 rounded-[14px] text-xs sm:text-sm font-medium focus:border-teal-300"
      }
    )), /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: () => handleSearch(),
        disabled: isLoading,
        className: "h-11 px-5 btn-primary rounded-[14px] text-xs font-bold cursor-pointer"
      },
      isLoading ? "Querying LIS..." : "Search Records"
    )), /* @__PURE__ */ React.createElement("div", { className: "mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-teal-100/90 relative z-10" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }), "Tip: Your UHID / Bill No. is printed on the top-right of your laboratory receipt or SMS."), /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1 text-teal-300 font-semibold" }, /* @__PURE__ */ React.createElement(import_lucide_react4.Lock, { className: "w-3 h-3 text-teal-300" }), "256-Bit Encrypted & HIPAA Compliant")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-3 pt-3 border-t border-white/10" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("REPORTS"),
        className: `px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "REPORTS" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "Verified Pathology Reports (",
      reports.length,
      ")"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("TRACKER"),
        className: `px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "TRACKER" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "Live Sample Tracking"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("TRENDS"),
        className: `px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === "TRENDS" ? "bg-white text-[#102A43]" : "text-teal-200 hover:text-white"}`
      },
      "Biomarker History & Trends"
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50" }, activeTab === "REPORTS" && /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-12 gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-4 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider" }, "Available Lab Records"), reports.map((r2) => {
      const isSelected = selectedReport?.id === r2.id;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: r2.id,
          onClick: () => setSelectedReport(r2),
          className: `p-3.5 rounded-[18px] border transition-all cursor-pointer text-left ${isSelected ? "bg-white border-[#155E9A] shadow-md ring-1 ring-[#155E9A]" : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-[#155E9A] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200" }, r2.id), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 font-medium" }, r2.reportGeneratedAt.split(" ")[0])),
        /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-slate-900 leading-snug line-clamp-1 mb-1" }, r2.testName),
        /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 font-medium" }, "Patient: ", r2.patientName)
      );
    }), reports.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-8 bg-white rounded-[20px] border border-slate-200 p-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "No reports found for this UHID."))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-8" }, selectedReport ? /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-[24px] border border-slate-200 shadow-sm p-5 sm:p-7 space-y-5 print:p-0 print:border-none print:shadow-none" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between border-b border-slate-200 pb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-base sm:text-lg font-black text-[#102A43] tracking-tight" }, "SAWARIYA DIAGNOSTIC LAB"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-500" }, "Opp. R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri (HR)"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-teal-700 font-semibold" }, "DIAGNOSTIC REPORT \u2022 CONFIDENTIAL \u2022 VERIFY BEFORE USE")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full" }, /* @__PURE__ */ React.createElement(import_lucide_react4.CheckCircle2, { className: "w-3 h-3 text-emerald-600" }), /* @__PURE__ */ React.createElement("span", null, "Doctor Verified")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-slate-400 mt-1" }, "Ref: ", selectedReport.id))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-[16px] border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Patient Name:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, selectedReport.patientName)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Patient UHID:"), /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-slate-800" }, selectedReport.uhid)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Sample Date:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-800" }, selectedReport.sampleCollectedAt)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Referring Doctor:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800" }, selectedReport.referringDoctor)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Test Department:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800" }, selectedReport.category)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block font-medium" }, "Reporting Date:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-800" }, selectedReport.reportGeneratedAt))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-slate-900 mb-2 uppercase tracking-wide" }, selectedReport.testName, " - Test Results"), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-xs text-left" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-slate-100 text-slate-700 font-bold border-y border-slate-200" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "py-2 px-3" }, "Test Parameter"), /* @__PURE__ */ React.createElement("th", { className: "py-2 px-3" }, "Observed Value"), /* @__PURE__ */ React.createElement("th", { className: "py-2 px-3" }, "Unit"), /* @__PURE__ */ React.createElement("th", { className: "py-2 px-3" }, "Biological Reference"), /* @__PURE__ */ React.createElement("th", { className: "py-2 px-3" }, "Status"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100 font-medium" }, selectedReport.findings.map((f, i) => /* @__PURE__ */ React.createElement("tr", { key: i, className: "hover:bg-slate-50/80" }, /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-semibold text-slate-900" }, f.parameter), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-bold text-[#102A43]" }, f.value), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-500" }, f.unit), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600 text-[11px]" }, f.referenceRange), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md" }, f.status)))))))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3 rounded-[16px] border border-slate-200 text-xs space-y-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800 block text-[11px]" }, "Pathologist Interpretation:"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 text-[11px] leading-relaxed" }, selectedReport.clinicalNotes)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-2 border-t border-slate-200 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 border border-slate-200" }, /* @__PURE__ */ React.createElement(import_lucide_react4.QrCode, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[9.5px] font-bold text-slate-500" }, "QR CODE VERIFICATION"), /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[10px] text-slate-700" }, selectedReport.qrVerificationCode))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-400 font-serif italic" }, "Digitally Signed & Validated"), /* @__PURE__ */ React.createElement("div", { className: "font-bold text-slate-900" }, selectedReport.consultantPathologist), /* @__PURE__ */ React.createElement("div", { className: "text-[9.5px] text-slate-500" }, "Consultant Pathologist (Reg: HR-MC-14902)"))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 pt-2 print:hidden" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: handleDownloadPDF,
        className: "flex-1 h-11 btn-primary rounded-[14px] text-xs font-bold gap-1.5"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react4.FileDown, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, "Download Certified PDF Report (", selectedReport.fileSize, ")")
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "outline",
        onClick: handlePrint,
        className: "h-11 px-4 rounded-[14px] text-xs font-bold gap-1.5 border-slate-200"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react4.Printer, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, "Print")
    ))) : /* @__PURE__ */ React.createElement("div", { className: "text-center py-12 bg-white rounded-[24px] border border-slate-200 p-6" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Select a report from the list to view results.")))), activeTab === "TRACKER" && /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-[24px] border border-slate-200 p-6 space-y-6 max-w-2xl mx-auto" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-[#155E9A] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-full" }, "Real-time LIS Telemetry"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-slate-900 mt-1" }, "Sample Processing Timeline"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Track the end-to-end journey of your blood and pathology sample")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 relative pl-6 border-l-2 border-[#155E9A]" }, [
      { step: "1. Order Registered & Phlebotomist Assigned", time: "08:00 AM", done: true, desc: "Technician dispatched with temperature-controlled cool box." },
      { step: "2. Home Sample Collected with Barcode Scan", time: "08:35 AM", done: true, desc: "Vacuum tube barcoded and verified against Patient UHID SD-2026-9082." },
      { step: "3. Automated Analyzer Processing (Roche/Sysmex)", time: "10:15 AM", done: true, desc: "Sample centrifuged and processed through dual 5-part hematology analyzers." },
      { step: "4. Doctor Review & Clinical Sign-off", time: "01:45 PM", done: true, desc: "Dr. Vivek Verma verified calibration controls and approved results." },
      { step: "5. Certified Digital Report Published", time: "02:15 PM", done: true, desc: "Report availability and delivery depend on the configured LIS/notification workflow." }
    ].map((s, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#155E9A] border-2 border-white shadow-xs" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs sm:text-sm text-slate-900" }, s.step), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md font-bold" }, s.time)), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 mt-0.5" }, s.desc))))), activeTab === "TRENDS" && /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-[24px] border border-slate-200 p-6 space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-slate-900" }, "Patient Health Trend Analytics"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Multi-month comparative analysis of key biomarkers for UHID SD-2026-9082")), /* @__PURE__ */ React.createElement(import_lucide_react4.TrendingUp, { className: "w-6 h-6 text-[#155E9A]" })), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-3 gap-4" }, Object.entries(trends).map(([marker, data]) => /* @__PURE__ */ React.createElement("div", { key: marker, className: "bg-slate-50 border border-slate-200 rounded-[20px] p-4 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-xs text-slate-900" }, marker), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 font-mono" }, "Ref: ", data[0]?.reference)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, data.map((point, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "flex items-center justify-between text-xs bg-white p-2 rounded-[12px] border border-slate-100" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 text-[11px]" }, point.date), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-[#155E9A]" }, point.value, " ", point.unit)))), /* @__PURE__ */ React.createElement("div", { className: "text-[10.5px] text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-[12px] font-medium flex items-center gap-1" }, /* @__PURE__ */ React.createElement(import_lucide_react4.CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", null, "Stable trend within healthy reference interval"))))))))));
  }

  // src/components/layout/Navbar.tsx
  function Navbar({
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    scrollToSection
  }) {
    return /* @__PURE__ */ React.createElement("header", { className: "fixed top-0 left-0 right-0 w-full z-[110] transition-all duration-300 pt-[env(safe-area-inset-top,0px)]" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-slate-200 text-xs py-1.5 px-4 hidden sm:block border-b border-teal-500/25" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-7xl mx-auto flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1.5 text-[#FDE047] font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#C62828] animate-pulse" }), "Diagnostic testing \u2022 Home collection"), /* @__PURE__ */ React.createElement("span", { className: "text-teal-400/50" }, "|"), /* @__PURE__ */ React.createElement("span", { className: "text-teal-100 font-medium" }, "Serving Charkhi Dadri \u2014 details subject to current availability")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: telHref(siteConfig.contact.phone),
        className: "flex items-center gap-1.5 text-[#FDE047] font-bold hover:text-white transition-colors"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react5.Phone, { className: "w-3.5 h-3.5 text-[#FDE047]" }),
      /* @__PURE__ */ React.createElement("span", null, "Lab contact: ", siteConfig.contact.phone)
    )))), /* @__PURE__ */ React.createElement("div", { className: `w-full min-h-[68px] sm:min-h-[76px] py-2 flex items-center px-3.5 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "bg-white/70 backdrop-blur-[30px] border-b border-white/60 shadow-[0_4px_32px_rgba(0,0,0,0.06)]" : "bg-white/80 backdrop-blur-2xl border-b border-white/40 shadow-2xs"}` }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "cursor-pointer group flex-shrink-0 flex items-center select-none",
        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" })
      },
      /* @__PURE__ */ React.createElement(Logo, { variant: "horizontal", size: "sm", showTagline: true })
    ), /* @__PURE__ */ React.createElement("nav", { className: "hidden lg:flex items-center space-x-1 bg-white/40 p-1 rounded-full border border-white/80 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)]" }, navigation.links.map((link) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: link.href,
        onClick: () => scrollToSection(link.href),
        className: "px-4 py-1.5 rounded-full text-xs font-bold tracking-tight text-slate-700 hover:text-[#155E9A] hover:bg-white/90 hover:shadow-2xs transition-all duration-300 cursor-pointer active:scale-[0.97]"
      },
      link.label
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "hidden sm:block" }, /* @__PURE__ */ React.createElement(PatientReportPortal, { trigger: /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "inline-flex items-center gap-1.5 text-xs font-bold h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-slate-800 hover:border-[#155E9A] hover:bg-white hover:text-[#155E9A] transition-all shadow-xs active:scale-[0.97] cursor-pointer"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react5.FileDown, { className: "w-3.5 h-3.5 text-[#155E9A]" }),
      /* @__PURE__ */ React.createElement("span", null, "Patient Portal")
    ) })), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "sm",
        className: "hidden md:inline-flex bg-gradient-to-r from-[#102A43] to-[#155E9A] text-white hover:opacity-90 h-10 px-5 rounded-[18px] text-xs font-bold shadow-[0_4px_12px_rgba(10,110,92,0.2)] active:scale-[0.97] transition-all cursor-pointer",
        onClick: () => scrollToSection("home-collection")
      },
      /* @__PURE__ */ React.createElement("span", null, "Book Home Visit")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
        className: "lg:hidden w-10 h-10 flex items-center justify-center rounded-[14px] text-slate-700 bg-white/80 backdrop-blur-md hover:bg-white transition-all border border-slate-200/90 shadow-2xs active:scale-95 cursor-pointer",
        "aria-label": isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
      },
      isMobileMenuOpen ? /* @__PURE__ */ React.createElement(import_lucide_react5.X, { className: "w-5 h-5 text-slate-900" }) : /* @__PURE__ */ React.createElement(import_lucide_react5.Menu, { className: "w-5 h-5 text-slate-900" })
    )))));
  }

  // src/components/layout/MobileMenu.tsx
  init_site();
  var import_lucide_react6 = __require("lucide-react");
  init_button();
  init_Logo();
  init_website_content();
  function MobileMenu({ isOpen, onClose, scrollToSection }) {
    if (!isOpen) return null;
    const handleWhatsApp = () => {
      const encoded = encodeURIComponent("Hi, I want to book a blood test or health package at Sawariya Diagnostic.");
      const url = whatsappHref("Hi, I want to book a test at Sawariya Diagnostic.");
      if (url) window.open(url, "_blank");
      onClose();
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-[120] transition-opacity duration-300",
        onClick: onClose
      }
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "lg:hidden fixed top-0 right-0 h-full w-[340px] max-w-[88vw] bg-white/70 backdrop-blur-[40px] border-l border-white/60 z-[130] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col justify-between overflow-y-auto pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] transition-transform duration-300"
      },
      /* @__PURE__ */ React.createElement("div", { className: "p-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-black/[0.06]" }, /* @__PURE__ */ React.createElement(Logo, { variant: "horizontal", size: "xs", showTagline: false }), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: onClose,
          className: "w-9 h-9 flex items-center justify-center rounded-full text-slate-700 bg-white/60 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-90 transition-all cursor-pointer border border-white/80",
          "aria-label": "Close Menu"
        },
        /* @__PURE__ */ React.createElement(import_lucide_react6.X, { className: "w-4 h-4" })
      )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-1.5 pt-4" }, navigation.links.map((link) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: link.href,
          onClick: () => {
            scrollToSection(link.href);
            onClose();
          },
          className: "flex items-center justify-between px-4 py-3 text-slate-800 hover:text-[#155E9A] hover:bg-white/60 active:bg-white/80 rounded-[16px] font-semibold text-sm transition-all duration-150 active:scale-[0.98] border border-transparent hover:border-white/60 hover:shadow-2xs cursor-pointer"
        },
        /* @__PURE__ */ React.createElement("span", null, link.label),
        /* @__PURE__ */ React.createElement(import_lucide_react6.ChevronRight, { className: "w-4 h-4 text-slate-400" })
      ))), /* @__PURE__ */ React.createElement("div", { className: "mt-5 space-y-2.5 pt-4 border-t border-black/[0.06]" }, /* @__PURE__ */ React.createElement(
        Button,
        {
          className: "w-full btn-primary h-12 text-sm font-bold shadow-md rounded-[16px] active:scale-[0.97]",
          onClick: () => {
            scrollToSection("home-collection");
            onClose();
          }
        },
        /* @__PURE__ */ React.createElement(import_lucide_react6.Home, { className: "w-4 h-4 mr-2" }),
        "Book Home Sample Visit"
      ), /* @__PURE__ */ React.createElement(PatientReportPortal, { trigger: /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "w-full h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-[16px] text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-2xs cursor-pointer",
          onClick: onClose
        },
        /* @__PURE__ */ React.createElement(import_lucide_react6.FileDown, { className: "w-4 h-4 text-[#155E9A]" }),
        /* @__PURE__ */ React.createElement("span", null, "Patient Reports Portal")
      ) }), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleWhatsApp,
          className: "w-full h-12 btn-emerald text-xs sm:text-sm font-bold rounded-[16px] flex items-center justify-center gap-2 active:scale-[0.97] shadow-xs cursor-pointer"
        },
        /* @__PURE__ */ React.createElement(import_lucide_react6.MessageCircle, { className: "w-4 h-4 text-white", fill: "white" }),
        /* @__PURE__ */ React.createElement("span", null, "WhatsApp Doctor Consultation")
      ))),
      /* @__PURE__ */ React.createElement("div", { className: "glass-card p-4 m-3 bg-white/60 rounded-[20px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs text-[#155E9A] font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#C62828] animate-pulse" }), "Diagnostic Laboratory"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 font-medium" }, "Charkhi Dadri")), /* @__PURE__ */ React.createElement(
        "a",
        {
          href: telHref(siteConfig.contact.phone),
          className: "flex items-center justify-center gap-2 bg-[#102A43] text-white rounded-[14px] py-3 px-4 text-xs font-bold shadow-xs hover:bg-[#102A43] active:scale-[0.97] transition-all"
        },
        /* @__PURE__ */ React.createElement(import_lucide_react6.Phone, { className: "w-4 h-4 text-[#FDE047]" }),
        /* @__PURE__ */ React.createElement("span", null, "Contact lab: ", siteConfig.contact.phone)
      ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500 font-medium" }, /* @__PURE__ */ React.createElement(import_lucide_react6.ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600" }), /* @__PURE__ */ React.createElement("span", null, "Diagnostic facility details to be confirmed")))
    ));
  }

  // src/components/Hero.tsx
  init_Logo();
  function Hero() {
    const [isScrolled, setIsScrolled] = (0, import_react3.useState)(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react3.useState)(false);
    const [searchQuery, setSearchQuery] = (0, import_react3.useState)("");
    (0, import_react3.useEffect)(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 30);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    (0, import_react3.useEffect)(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isMobileMenuOpen]);
    const handleSearch = (e) => {
      e.preventDefault();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sawariya:search", { detail: { query: searchQuery, tab: "tests" } }));
      }
      const testsSection = document.getElementById("tests");
      testsSection?.scrollIntoView({ behavior: "smooth" });
    };
    const handleQuickTagClick = (tag) => {
      setSearchQuery(tag);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sawariya:search", { detail: { query: tag, tab: "tests" } }));
      }
      const testsSection = document.getElementById("tests");
      testsSection?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    };
    const quickSearchTags = [
      { label: "CBC Blood Count", color: "bg-blue-50 text-blue-900 border-blue-200/80 hover:bg-blue-100" },
      { label: "Thyroid (T3 T4 TSH)", color: "bg-purple-50 text-purple-900 border-purple-200/80 hover:bg-purple-100" },
      { label: "Vitamin D3 & B12", color: "bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100" },
      { label: "Lipid (Cholesterol)", color: "bg-emerald-50 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100" },
      { label: "HbA1c Diabetes", color: "bg-cyan-50 text-cyan-900 border-cyan-200/80 hover:bg-cyan-100" }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "relative min-h-screen w-full overflow-hidden bg-[#FBFBFD]" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-300/30 blur-[100px] animate-liquid mix-blend-multiply" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-200/20 blur-[100px] animate-liquid mix-blend-multiply", style: { animationDelay: "-6s" } }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-cyan-200/20 blur-[120px] animate-liquid mix-blend-multiply", style: { animationDelay: "-12s" } })), /* @__PURE__ */ React.createElement(
      Navbar,
      {
        isScrolled,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        scrollToSection
      }
    ), /* @__PURE__ */ React.createElement(
      MobileMenu,
      {
        isOpen: isMobileMenuOpen,
        onClose: () => setIsMobileMenuOpen(false),
        scrollToSection
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 pt-[clamp(6rem,4rem+6vw,9rem)] pb-[clamp(3rem,2rem+4vw,6rem)] fluid-container" }, /* @__PURE__ */ React.createElement("div", { className: "w-full glass-card p-[clamp(1rem,4vw,3rem)] rounded-[clamp(1.25rem,1rem+2vw,3rem)] border border-white/60 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7 w-full min-w-0 space-y-5 sm:space-y-6 animate-slide-in-left" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 px-3.5 py-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-full" }, /* @__PURE__ */ React.createElement("span", { className: "flex h-2 w-2 relative flex-shrink-0" }, /* @__PURE__ */ React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C62828] opacity-75" }), /* @__PURE__ */ React.createElement("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-[#155E9A]" })), /* @__PURE__ */ React.createElement("span", { className: "text-[10.5px] sm:text-[11.5px] md:text-xs font-bold tracking-tight text-slate-800 truncate" }, "NABL Certified Quality ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, "\u2022"), " ", /* @__PURE__ */ React.createElement("span", { className: "text-[#155E9A]" }, "24*7 Active Lab"), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline text-slate-400" }, " \u2022 "), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, "Charkhi Dadri"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 sm:space-y-3" }, /* @__PURE__ */ React.createElement("h1", { className: "text-[clamp(2rem,1.3rem+3.5vw,3.75rem)] font-black text-[#1D1D1F] tracking-tight leading-[1.08] break-words" }, "Precision Pathology.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#C62828]" }, "Peace of Mind at Home.")), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base md:text-lg text-slate-700 max-w-xl font-medium leading-relaxed" }, "Clear test information, convenient collection requests, and secure report access when connected to the lab workflow.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 w-full max-w-xl" }, /* @__PURE__ */ React.createElement("form", { onSubmit: handleSearch, className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center bg-white/70 backdrop-blur-md border border-white/60 rounded-[20px] sm:rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-[#155E9A]/40 focus-within:bg-white focus-within:border-[#155E9A] focus-within:ring-2 focus-within:ring-[#155E9A]/15 transition-all p-1 sm:p-1.5 duration-300" }, /* @__PURE__ */ React.createElement(import_lucide_react7.Search, { className: "w-4 h-4 text-slate-500 ml-2.5 sm:ml-3 flex-shrink-0" }), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        placeholder: "Search tests...",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        className: "border-0 shadow-none focus-visible:ring-0 text-slate-900 font-bold text-xs sm:text-sm placeholder:text-slate-500 bg-transparent px-2 sm:px-2.5 h-10 sm:h-12 w-full min-w-0"
      }
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "submit",
        className: "bg-gradient-to-r from-[#102A43] to-[#155E9A] text-white hover:opacity-90 rounded-[14px] sm:rounded-[18px] px-3.5 sm:px-6 h-10 sm:h-12 text-xs sm:text-sm font-bold flex-shrink-0 shadow-[0_4px_12px_rgba(10,110,92,0.2)] active:scale-95 transition-all"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react7.Search, { className: "w-3.5 h-3.5 mr-1 hidden sm:inline" }),
      /* @__PURE__ */ React.createElement("span", null, "Find Test")
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 w-full max-w-full scrollbar-none text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-500 mr-1 text-[11px] uppercase tracking-wider whitespace-nowrap flex-shrink-0" }, "Popular:"), quickSearchTags.map((tag) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tag.label,
        type: "button",
        onClick: () => handleQuickTagClick(tag.label),
        className: `h-7 sm:h-8 px-2.5 sm:px-3 rounded-[12px] bg-white/50 backdrop-blur-sm border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[10.5px] sm:text-[11px] font-bold text-slate-700 hover:bg-white/80 hover:text-[#155E9A] hover:border-[#155E9A]/30 transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center whitespace-nowrap flex-shrink-0`
      },
      tag.label
    )))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 w-full max-w-xl" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "xl",
        className: "btn-primary w-full sm:w-auto h-12 sm:h-14 px-5 sm:px-8 text-xs sm:text-sm md:text-base font-bold rounded-[18px] sm:rounded-[20px] shadow-md hover:shadow-lg active:scale-[0.97] min-w-0",
        onClick: () => scrollToSection("home-collection")
      },
      /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Book Doorstep Sample"),
      /* @__PURE__ */ React.createElement(import_lucide_react7.ArrowRight, { className: "w-4 h-4 ml-1.5 shrink-0" })
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "xl",
        variant: "outline",
        className: "w-full sm:w-auto h-12 sm:h-14 px-5 sm:px-8 text-xs sm:text-sm md:text-base font-bold rounded-[18px] sm:rounded-[20px] bg-white hover:bg-slate-50 border-black/[0.08] text-slate-800 shadow-2xs hover:shadow-sm active:scale-[0.97] min-w-0",
        onClick: () => scrollToSection("tests")
      },
      /* @__PURE__ */ React.createElement("span", { className: "truncate" }, "Explore Health Packages")
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-black/[0.06] w-full max-w-xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-blue-50 flex items-center justify-center border border-blue-200/80 flex-shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react7.Clock, { className: "w-4 h-4 text-blue-700" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate" }, "Same Day"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] sm:text-[11px] text-slate-500 truncate" }, "6h Digital Report"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-emerald-50 flex items-center justify-center border border-emerald-200/80 flex-shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react7.CheckCircle2, { className: "w-4 h-4 text-emerald-700" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate" }, "Quality"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] sm:text-[11px] text-slate-500 truncate" }, "Clinical Accuracy"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-amber-50 flex items-center justify-center border border-amber-200/80 flex-shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react7.ShieldCheck, { className: "w-4 h-4 text-amber-700" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate" }, "7,000+"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] sm:text-[11px] text-slate-500 truncate" }, "Patients in 2026"))))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0 w-full min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-full max-w-full sm:max-w-[430px] mx-auto min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -inset-1.5 bg-gradient-to-tr from-[#155E9A]/20 via-[#C62828]/15 to-[#C62828]/15 rounded-[34px] blur-2xl opacity-70 pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "relative bg-white/95 backdrop-blur-2xl rounded-[22px] sm:rounded-[27px] border-0 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-2 pb-3 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement(Logo, { variant: "horizontal", size: "xs", showTagline: false }), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-400 mt-0.5 font-medium truncate" }, "Sample #SD-2026-9082 \u2022 MD Sign-off")), /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] sm:text-[10.5px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-200 shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react7.CheckCircle2, { className: "w-3 h-3 text-emerald-600 shrink-0" }), " Verified")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 bg-slate-50/90 p-3 rounded-[16px] border border-slate-100 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider" }, "Test Specimen"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800 text-xs sm:text-sm truncate block" }, "Complete Blood Count")), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider" }, "Collection Mode"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-[#155E9A] text-xs sm:text-sm flex items-center gap-1 truncate" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#C62828] animate-pulse shrink-0" }), " Free Home Visit (\u20B90)"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 sm:space-y-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-700 text-xs font-bold" }, "Hemoglobin (Hb)"), /* @__PURE__ */ React.createElement("span", { className: "text-teal-900 font-bold text-xs" }, "14.2 g/dL ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 font-normal" }, "(Optimal)"))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 h-2 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#C62828] to-[#155E9A] h-full rounded-full w-[78%]" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-700 text-xs font-bold" }, "Thyroid (TSH)"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-900 font-bold text-xs" }, "2.4 mIU/L ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 font-normal" }, "(Normal)"))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 h-2 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#581C87] to-[#A855F7] h-full rounded-full w-[60%]" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs font-semibold mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-700 text-xs font-bold" }, "Fasting Glucose"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-900 font-bold text-xs" }, "92 mg/dL ", /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 font-normal" }, "(Healthy)"))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 h-2 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-[#065F46] to-[#10B981] h-full rounded-full w-[52%]" })))), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#102A43]/10 flex items-center justify-center text-[#102A43] shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react7.Stethoscope, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-bold text-slate-800 truncate" }, "Dr. Radhika Vashisth"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-500 truncate" }, "Chief Pathologist (MD)"))), /* @__PURE__ */ React.createElement("div", { className: "text-right shrink-0" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9px] text-slate-400 block font-medium" }, "Verification"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] sm:text-[10.5px] font-mono font-bold text-[#155E9A] flex items-center gap-1 justify-end" }, /* @__PURE__ */ React.createElement(import_lucide_react7.FileCheck, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }), " QR-Secured"))))))))));
  }

  // src/components/TrustIndicators.tsx
  var import_framer_motion = __require("framer-motion");
  var import_lucide_react8 = __require("lucide-react");
  function TrustIndicators() {
    const stats = [
      {
        icon: import_lucide_react8.Users,
        value: "7,000+",
        label: "Patients in 2026",
        subtext: "Across Haryana & NCR",
        theme: {
          card: "hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white",
          iconBg: "bg-blue-50 text-blue-800 border-blue-200/80",
          accentBar: "bg-[#102A43]"
        }
      },
      {
        icon: import_lucide_react8.Microscope,
        value: "180+",
        label: "Automated Tests",
        subtext: "High-precision analyzers",
        theme: {
          card: "hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white",
          iconBg: "bg-cyan-50 text-cyan-800 border-cyan-200/80",
          accentBar: "bg-[#C62828]"
        }
      },
      {
        icon: import_lucide_react8.Clock,
        value: "Patient-first",
        label: "Lab & Home Sample",
        subtext: "Same-day 6h report time",
        theme: {
          card: "hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white",
          iconBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          accentBar: "bg-[#155E9A]"
        }
      },
      {
        icon: import_lucide_react8.Award,
        value: "100%",
        label: "Quality Process",
        subtext: "ISO 9001:2015 certified",
        theme: {
          card: "hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white",
          iconBg: "bg-amber-50 text-amber-800 border-amber-200/80",
          accentBar: "bg-[#7A4B2A]"
        }
      }
    ];
    const certifications = [
      { name: "Quality process documented", tag: "bg-emerald-50 text-emerald-900 border-emerald-200/90", iconColor: "text-emerald-600" },
      { name: "ISO 9001:2015 Certified", tag: "bg-blue-50 text-blue-900 border-blue-200/90", iconColor: "text-blue-600" },
      { name: "Patient records handled carefully", tag: "bg-cyan-50 text-cyan-900 border-cyan-200/90", iconColor: "text-cyan-600" },
      { name: "Support availability confirmed at booking", tag: "bg-amber-50 text-amber-900 border-amber-200/90", iconColor: "text-amber-600" }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "trust", className: "relative py-[clamp(2.5rem,1.5rem+3vw,4.5rem)] bg-[#F5F5F7] border-y border-white/40 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-teal-500/5 rounded-full blur-[100px] animate-liquid mix-blend-multiply" })), /* @__PURE__ */ React.createElement("div", { className: "relative fluid-container z-10" }, /* @__PURE__ */ React.createElement("div", { className: "fluid-grid-cards-sm mb-6 sm:mb-8" }, stats.map((stat, index) => /* @__PURE__ */ React.createElement(
      import_framer_motion.motion.div,
      {
        key: stat.label,
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.08 },
        viewport: { once: true },
        className: `glass-card rounded-[24px] p-5 sm:p-6 border border-white/80 transition-all duration-300 relative overflow-hidden group ${stat.theme.card}`
      },
      /* @__PURE__ */ React.createElement("div", { className: `absolute top-0 left-0 right-0 h-1 ${stat.theme.accentBar} opacity-80 group-hover:opacity-100 transition-opacity` }),
      /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 sm:w-11 sm:h-11 mb-3.5 rounded-[14px] flex items-center justify-center border shadow-sm ${stat.theme.iconBg}` }, /* @__PURE__ */ React.createElement(stat.icon, { className: "w-5 h-5" })),
      /* @__PURE__ */ React.createElement("p", { className: "text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight mb-0.5" }, stat.value),
      /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm font-bold text-slate-800 leading-snug" }, stat.label),
      /* @__PURE__ */ React.createElement("p", { className: "text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium" }, stat.subtext)
    ))), /* @__PURE__ */ React.createElement(
      import_framer_motion.motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        viewport: { once: true },
        className: "glass-panel bg-white/70 rounded-[24px] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 relative overflow-hidden"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3.5 text-center md:text-left relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#102A43] via-[#155E9A] to-[#155E9A] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#155E9A]/20" }, /* @__PURE__ */ React.createElement(import_lucide_react8.ShieldCheck, { className: "w-6 h-6 text-emerald-300" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-[#1D1D1F] text-sm sm:text-base tracking-tight" }, "Accredited & Certified Diagnostic Facility"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] sm:text-xs text-slate-500 font-medium" }, "Strict national laboratory quality calibration and clinical doctor sign-off"))),
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap justify-center gap-2 relative z-10" }, certifications.map((cert) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: cert.name,
          className: `flex items-center gap-1.5 border px-3.5 py-1.5 rounded-full transition-colors cursor-default bg-white/50 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${cert.tag}`
        },
        /* @__PURE__ */ React.createElement(import_lucide_react8.CheckCircle2, { className: `w-3.5 h-3.5 flex-shrink-0 ${cert.iconColor}` }),
        /* @__PURE__ */ React.createElement("span", { className: "text-[11px] sm:text-xs font-bold whitespace-nowrap" }, cert.name)
      )))
    )));
  }

  // src/components/About.tsx
  var import_framer_motion2 = __require("framer-motion");
  var import_lucide_react9 = __require("lucide-react");
  function About() {
    const journeySteps = [
      {
        icon: import_lucide_react9.CalendarCheck,
        title: "1. Select Test",
        description: "Request a booking online or by phone; the lab confirms availability.",
        theme: {
          bg: "bg-white",
          iconBg: "bg-blue-50 text-blue-800 border-blue-200/80",
          accentBar: "bg-[#102A43]"
        }
      },
      {
        icon: import_lucide_react9.Home,
        title: "2. Home Sample",
        description: "A trained, vaccinated phlebotomist collects your sample securely.",
        theme: {
          bg: "bg-white",
          iconBg: "bg-cyan-50 text-cyan-800 border-cyan-200/80",
          accentBar: "bg-[#C62828]"
        }
      },
      {
        icon: import_lucide_react9.Microscope,
        title: "3. Laboratory Processing",
        description: "Automated 5-part analyzers ensure zero cross-contamination.",
        theme: {
          bg: "bg-white",
          iconBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          accentBar: "bg-[#155E9A]"
        }
      },
      {
        icon: import_lucide_react9.FileCheck,
        title: "4. Digital Delivery",
        description: "Receive a digital report through the configured delivery workflow.",
        theme: {
          bg: "bg-white",
          iconBg: "bg-amber-50 text-amber-800 border-amber-200/80",
          accentBar: "bg-[#7A4B2A]"
        }
      }
    ];
    const features = [
      "Fully Automated 5-Part Hematology Analyzers",
      "Certified MD Pathologists on Active Duty",
      "Barcode-Tracked Sterile Vacutainer Tubes",
      "Digital report delivery when configured",
      "Home collection availability confirmed at booking",
      "Patient-focused lab support"
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "about", className: "relative fluid-section bg-[#FBFBFD] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-teal-500/5 blur-[80px] animate-liquid mix-blend-multiply" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-[30%] right-[0%] w-[30vw] h-[30vw] bg-emerald-500/5 blur-[80px] animate-liquid mix-blend-multiply", style: { animationDelay: "-12s" } })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-slate-800 uppercase tracking-wider" }, "How It Works")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight" }, "Diagnostic Care, Simplified for You"), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base text-slate-600 font-normal leading-relaxed" }, "From doorstep sample collection to certified digital reports in 4 seamless steps")), /* @__PURE__ */ React.createElement("div", { className: "fluid-grid-cards-sm mb-10 sm:mb-14" }, journeySteps.map((step, index) => /* @__PURE__ */ React.createElement(
      import_framer_motion2.motion.div,
      {
        key: step.title,
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.08 },
        viewport: { once: true },
        className: `glass-card rounded-[24px] p-5 sm:p-6 border border-white/80 transition-all duration-300 relative group overflow-hidden ${step.theme.bg}`
      },
      /* @__PURE__ */ React.createElement("div", { className: `absolute top-0 left-0 right-0 h-1 ${step.theme.accentBar}` }),
      /* @__PURE__ */ React.createElement("div", { className: `w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] flex items-center justify-center mb-3.5 sm:mb-4 border shadow-sm ${step.theme.iconBg}` }, /* @__PURE__ */ React.createElement(step.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })),
      /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm sm:text-base text-[#1D1D1F] mb-1 leading-snug" }, step.title),
      /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 leading-relaxed font-normal" }, step.description)
    ))), /* @__PURE__ */ React.createElement(
      import_framer_motion2.motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
        className: "bg-[#102A43] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative overflow-hidden border border-white/10"
      },
      /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none overflow-hidden z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-[400px] h-[400px] bg-[#C62828]/20 rounded-full blur-[100px] animate-liquid mix-blend-screen" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#155E9A]/20 rounded-full blur-[100px] animate-liquid mix-blend-screen", style: { animationDelay: "-7s" } })),
      /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-7 space-y-4 sm:space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/15" }, /* @__PURE__ */ React.createElement(import_lucide_react9.Award, { className: "w-3.5 h-3.5 text-teal-300" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-teal-100" }, "Certified Quality Standards")), /* @__PURE__ */ React.createElement("h3", { className: "text-xl sm:text-3xl font-black tracking-tight text-white leading-snug" }, "Precision Testing & Complete Patient Trust"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-300 text-xs sm:text-sm leading-relaxed font-normal" }, "At Sawariya Diagnostic, samples are handled according to the lab's documented quality and review procedures. Confirm current accreditation scope and report workflow with the lab."), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1" }, features.map((feature) => /* @__PURE__ */ React.createElement("div", { key: feature, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(import_lucide_react9.CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs sm:text-sm text-slate-200 font-normal leading-snug" }, feature))))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-5 flex justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-5 sm:p-7 space-y-4 text-center shadow-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#102A43] to-[#155E9A] border border-teal-300/30 flex items-center justify-center mx-auto text-teal-300 shadow-md" }, /* @__PURE__ */ React.createElement(import_lucide_react9.Microscope, { className: "w-7 h-7" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-base sm:text-lg font-bold text-white mb-0.5" }, "Quality Review Process"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] sm:text-xs text-slate-300" }, "Opposite R.S. Sangwan Hospital, Loharu Road")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 pt-3 border-t border-white/10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-xl sm:text-2xl font-black text-emerald-400" }, "10,000+"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] sm:text-[11px] text-slate-300" }, "Samples Processed")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-xl sm:text-2xl font-black text-amber-300" }, "180+"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] sm:text-[11px] text-slate-300" }, "Validated Profiles"))))))
    )));
  }

  // src/components/Services.tsx
  var import_framer_motion3 = __require("framer-motion");
  var import_lucide_react10 = __require("lucide-react");
  init_website_content();
  function Services() {
    const servicesList = services.list;
    const scrollToContact = () => {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    };
    return /* @__PURE__ */ React.createElement("section", { id: "services", className: "relative fluid-section bg-[#FBFBFD] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-500/5 blur-[80px] animate-liquid mix-blend-multiply" })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs" }, /* @__PURE__ */ React.createElement(import_lucide_react10.Activity, { className: "w-3.5 h-3.5 text-[#155E9A]" }), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-slate-800 uppercase tracking-wider" }, "Clinical Specialities")), /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight" }, "Comprehensive Diagnostic Care"), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base text-slate-600 font-normal leading-relaxed" }, "Advanced pathology testing powered by high-throughput analyzers with multi-point QC verification")), /* @__PURE__ */ React.createElement("div", { className: "fluid-grid-cards-sm" }, servicesList.map((service, index) => /* @__PURE__ */ React.createElement(
      import_framer_motion3.motion.div,
      {
        key: service.title,
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.06 },
        viewport: { once: true },
        onClick: scrollToContact,
        className: "glass-card p-5 sm:p-6 cursor-pointer flex flex-col justify-between group rounded-[24px] border border-white/80 transition-all duration-300 active:scale-[0.98] relative overflow-hidden"
      },
      /* @__PURE__ */ React.createElement("div", { className: `absolute top-0 left-0 right-0 h-1 ${service.theme.accentBar}` }),
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: `w-[52px] h-[48px] rounded-[16px] border flex items-center justify-center mb-4 transition-all duration-200 ${service.theme.iconBg}` }, /* @__PURE__ */ React.createElement(service.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base sm:text-lg text-[#1D1D1F] mb-1.5 group-hover:text-[#155E9A] transition-colors leading-snug" }, service.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 leading-relaxed font-normal" }, service.description)),
      /* @__PURE__ */ React.createElement("div", { className: "pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700" }, /* @__PURE__ */ React.createElement("span", { className: `flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${service.theme.badge}` }, /* @__PURE__ */ React.createElement(import_lucide_react10.ShieldCheck, { className: "w-3 h-3 text-emerald-600" }), " NABL Calibrated"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1 group-hover:translate-x-0.5 text-[#155E9A] font-bold transition-transform text-[11px] sm:text-xs" }, "Book ", /* @__PURE__ */ React.createElement(import_lucide_react10.ArrowRight, { className: "w-3.5 h-3.5 ml-0.5" })))
    )))));
  }

  // src/components/HomeCollection.tsx
  var import_react4 = __require("react");
  init_site();
  var import_framer_motion4 = __require("framer-motion");
  var import_lucide_react11 = __require("lucide-react");
  init_input();
  init_button();
  init_website_content();
  init_forms();
  var import_sonner4 = __require("sonner");
  var import_meta4 = {};
  function HomeCollection() {
    const [formData, setFormData] = (0, import_react4.useState)({
      name: "",
      phone: "",
      address: "",
      testRequired: "Full Body / Routine Blood Test"
    });
    const [isSubmitting, setIsSubmitting] = (0, import_react4.useState)(false);
    const [isSubmitted, setIsSubmitted] = (0, import_react4.useState)(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (!formData.name.trim()) {
        import_sonner4.toast.error("Please enter your full name");
        return;
      }
      if (!cleanPhone || cleanPhone.length < 10) {
        import_sonner4.toast.error("Please enter a valid 10-digit mobile number");
        return;
      }
      setIsSubmitting(true);
      try {
        const result = await FormsService.submitForm({
          name: formData.name,
          phone: formData.phone,
          address: formData.address || "Charkhi Dadri",
          serviceType: formData.testRequired,
          message: "Home Sample Collection Request"
        }, import_meta4.env.VITE_WEB3FORMS_ACCESS_KEY);
        if (!result.success) {
          const handoff = FormsService.dispatchToWhatsApp({
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            serviceType: formData.testRequired
          });
          import_sonner4.toast.info(handoff ? "WhatsApp opened. Send the prepared request to finish booking." : result.message);
          return;
        }
        setIsSubmitted(true);
      } catch (err) {
        console.error("Home collection error", err);
        import_sonner4.toast.error("Failed to submit appointment request");
      } finally {
        setIsSubmitting(false);
      }
    };
    const benefits = [
      {
        icon: import_lucide_react11.ShieldCheck,
        title: "Documented Collection Protocols",
        description: "Sterile, single-use vacuum tubes",
        iconStyle: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
      },
      {
        icon: import_lucide_react11.CheckCircle2,
        title: "Certified Phlebotomists",
        description: "Painless, hygienic sample collection",
        iconStyle: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
      },
      {
        icon: import_lucide_react11.Clock,
        title: "30-Min Arrival Window",
        description: "Collection timing is confirmed during booking",
        iconStyle: "bg-amber-500/20 text-amber-400 border-amber-500/40"
      }
    ];
    const serviceAreas = homeCollection.features;
    return /* @__PURE__ */ React.createElement("section", { id: "home-collection", className: "relative fluid-section bg-[#102A43] text-white overflow-hidden border-y border-white/10" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none overflow-hidden z-0" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-10 left-10 w-[40vw] h-[40vw] bg-[#102A43]/40 rounded-full blur-[100px] animate-liquid mix-blend-screen" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-10 right-10 w-[50vw] h-[50vw] bg-[#C62828]/30 rounded-full blur-[120px] animate-liquid mix-blend-screen", style: { animationDelay: "-5s" } }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-teal-500/10 rounded-full blur-[140px] animate-liquid mix-blend-screen", style: { animationDelay: "-10s" } })), /* @__PURE__ */ React.createElement("div", { className: "fluid-container relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-12 gap-8 lg:gap-12 items-center" }, /* @__PURE__ */ React.createElement(
      import_framer_motion4.motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
        className: "lg:col-span-7 space-y-5 sm:space-y-6"
      },
      /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.1)]" }, /* @__PURE__ */ React.createElement(import_lucide_react11.Home, { className: "w-3.5 h-3.5 text-teal-300" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-teal-100" }, "Free Doorstep Collection \u2022 Zero Extra Charges")),
      /* @__PURE__ */ React.createElement("div", { className: "space-y-2 sm:space-y-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-[clamp(1.9rem,1.3rem+3.2vw,3.25rem)] font-black text-white tracking-tight leading-[1.1]" }, "Comfortable Diagnostics.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-emerald-300 to-amber-200" }, "Directly At Your Home.")), /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base md:text-lg text-slate-200 max-w-xl font-medium leading-relaxed" }, "Request a convenient home visit. Collection staff follow the lab's documented hygiene and sample-handling procedures; report timing depends on the test.")),
      /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1" }, benefits.map((benefit) => /* @__PURE__ */ React.createElement("div", { key: benefit.title, className: "glass-panel-dark rounded-[24px] p-4 space-y-1.5" }, /* @__PURE__ */ React.createElement("div", { className: `w-9 h-9 rounded-[12px] flex items-center justify-center border ${benefit.iconStyle}` }, /* @__PURE__ */ React.createElement(benefit.icon, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-xs sm:text-sm text-white leading-tight" }, benefit.title), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-300 leading-normal font-normal" }, benefit.description)))),
      /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-white/10 flex flex-wrap gap-2" }, serviceAreas.map((area) => /* @__PURE__ */ React.createElement("div", { key: area, className: "flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-teal-100 font-medium" }, /* @__PURE__ */ React.createElement(import_lucide_react11.CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }), /* @__PURE__ */ React.createElement("span", null, area))))
    ), /* @__PURE__ */ React.createElement(
      import_framer_motion4.motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        viewport: { once: true },
        className: "lg:col-span-5"
      },
      /* @__PURE__ */ React.createElement("div", { className: "glass-card p-5 sm:p-7 rounded-[32px] sm:rounded-[36px] shadow-[0_32px_80px_rgba(0,0,0,0.4)] text-slate-900 relative overflow-hidden bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "mb-4 space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg sm:text-xl font-black text-[#1D1D1F] tracking-tight" }, "Schedule Home Visit"), /* @__PURE__ */ React.createElement("span", { className: "bg-emerald-50 text-emerald-800 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200" }, "Same-Day Slots")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 font-normal" }, "Serving all sectors and localities across Charkhi Dadri.")), isSubmitted ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-6 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 mx-auto bg-emerald-50 rounded-[20px] flex items-center justify-center border border-emerald-200 shadow-sm" }, /* @__PURE__ */ React.createElement(import_lucide_react11.CheckCircle2, { className: "w-7 h-7 text-emerald-600" })), /* @__PURE__ */ React.createElement("h4", { className: "text-base sm:text-lg font-bold text-slate-900" }, "Appointment Confirmed!"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 max-w-xs mx-auto" }, "Your request was sent to the lab team. We will contact you using the details provided."), /* @__PURE__ */ React.createElement(
        Button,
        {
          onClick: () => {
            setIsSubmitted(false);
            setFormData({ name: "", phone: "", address: "", testRequired: "Routine Blood Test" });
          },
          variant: "outline",
          className: "rounded-full text-xs font-bold"
        },
        "Book Another Appointment"
      )) : /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 mb-1 block" }, "Patient Full Name"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(import_lucide_react11.User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement(
        Input,
        {
          type: "text",
          placeholder: "e.g. Ramesh Kumar",
          value: formData.name,
          onChange: (e) => setFormData({ ...formData, name: e.target.value }),
          className: "pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] text-slate-900",
          required: true
        }
      ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 mb-1 block" }, "Mobile Number (10 Digits for WhatsApp Report)"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(import_lucide_react11.Phone, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement(
        Input,
        {
          type: "tel",
          maxLength: 10,
          placeholder: "e.g. your mobile number",
          value: formData.phone,
          onChange: (e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") }),
          className: "pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-mono font-medium focus:border-[#155E9A] text-slate-900",
          required: true
        }
      ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 mb-1 block" }, "Required Test / Health Package"), /* @__PURE__ */ React.createElement(
        Input,
        {
          type: "text",
          placeholder: "e.g. CBC, Lipid Profile, Thyroid, or Full Body",
          value: formData.testRequired,
          onChange: (e) => setFormData({ ...formData, testRequired: e.target.value }),
          className: "h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] px-3.5 text-slate-900"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 mb-1 block" }, "Pickup Address in Charkhi Dadri"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(import_lucide_react11.MapPin, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), /* @__PURE__ */ React.createElement(
        Input,
        {
          type: "text",
          placeholder: "e.g. Loharu Road / Model Town / Sector 8",
          value: formData.address,
          onChange: (e) => setFormData({ ...formData, address: e.target.value }),
          className: "pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] text-slate-900"
        }
      ))), /* @__PURE__ */ React.createElement(
        Button,
        {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full h-12 text-sm font-bold btn-primary mt-2 shadow-md hover:shadow-lg active:scale-[0.98] rounded-[18px]"
        },
        isSubmitting ? /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(import_lucide_react11.Sparkles, { className: "w-4 h-4 animate-spin text-[#FDE047]" }), " Registering Home Visit...") : /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", null, "Confirm Home Sample Visit"), /* @__PURE__ */ React.createElement(import_lucide_react11.Send, { className: "w-4 h-4 ml-1" }))
      ), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-center text-slate-500 pt-0.5 font-medium" }, "Lab contact: ", /* @__PURE__ */ React.createElement("a", { href: telHref(siteConfig.contact.phone), className: "text-[#155E9A] font-bold hover:underline" }, siteConfig.contact.phone))))
    ))));
  }

  // src/components/ui/LoadingSpinner.tsx
  var import_lucide_react12 = __require("lucide-react");
  function LoadingSpinner() {
    return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center w-full min-h-[300px] bg-background" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-4" }, /* @__PURE__ */ React.createElement(import_lucide_react12.Loader2, { className: "w-10 h-10 text-accent-teal animate-spin" }), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground animate-pulse" }, "Loading...")));
  }

  // src/components/ui/WhatsAppButton.tsx
  var import_lucide_react13 = __require("lucide-react");
  init_site();
  function WhatsAppButton({
    phoneNumber = "",
    message = "Hi, I want to book a test at Sawariya Diagnostic."
  }) {
    const handleClick = () => {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = whatsappHref(message) || (phoneNumber ? `https://wa.me/${phoneNumber}?text=${encodedMessage}` : void 0);
      if (whatsappUrl) window.open(whatsappUrl, "_blank");
    };
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleClick,
        className: "whatsapp-float !hidden sm:!flex items-center justify-center",
        "aria-label": "Chat on WhatsApp"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react13.MessageCircle, { className: "w-7 h-7 text-white", fill: "white" })
    );
  }

  // src/components/layout/MobileBottomDock.tsx
  init_site();
  var import_lucide_react14 = __require("lucide-react");
  function MobileBottomDock() {
    const scrollToHomeCollection = () => {
      const el = document.getElementById("home-collection");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    const handleWhatsApp = () => {
      const encoded = encodeURIComponent("Hi, I would like to book a blood test / health package at Sawariya Diagnostic.");
      const url = whatsappHref("Hi, I want to book a test at Sawariya Diagnostic.");
      if (url) window.open(url, "_blank");
    };
    return /* @__PURE__ */ React.createElement("div", { className: "sm:hidden fixed bottom-0 left-0 right-0 z-[100] px-2.5 pt-2 pb-[max(0.5rem,calc(env(safe-area-inset-bottom,0px)+4px))] pointer-events-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-[420px] mx-auto pointer-events-auto bg-[#102A43]/85 backdrop-blur-[30px] border border-white/20 rounded-[22px] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-between gap-1 text-white overflow-hidden relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 z-[-1] pointer-events-none opacity-50 mix-blend-screen" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-[-50%] left-[-20%] w-[100px] h-[100px] bg-teal-400/40 rounded-full blur-[40px] animate-liquid" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-[-50%] right-[-20%] w-[120px] h-[120px] bg-[#155E9A]/50 rounded-full blur-[40px] animate-liquid", style: { animationDelay: "-3s" } })), /* @__PURE__ */ React.createElement(PatientReportPortal, { trigger: /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "flex-1 flex items-center justify-center gap-1 min-[360px]:gap-1.5 bg-white/10 hover:bg-white/15 active:bg-white/5 border border-white/10 rounded-[18px] h-11 min-[360px]:h-12 px-1 text-xs font-semibold text-slate-100 transition-all duration-150 active:scale-[0.95] select-none cursor-pointer min-w-0",
        "aria-label": "Patient Lab Portal"
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 rounded-[8px] bg-teal-400/20 flex items-center justify-center text-teal-300 shrink-0" }, /* @__PURE__ */ React.createElement(import_lucide_react14.FileText, { className: "w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5" })),
      /* @__PURE__ */ React.createElement("span", { className: "text-[10px] min-[360px]:text-xs font-bold text-white truncate" }, "Portal")
    ) }), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: scrollToHomeCollection,
        className: "flex-[1.2] flex items-center justify-center gap-1 min-[360px]:gap-1.5 bg-white text-[#102A43] rounded-[18px] h-11 min-[360px]:h-12 px-1.5 min-[360px]:px-2.5 text-xs font-bold shadow-[0_4px_12px_rgba(255,255,255,0.2)] transition-all duration-150 hover:bg-white/90 active:scale-[0.95] select-none border border-white cursor-pointer min-w-0",
        "aria-label": "Book Doorstep Home Sample"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react14.Home, { className: "w-3.5 h-3.5 text-[#102A43] shrink-0" }),
      /* @__PURE__ */ React.createElement("span", { className: "truncate tracking-tight font-bold text-[10px] min-[360px]:text-xs" }, "Book Visit")
    ), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: telHref(siteConfig.contact.phone),
        className: "w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 shrink-0 flex items-center justify-center bg-white/10 hover:bg-white/15 active:bg-white/5 border border-white/10 rounded-[18px] transition-all duration-150 active:scale-[0.95] select-none",
        "aria-label": "Call 24*7 Helpline"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react14.Phone, { className: "w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 text-[#FDE047]" })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleWhatsApp,
        className: "w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 shrink-0 flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] rounded-[18px] transition-all duration-150 active:scale-[0.95] shadow-xs select-none border border-[#25D366] cursor-pointer",
        "aria-label": "Chat with Doctor on WhatsApp"
      },
      /* @__PURE__ */ React.createElement(import_lucide_react14.MessageCircle, { className: "w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 text-white", fill: "white" })
    )));
  }

  // src/App.tsx
  var TestCatalog2 = (0, import_react13.lazy)(() => Promise.resolve().then(() => (init_TestCatalog(), TestCatalog_exports)).then((module) => ({ default: module.TestCatalog })));
  var Team2 = (0, import_react13.lazy)(() => Promise.resolve().then(() => (init_Team(), Team_exports)).then((module) => ({ default: module.Team })));
  var Contact2 = (0, import_react13.lazy)(() => Promise.resolve().then(() => (init_Contact(), Contact_exports)).then((module) => ({ default: module.Contact })));
  var Footer2 = (0, import_react13.lazy)(() => Promise.resolve().then(() => (init_Footer(), Footer_exports)).then((module) => ({ default: module.Footer })));
  function App() {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-background text-foreground pb-[calc(env(safe-area-inset-bottom,16px)+76px)] sm:pb-0 w-full max-w-full relative" }, /* @__PURE__ */ React.createElement("main", { className: "relative w-full max-w-full", role: "main" }, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(TrustIndicators, null), /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(Services, null), /* @__PURE__ */ React.createElement(HomeCollection, null), /* @__PURE__ */ React.createElement(import_react13.Suspense, { fallback: /* @__PURE__ */ React.createElement(LoadingSpinner, null) }, /* @__PURE__ */ React.createElement(TestCatalog2, null), /* @__PURE__ */ React.createElement(Team2, null), /* @__PURE__ */ React.createElement(Contact2, null), /* @__PURE__ */ React.createElement(Footer2, null))), /* @__PURE__ */ React.createElement(WhatsAppButton, null), /* @__PURE__ */ React.createElement(MobileBottomDock, null));
  }

  // src/main.tsx
  (0, import_client.createRoot)(document.getElementById("root")).render(
    /* @__PURE__ */ React.createElement(import_react_helmet_async2.HelmetProvider, null, /* @__PURE__ */ React.createElement(App, null))
  );
})();
