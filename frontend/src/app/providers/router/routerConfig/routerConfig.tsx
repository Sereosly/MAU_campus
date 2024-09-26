import { LayoutCampos } from "@/pages/layout";
import { North } from "@/pages/layout/ui/north";
import { South } from "@/pages/layout/ui/south";
import { Preview } from "@/pages/preview";
import { getRouteMain, getRouteNorth, getRouteSouth } from "@/shared/const/routes";
import { createBrowserRouter } from "react-router-dom";

export const routerConfig = createBrowserRouter([
	{
		path: getRouteMain(),
		element: <Preview />,
	},
	{
		element: <LayoutCampos />,
		children: [{
			path: getRouteSouth(),
			element: <South />
		},
		{
			path: getRouteNorth(),
			element: <North />
		},]
	},

], {
	basename: '/MAU_campus/',
});
