import { routes } from "@config/routes.config";

export default function getCurrentRoute(pathname: string) {
    let sourceRoutes = routes;
    let splitedPathname = pathname.substring(1, pathname.length).split("/");
    if (splitedPathname[0] === "") {
        splitedPathname[0] = "/";
    }
    let howDeep = 0;
    while (howDeep < splitedPathname.length) {
        sourceRoutes = sourceRoutes.filter(route => route.path === splitedPathname[0]);

        if (sourceRoutes === undefined) {
            return;
        }
        console.log("A")
    }
}
