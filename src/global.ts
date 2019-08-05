export { visualConfig } from "./config/visual-config";
export { labels } from "./labels";

import { Configuration } from "./config/Configuration";

export function getConfig(): Configuration {
    return Configuration.get();
}
