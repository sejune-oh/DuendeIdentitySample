export interface IMenu {
  path: string;
  url: string;
  name: string;
  role: Array<string>;
}

export interface IMenuList {
  list: Array<IMenu>;
}
