export default class Router {
  static pages = [{ reg: /workout\/\w.*/, tokens: [1] }];
  currentPage: RegExp = /^$/;
  private static instance: Router;

  /**
   * The Router's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    window.addEventListener('popstate', () => this.getCurrentPageData());
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Router class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }

    return Router.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public getCurrentPageData() {
    let layers: string[] = window.location.pathname == '/' ? [''] : window.location.pathname.split('/').filter(val => val != '');
    let arg = layers.join('/');

    let found = false;
    const vals: string[] = [];
    for (let i = 0; i < Router.pages.length; i++)
      if (Router.pages[i].reg.test(arg)) {
        found = true;
        this.currentPage = Router.pages[i].reg;
        for (let j = 0; j < Router.pages[i].tokens.length; j++) vals.push(layers[Router.pages[i].tokens[j]]);
        break;
      }

    return found ? vals : false;
  }

  public goTo(location: string) {
    window.history.pushState(null, null, location);
    this.getCurrentPageData();
  }
}
