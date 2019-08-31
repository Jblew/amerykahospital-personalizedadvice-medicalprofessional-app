import { ResourceStatus } from "@/util/ResourceStatus";
import { AdviceModule as Me } from "./AdviceModule";

export const state: Me.State = {
    addOp: ResourceStatus.empty(),
    sendSMSOp: ResourceStatus.empty(),
    list: ResourceStatus.empty(),
    filter: { medicalprofessionalName: "INITIAL_VALUE_TO_BE_CHANGED" },
};
Me.State.validate(state);
