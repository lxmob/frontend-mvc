export default function router (routes) {

  function handleLoadView () {
    // http://localhost:5173/#/detail/1
    //                        /detail/:id
    const pathInfo = getPathInfo(location.hash);

    routes.forEach(async route => {
      const routeInfo = getPathInfo('#' + route.path);

      if (pathInfo.viewName === routeInfo.viewName) {
        const params = {};
        routeInfo.params.forEach((routeItem, routeIdx) => {
          pathInfo.params.forEach((pathItem, pathIdx) => {
            if (routeIdx === pathIdx) {
              params[routeItem] = pathItem;
            }
          })
        })
        this.innerHTML = await route.view(params);
        route.script();
      }
    })
  }

  function getPathInfo (hash) {
    // #/detail/1
    const pathItem = hash.substring(1).split('/').filter(Boolean);
    // #/detail/:id
    const params = pathItem.slice(1).map(item => item.replace(':', ''));
    
    return {
      viewName: pathItem[0] || 'home',
      params
    }
  }

  return function (el) {
    window.addEventListener('load', handleLoadView.bind(el), false);
    window.addEventListener('hashchange', handleLoadView.bind(el), false);
  }
}