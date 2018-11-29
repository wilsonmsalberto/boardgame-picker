import join from 'proper-url-join';
import { userCollection } from './adapter';

const getUserCollection = (client, username, params = {}) => {
    const url = join('collection', username);

    return client(url).then((res) => userCollection(res));
};

export default (client) => ({
    getUserCollection: (username, params) => getUserCollection(client, username, params),
});
