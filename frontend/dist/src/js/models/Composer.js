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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import StorageWrapper from './StorageWrapper';
var Composer = /** @class */ (function () {
    function Composer() {
    }
    Composer.compress = function (string, encoding) {
        if (encoding === void 0) { encoding = 'gzip'; }
        return __awaiter(this, void 0, void 0, function () {
            var byteArray, cs, writer, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        byteArray = new TextEncoder().encode(string);
                        cs = new CompressionStream(encoding);
                        writer = cs.writable.getWriter();
                        writer.write(byteArray);
                        writer.close();
                        return [4 /*yield*/, new Response(cs.readable).arrayBuffer()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Composer.decompress = function (byteArray, encoding) {
        if (encoding === void 0) { encoding = 'gzip'; }
        return __awaiter(this, void 0, void 0, function () {
            var cs, writer, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cs = new DecompressionStream(encoding);
                        writer = cs.writable.getWriter();
                        writer.write(byteArray);
                        writer.close();
                        _b = (_a = new TextDecoder()).decode;
                        return [4 /*yield*/, new Response(cs.readable).arrayBuffer()];
                    case 1:
                        result = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Composer.arrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    Composer.base64ToArrayBuffer = function (base64) {
        var binaryString = window.atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };
    Composer.isJsonString = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    Composer.exportWorkout = function (workoutId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.arrayBufferToBase64;
                        return [4 /*yield*/, this.compress(StorageWrapper.fetchWorkoutString(workoutId))];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    Composer.importWorkout = function (base64) {
        return __awaiter(this, void 0, void 0, function () {
            var workoutJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Composer.decompress(Composer.base64ToArrayBuffer(base64))];
                    case 1:
                        workoutJSON = _a.sent();
                        if (!this.isJsonString(workoutJSON))
                            return [2 /*return*/, false];
                        StorageWrapper.writeWorkout(workoutJSON);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return Composer;
}());
export default Composer;
