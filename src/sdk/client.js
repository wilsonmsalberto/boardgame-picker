import join from 'proper-url-join';
import { xml2js } from 'xml-js';

// API URLs
const bggApiUrl = 'https://www.boardgamegeek.com/xmlapi2/';
const rpggApiUrl = 'https://www.rpggeek.com/xmlapi2/';
const vggApiUrl = 'https://www.videogamegeek.com/xmlapi2/';

// Client that fetches from the APIs
const client = async function(apiUrl, endpoint) {
    const url = join(apiUrl, endpoint);

    return await fetch(url)
        .then((response) => response.text())
        .then((result) => {
            return xml2js(result, {
                // ignoreAttributes: true,
                compact: true,
                ignoreCdata: true,
                ignoreComment: true,
                ignoreDeclaration: true,
                ignoreInstruction: true,
                spaces: 0,
                textKey: 'value',
            })
        })
}

export const bggClient = (endpoint) => client(bggApiUrl, endpoint);
export const rpggClient = (endpoint) => client(rpggApiUrl, endpoint);
export const vggClient = (endpoint) => client(vggApiUrl, endpoint);
