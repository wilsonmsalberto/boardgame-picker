import collection from './collection';
import familyItems from './family-items';
import forumLists from './forum-lists';
import forums from './forums';
import geeklist from './geeklist';
import guilds from './guilds';
import hotItems from './hot-items';
import plays from './plays';
import search from './search';
import thingItems from './thing-items';
import threads from './threads';
import users from './users';

export default (client) => ({
    collection: collection(client),
    familyItems: familyItems(client),
    forumLists: forumLists(client),
    forums: forums(client),
    geeklist: geeklist(client),
    guilds: guilds(client),
    hotItems: hotItems(client),
    plays: plays(client),
    search: search(client),
    thingItems: thingItems(client),
    threads: threads(client),
    users: users(client),
});
