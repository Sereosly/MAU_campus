import { AppDispatchType } from "@/app/providers/store/storeConfig/storeConfig";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatchType>();
