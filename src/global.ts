export { visualConfig } from "./visual-config";
export { labels } from "./labels";

import { Configuration } from "./Configuration";

export function getConfig(): Configuration {
    return Configuration.get();
}
