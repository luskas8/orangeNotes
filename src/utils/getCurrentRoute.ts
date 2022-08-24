import { NavItemProps } from "@components";
import { routes } from "@config/routes.config";

export default function getCurrentRoute(pathname: string, recursiveSourceRoutes = routes, deepOffset = 0): NavItemProps | null {
    let sourceRoutes = recursiveSourceRoutes;
    let splitedPathname = pathname.split("/").slice(1);
    let howDeep = deepOffset;
    sourceRoutes = sourceRoutes.filter(route => route.path.includes(splitedPathname[howDeep]));

    if (sourceRoutes === undefined) {
        return null;
    }
    if (sourceRoutes && sourceRoutes[0] && sourceRoutes[0].routes && howDeep + 1 < splitedPathname.length) {
        return getCurrentRoute(pathname, sourceRoutes[0].routes, howDeep + 1);
    }
    return sourceRoutes[0]
}
