const db = {
    artCategory: {
        async create(categoryName) {

        },
        async list() {

        },
        async fetch(categoryId) {}
    },
    art: {
        async create(categoryId, ownerId) {},
        async edit(artId, artData) {},
        async fetch(artId) {},
    },
    transactions: {
        async create(fromId, toId, artId) {},
        async list(userId) {} // should return a list of any transaction who's fromId or toId == userId
    },
    user: {
        async create(email) {}
    },
}