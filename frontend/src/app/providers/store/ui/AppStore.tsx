import { Provider } from "react-redux";
import { storeConfig } from "../storeConfig/storeConfig";
import { ReactElement } from "react";

interface AppStoreProps {
	children: ReactElement;
}

export const AppStore = ({ children }: AppStoreProps) => {
	return <Provider store={storeConfig}>{children}</Provider>;
};
