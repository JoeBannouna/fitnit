var Router = /** @class */ (function () {
    /**
     * The Router's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    function Router() {
        var _this = this;
        this.currentPage = /^$/;
        window.addEventListener('popstate', function () { return _this.getCurrentPageData(); });
    }
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Router class while keeping
     * just one instance of each subclass around.
     */
    Router.getInstance = function () {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    };
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    Router.prototype.getCurrentPageData = function () {
        var layers = window.location.pathname == '/' ? [''] : window.location.pathname.split('/').filter(function (val) { return val != ''; });
        var arg = layers.join('/');
        var found = false;
        var vals = [];
        for (var i = 0; i < Router.pages.length; i++)
            if (Router.pages[i].reg.test(arg)) {
                found = true;
                this.currentPage = Router.pages[i].reg;
                for (var j = 0; j < Router.pages[i].tokens.length; j++)
                    vals.push(layers[Router.pages[i].tokens[j]]);
                break;
            }
        return found ? vals : false;
    };
    Router.prototype.goTo = function (location) {
        window.history.pushState(null, null, location);
        this.getCurrentPageData();
    };
    Router.pages = [{ reg: /workout\/\w.*/, tokens: [1] }];
    return Router;
}());
export default Router;
