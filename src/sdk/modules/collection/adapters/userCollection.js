import get from 'lodash/get';
import { adaptNames } from '../../../adapters';

export const adaptUserCollection = (obj) => {
    const items = get(obj, 'items.item');
    const total = get(obj, 'items._attributes.totalitems');

    if (!items || items.length === 0) {
        return;
    }

    const allItems = items.reduce((acc, item) => {
        let status = {};

        // Transform 0|1 string values into booleans
        for (let [key, value] of Object.entries(item.status._attributes)) {
            status[key] = key === "lastmodified" ? value : !!Number(value);
        }

        return [...acc, {
            id: Number(get(item, '_attributes.objectid')),
            image: get(item, 'image.value'),
            names: adaptNames(item.name),
            plays: Number(get(item, 'numplays.value')),
            thumbnail: get(item, 'thumbnail.value'),
            yearPublished: Number(get(item, 'yearpublished.value')),
            status,
        }];
    }, []);

    return {
        games: allItems,
        total: Number(total),
    };
};
