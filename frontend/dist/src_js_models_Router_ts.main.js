"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfitness_webapp"] = self["webpackChunkfitness_webapp"] || []).push([["src_js_models_Router_ts"],{

/***/ "./src/js/models/Router.ts":
/*!*********************************!*\
  !*** ./src/js/models/Router.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Router = /** @class */ (function () {\n    /**\n     * The Router's constructor should always be private to prevent direct\n     * construction calls with the `new` operator.\n     */\n    function Router() {\n        var _this = this;\n        this.currentPage = /^$/;\n        this.routeChanged = new Event('routeChanged');\n        window.addEventListener('popstate', function () {\n            window.dispatchEvent(_this.routeChanged);\n            _this.getCurrentPageData();\n        });\n    }\n    /**\n     * The static method that controls the access to the singleton instance.\n     *\n     * This implementation let you subclass the Router class while keeping\n     * just one instance of each subclass around.\n     */\n    Router.getInstance = function () {\n        if (!Router.instance) {\n            Router.instance = new Router();\n        }\n        return Router.instance;\n    };\n    /**\n     * Finally, any singleton should define some business logic, which can be\n     * executed on its instance.\n     */\n    Router.prototype.getCurrentPageData = function () {\n        var layers = window.location.pathname == '/' ? [''] : window.location.pathname.split('/').filter(function (val) { return val != ''; });\n        var arg = layers.join('/');\n        var found = false;\n        var vals = [];\n        for (var i = 0; i < Router.pages.length; i++)\n            if (Router.pages[i].reg.test(arg)) {\n                found = true;\n                this.currentPage = Router.pages[i].reg;\n                for (var j = 0; j < Router.pages[i].tokens.length; j++)\n                    vals.push(layers[Router.pages[i].tokens[j]]);\n                break;\n            }\n        if (found) {\n            return vals;\n        }\n        else {\n            this.currentPage = /^$/;\n            return false;\n        }\n    };\n    Router.prototype.goTo = function (location) {\n        window.history.pushState(null, null, location);\n        this.getCurrentPageData();\n        window.dispatchEvent(this.routeChanged);\n    };\n    Router.prototype.replace = function (location) {\n        window.history.replaceState(null, null, location);\n        this.getCurrentPageData();\n        window.dispatchEvent(this.routeChanged);\n    };\n    Router.pages = [{ reg: /workout\\/\\w.*/, tokens: [1] }];\n    return Router;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router.getInstance());\n\n\n//# sourceURL=webpack://fitness-webapp/./src/js/models/Router.ts?");

/***/ })

}]);