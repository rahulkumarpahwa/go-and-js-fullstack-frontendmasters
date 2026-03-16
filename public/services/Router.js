import { routes } from "./Routes.js";
export const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      Router.go(location.pathname, false);
    });

    // go to initial route:
    Router.go(location.pathname + location.search);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState(null, "", route);
    }

    let pageElement = null;

    const routePath = route.includes("?") ? route.split("?")[0] : route;

    for (const r of routes) {
      if (typeof r.path == "string" && r === routePath) {
        pageElement = new r.component();
      } else if (r.path instanceof RegExp) {
        const match = r.path.exec(route);
        if (match) {
          pageElement = new r.component();
          const params = match.slice(1);
          pageElement.params = params;
        }
      }
    }

    if (pageElement == null) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "Page Not Found!";
    } else {
      document.querySelector("main").innerHTML = "";
      document.querySelector("main").appendChild(pageElement);
    }
  },
};
