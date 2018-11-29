import get from 'lodash/get';
import { adaptNames } from '../../../adapters';
import { adaptLinks } from './links';

export const adaptGameDetails = (obj) => {
    const items = get(obj, 'items.item');

    if (!items || items.length === 0) {
        return;
    }

    const allItems = items.reduce((acc, item) => {
        const sortedLinks = adaptLinks(get(item, '_attributes.type'), item.link);

        return [...acc, {
            age: Number(get(item, 'minage._attributes.value')),
            description: get(item, 'description.value'),
            id: Number(get(item, '_attributes.id')),
            image: get(item, 'image.value'),
            names: adaptNames(item.name),
            players: {
                max: Number(get(item, 'maxplayers._attributes.value')),
                min: Number(get(item, 'minplayers._attributes.value')),
            },
            playtime: {
                average: Number(get(item, 'playingtime._attributes.value')),
                max: Number(get(item, 'maxplaytime._attributes.value')),
                min: Number(get(item, 'minplaytime._attributes.value')),
            },
            thumbnail: get(item, 'thumbnail.value'),
            type: get(item, '_attributes.type'),
            yearPublished: Number(get(item, 'yearpublished._attributes.value')),
            ...sortedLinks,
        }];
    }, []);

    return {
        games: allItems,
    };
};
