const NotesDAL = require('./notesDAL');

module.exports = async function (fastify, opts, next) {
    const notesDAL = NotesDAL(fastify.db);

    fastify.route({
        method: 'GET',
        url: '/notes',
        schema: {
            tags: ['Notes'],
            description: 'Get all notes',
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', description: 'Unique Identifier for a specific note'},
                            title: { type: 'string' },
                            body: { type: 'string', description: 'Main content of the note'}
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            return [];
        }
    })

    fastify.route({
        method: 'POST',
        url: '/notes',
        schema: {
            tags: ['Notes'],
            description: 'Create a note',
            body: {
                type: 'object',
                required: ['title', 'body'],
                properties: {
                    title: { type: 'string' },
                    body: { type: 'string'}
                }
            },
            response: {
                200: {
                    type: 'object',
                    required: ['id', 'title', 'body'],
                    properties: {
                        id: { type: 'number', description: 'Unique Identifier'},
                        title: { type: 'string' },
                        body: { type: 'string', description: 'Main content of the note'}
                    }
                }
            }
        },
        handler: async (request, reply) => {
            const { title, body } = request.body;
            const newNote = await notesDAL.createNote(title, body);
            
            return newNote;
        }
    });

    fastify.route({
        method: 'PUT',
        url: '/notes/:id',
        schema: {
            tags: ['Notes'],
            description: 'Update a note by id',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' }
                }
            },
            body: {
                type: 'object',
                required: ['title', 'body'],
                properties: {
                    title: { type: 'string' },
                    body: { type: 'string'}
                }
            },
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', description: 'Unique Identifier'},
                            title: { type: 'string' },
                            body: { type: 'string', description: 'Main content of the note'}
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {
           return [];
        }
    });

    fastify.route({
        method: 'DELETE',
        url: '/notes/:id',
        schema: {
            tags: ['Notes'],
            description: 'DELETE a note by id',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' }
                }
            },
            response: {
                204: {
                    type: 'string',
                    default: 'No Content'
                }
            }
        },
        handler: async (request, reply) => {
            return;
        }
    });

    next();
}