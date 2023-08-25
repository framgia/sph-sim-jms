import {
    Home,
    CalendarMonth,
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
        href: "/",
    },
    {
        name: "Calendar",
        Icon: CalendarMonth,
        href: "/",
    },
    {
        name: "Customer",
        Icon: Person,
        href: "/",
    },
];
