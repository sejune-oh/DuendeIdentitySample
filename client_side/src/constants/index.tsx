import { IMenuList } from "@/types/Menu";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const { IDENTIY_ISSUER, CLIENT_ID, CLIENT_SECRET, SCOPE } =
  publicRuntimeConfig;

export const DefaultMenu: IMenuList = {
  list: [
    {
      path: "/",
      url: "",
      name: "Home",
      role: [],
    },
    {
      path: "/security",
      url: "",
      name: "Security",
      role: ["Admin"],
    },
  ],
};
