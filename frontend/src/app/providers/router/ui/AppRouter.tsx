import { RouterProvider } from "react-router-dom";
import { routerConfig } from "../routerConfig/routerConfig";

export const AppRouter = () => {
	return <RouterProvider router={routerConfig} />
};
