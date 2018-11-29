import join from 'proper-url-join';
import getThing from '../thing-items';
import { adaptUserCollection } from './adapters';

const getFullCollectionDetails = async (client, collection) => {
    const games = collection.games;

    if (!games || games.length === 0) {
        return;
    }

    // Filter out the game IDs
    const gamesIds = games.reduce((acc, game) => {
        return [...acc, game.id];
    }, []);

    const gameDetails = await getThing(client).getGameDetails(gamesIds);
    const fullGameDetails = gameDetails && gameDetails.games;

    // Merge the user game details with the full game details
    if (fullGameDetails && fullGameDetails.length > 0) {
        games.forEach((game, idx, final) => {
            const filteredGameIdx = fullGameDetails.findIndex((filteredGame) => {
                return filteredGame.id === game.id;
            });

            // Update the index of the game on the final array
            final[idx] = { ...game, ...fullGameDetails[filteredGameIdx] };

            // Remove game from the array to optimize the loop
            fullGameDetails.splice(filteredGameIdx, 1);
        });
    };

    return collection;
};

const getUserCollection = async (client, username, fullDetails, params = {}) => {
    const url = join('collection', `?username=${username}`);

    const collection = await client(url).then(adaptUserCollection);

    if (fullDetails) {
        await getFullCollectionDetails(client, collection);
    };

    return collection;
};

export default (client) => ({
    getUserCollection: ({ username, fullDetails, params }) => getUserCollection(
        client,
        username,
        fullDetails,
        params,
    ),
    getFullCollectionDetails: ({ collection }) => getFullCollectionDetails(
        client,
        collection
    ),
});
