import { routes } from "./routes";

export const drawerMenu = [
    { link: routes.list, text: "Lista porad", icon: "fa-list" },
    { link: routes.sendAdvice, text: "Importuj poradę", icon: "fa-tachometer-alt" },
    { link: routes.discussion, text: "Dyskusja & pytania", icon: "fa-comments" },
    { link: routes.medicalprofessional, text: "Lista lekarzy", icon: "fa-user-nurse" },
];
