const boardGameLinkTypes = {
    boardgameartist: 'artist',
    boardgamecategory: 'category',
    boardgamecompilation: 'compilation',
    boardgamedesigner: 'designer',
    boardgameexpansion: 'expansion',
    boardgamefamily: 'family',
    boardgameimplementation: 'implementation',
    boardgameintegration: 'integration',
    boardgamemechanic: 'mechanic',
    boardgamepublisher: 'publisher',
}
const linksSortMatrix = {
    boardgame: { ...boardGameLinkTypes },
    boardgameexpansion: { ...boardGameLinkTypes },
}

export const adaptLinks = (type, links) => {
    const sortedLinks = {};

    // Create category links
    links && links.length > 0 && links.map((link) => {
        if (!link._attributes) {
            return false;
        }

        const linkType = linksSortMatrix[type][link._attributes.type];

        if (!sortedLinks[linkType]) {
            sortedLinks[linkType] = [];
        }

        const linkAttributes = {
            id: Number(link._attributes.id),
            value: link._attributes.value,
        }

        if (link._attributes.inbound) {
            linkAttributes['inbound'] = link._attributes.inbound;
        }

        return sortedLinks[linkType].push(linkAttributes);
    });

    return sortedLinks;
};
