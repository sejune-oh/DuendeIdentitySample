import { DefaultMenu } from "@/constants";
import { IMenu } from "@/types/Menu";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface Params {
  children: ReactNode;
}

type ContextType = {
  currentMenu: IMenu | null;
  setCurrentMenu: Dispatch<SetStateAction<IMenu | null>>;
};

export const Context = createContext<ContextType>({
  currentMenu: null,
  setCurrentMenu: () => {},
});

const ContextProvider: FC<Params> = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState<IMenu | null>(
    DefaultMenu.list[0]
  );

  const contexts = {
    currentMenu,
    setCurrentMenu,
  } as ContextType;

  return <Context.Provider value={contexts}>{children}</Context.Provider>;
};

export default ContextProvider;
