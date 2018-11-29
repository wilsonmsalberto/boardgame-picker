import join from 'proper-url-join';
import { adaptGameDetails } from './adapters';

const getGameDetails = (client, ids, params = {}) => {
    if(!ids || ids.length === 0) {
        return;
    }

    const gameIds = ids.join(',');
    const url = join('thing', `?id=${gameIds}`);

    return client(url).then((res) => adaptGameDetails(res));
};

export default (client) => ({
    getGameDetails: (ids, params) => getGameDetails(client, ids, params),
});
