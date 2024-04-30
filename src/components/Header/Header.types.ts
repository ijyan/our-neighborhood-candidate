export interface IHeader {
  id: number;
  title: string;
  list: IList[];
}

interface IList {
  id: number;
  menu: string;
  link: string;
}
