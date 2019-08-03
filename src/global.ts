export { config } from "./config";
export { labels } from "./labels";
export { s } from "./store/store";

import { Configuration } from "./Configuration";

export function getConfig(): Configuration {
    return Configuration.get();
}
