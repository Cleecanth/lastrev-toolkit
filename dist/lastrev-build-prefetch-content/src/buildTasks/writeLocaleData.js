"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var integration_contentful_1 = require("@last-rev/integration-contentful");
var lodash_1 = __importDefault(require("lodash"));
var path_1 = require("path");
var writeFile_1 = __importDefault(require("../helpers/writeFile"));
var constants_1 = require("../constants");
var mkDirIfNotExists_1 = __importDefault(require("../helpers/mkDirIfNotExists"));
var writeI18nJson = function (locales, defaultLanguage, currentPagesDir, localesPath) { return __awaiter(void 0, void 0, void 0, function () {
    var i18nJson, out;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i18nJson = {
                    allLanguages: locales,
                    defaultLanguage: defaultLanguage,
                    currentPagesDir: currentPagesDir,
                    finalPagesDir: 'src/pages',
                    localesPath: localesPath,
                    pages: {
                        '*': ['common']
                    }
                };
                out = JSON.stringify(i18nJson, null, 2);
                return [4 /*yield*/, writeFile_1.default(constants_1.I18N_JSON_FILE, out)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var writeLocaleFiles = function (localizationLookupMapping, localesDir) { return __awaiter(void 0, void 0, void 0, function () {
    var mkDirPromises, dirMappings, writeFilePromises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mkDirPromises = [];
                dirMappings = [];
                lodash_1.default.each(localizationLookupMapping, function (mapping, localeCode) {
                    var dir = path_1.resolve(localesDir, "./" + localeCode);
                    dirMappings.push([dir, mapping]);
                    mkDirPromises.push(mkDirIfNotExists_1.default(dir));
                });
                return [4 /*yield*/, Promise.all(mkDirPromises)];
            case 1:
                _a.sent();
                writeFilePromises = [];
                lodash_1.default.each(dirMappings, function (_a) {
                    var dir = _a[0], mapping = _a[1];
                    var file = path_1.resolve(dir, './common.json');
                    writeFilePromises.push(writeFile_1.default(file, JSON.stringify(mapping, null, 2)));
                });
                return [4 /*yield*/, Promise.all(writeFilePromises)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var writeLocales = function (buildConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var currentPagesDir, localesPath, localizationLookupFieldName, settingsContentType, localesDir, _a, localizationLookupMapping, locales, localeCodes, defaultLocale;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                currentPagesDir = lodash_1.default.has(buildConfig, 'locales.rawPagesDir')
                    ? buildConfig.locales.rawPagesDir
                    : constants_1.DEFAULT_RAW_PAGES_DIR;
                localesPath = lodash_1.default.has(buildConfig, 'locales.outputPath')
                    ? buildConfig.locales.outputPath
                    : constants_1.DEFAULT_LOCALES_OUTPUT_PATH;
                localizationLookupFieldName = lodash_1.default.has(buildConfig, 'locales.localizationLookupFieldName')
                    ? buildConfig.locales.localizationLookupFieldName
                    : undefined;
                settingsContentType = lodash_1.default.has(buildConfig, 'settingsContentType') ? buildConfig.settingsContentType : undefined;
                localesDir = path_1.resolve(constants_1.PROJECT_ROOT, "./" + localesPath);
                return [4 /*yield*/, Promise.all([mkDirIfNotExists_1.default(constants_1.CONTENT_DIR), mkDirIfNotExists_1.default(localesDir)])];
            case 1:
                _b.sent();
                return [4 /*yield*/, Promise.all([
                        integration_contentful_1.getLocalizationLookup({ localizationLookupFieldName: localizationLookupFieldName, contentTypeId: settingsContentType }),
                        integration_contentful_1.getLocales()
                    ])];
            case 2:
                _a = _b.sent(), localizationLookupMapping = _a[0], locales = _a[1];
                localeCodes = lodash_1.default.map(locales, 'code');
                defaultLocale = lodash_1.default.find(locales, function (locale) {
                    return locale.default;
                }).code;
                return [4 /*yield*/, Promise.all([
                        writeI18nJson(localeCodes, defaultLocale, currentPagesDir, localesPath),
                        writeLocaleFiles(localizationLookupMapping, localesDir)
                    ])];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = writeLocales;
