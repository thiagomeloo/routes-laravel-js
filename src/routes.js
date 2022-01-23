const Routes = {
  /**
   * Array of routes
   */
  routes: [],

  /**
   * Start the routes
   */
  init() {
    const element = document.querySelector("[name='x-routes']");
    if (element) {
      this.routes = JSON.parse(element.content);
      element.remove();
      return this;
    } else {
      return this;
    }
  },

  /**
   * Get uri the route by name 
   */
  getUri(name) {
    return this.routes.find(route => route.name === name).uri;
  }

}

export { Routes };