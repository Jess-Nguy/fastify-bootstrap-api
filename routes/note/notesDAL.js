const NotesDAL = (db) => {
    const createNote = async (title, body) => {
        const { id } = await db.one(
            'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id',
            [title, body]
        );

        return { id, title, body };
    }
    
    const getNotes = async () => {
        const notes = await db.query(
            'SELECT * FROM notes'
        );

        return notes;
    }

    const updateNote = async (title, body, id) => {
        await db.query('UPDATE notes SET title = $1, body = $2 WHERE id = $3', [title, body, id]);
        return { id, title, body };
    }

    const deleteNote = async (id) => {
        return await db.query('DELETE FROM notes WHERE id = $1', [id]);
    }

    return { createNote, getNotes, updateNote, deleteNote };
};

module.exports = NotesDAL;
// module.exports = (fastify, opts, next) => {
//     fastify.decorate('notesDAL', NotesDAL(fastify.db));

//     next();
// }