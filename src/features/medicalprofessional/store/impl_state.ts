import { ResourceStatus } from "@/util/ResourceStatus";

import { emptyPendingMedicalProfessional } from "./emptyPendingMedicalProfessional";
import { MedicalProfessionalModule as Me } from "./MedicalProfessionalModule";

export const state: Me.State = {
    list: ResourceStatus.empty(),
    saveState: ResourceStatus.empty(),
    current: emptyPendingMedicalProfessional(),
};
Me.State.validate(state);
