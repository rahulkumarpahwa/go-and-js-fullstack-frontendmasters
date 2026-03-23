import { routes } from "./Routes.js";
export const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      Router.go(location.pathname, false);
    });

    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = a.getAttribute("href");
        Router.go(href);
      });
    });

    // go to initial route:
    Router.go(location.pathname + location.search);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState(null, "", route);
    }

    let pageElement = null;
    let needsLogin = false;

    const routePath = route.includes("?") ? route.split("?")[0] : route;

    for (const r of routes) {
      if (typeof r.path == "string" && r.path == routePath) {
        pageElement = new r.component();
        needsLogin = r.loggedIn === true;
        break;
      } else if (r.path instanceof RegExp) {
        const match = r.path.exec(route);
        if (match) {
          pageElement = new r.component();
          const params = match.slice(1);
          pageElement.params = params;
          break;
        }
      }
    }

    // we will check here that page we are trying to access needs loggedIn or not!
    if (pageElement) {
      if (needsLogin && app.Store.loggedIn == false) {
        Router.go("/account/login");
        return;
      }
    }

    if (pageElement == null) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "Page Not Found!";
    }
    document.querySelector("main").innerHTML = null;
    document.querySelector("main").appendChild(pageElement);
  },
};
