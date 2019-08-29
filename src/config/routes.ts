import { RoleKey } from "amerykahospital-personalizedadvice-businesslogic";

export const routes = {
    list: { path: "/", name: "list", role: RoleKey.medicalprofessional },
    sendAdvice: { path: "/add", name: "send-advice", role: RoleKey.medicalprofessional },
    discussion: { path: "/discussion", name: "discussion", role: RoleKey.medicalprofessional },
};
