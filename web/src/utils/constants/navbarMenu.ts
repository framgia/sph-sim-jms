import {
  CalendarMonth,
  Home,
  Person,
  SvgIconComponent,
} from "@mui/icons-material";

export interface IMenu {
  name: string;
  Icon: SvgIconComponent;
  href: string;
}

export const Menus: IMenu[] = [
  {
    name: "Job List",
    Icon: Home,
    href: "/job",
  },
  {
    name: "Calendar",
    Icon: CalendarMonth,
    href: "/calendar",
  },
  {
    name: "Customer",
    Icon: Person,
    href: "/customer",
  },
];
