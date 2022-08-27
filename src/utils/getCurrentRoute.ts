import { NavItemProps } from "@components";
import { routes } from "@config/routes.config";
import {  } from "react-router-dom";

export default function getCurrentRoute(pathname: string, param: string, recursiveSourceRoutes = routes, deepOffset = 0): NavItemProps | null {
    let sourceRoutes = recursiveSourceRoutes;
    let splitedPathname = pathname.split("/").slice(1);
    let howDeep = deepOffset;
    sourceRoutes = sourceRoutes.filter(route => route.path.includes(splitedPathname[howDeep]) || param !== "" && route.path.includes(param));

    if (sourceRoutes === undefined) {
        return null;
    }
    if (sourceRoutes && sourceRoutes[0] && sourceRoutes[0].routes && howDeep + 1 < splitedPathname.length) {
        return getCurrentRoute(pathname, param, sourceRoutes[0].routes, howDeep + 1);
    }
    return sourceRoutes[0]
}
