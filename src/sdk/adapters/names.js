const adaptNames = (itemNames) => {
    const names = {};

    if (Array.isArray(itemNames) && itemNames.length > 0) {
        if (!names.alternate) {
            names.alternate = [];
        }

        itemNames.map((name) => {
            // Save the primary name value
            if (name._attributes.type === 'primary') {
                return names.primary = name._attributes.value;
            };

            // Save every alternate name values as an array
            return names.alternate.push({
                sortIdx: name._attributes.sortindex,
                value: name._attributes.value,
            });
        });
    } else {
        // The primary name value varies with the endpoint that is called
        names.primary = itemNames.value || itemNames._attributes.value;
    }

    return names;
};

export {
    adaptNames,
};
