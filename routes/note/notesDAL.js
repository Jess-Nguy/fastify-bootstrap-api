const NotesDAL = (db) => {
    const createNote = async (title, body) => {
        const { id } = await db.one(
            'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id',
            [title, body]
        );

        return { id, title, body };
    }

    return { createNote };
};

module.exports = NotesDAL;
// module.exports = (fastify, opts, next) => {
//     fastify.decorate('notesDAL', NotesDAL(fastify.db));

//     next();
// }