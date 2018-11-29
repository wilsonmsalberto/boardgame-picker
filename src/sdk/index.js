import modules from './modules';
import {
    bggClient,
    rpggClient,
    vggClient,
} from './client';

export const bggSdk = modules(bggClient);
export const rpggSdk = modules(rpggClient);
export const vggSdk = modules(vggClient);
