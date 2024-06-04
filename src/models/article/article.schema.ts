import mongo from 'mongoose';

const commentSchema = new mongo.Schema({
    writer: { type: Number, required: true }, // slogId
    createdAt: { type: Number, required: true }, // Date.now() 형식, ms type
    content: { type: String, required: true }
})

const articleSchema = new mongo.Schema({
    writerId: { type: Number, required: true }, // writer's slogId
    articleId: { type: Number, required: true },
    title: { type: String }, // unrequired data
    content: { type: String, required: true },
    images: { type: Array, required: true },
    likes: { type: Array, required: true }, // String Data, `${user_id}`
    comments: [ commentSchema ],
    category: { type: String, required: true }, // String Data, `${category}` ex) "디자인", "사회"
    createdAt: { type: Number, required: true }, // Date.now() 형식(ms type)
    editData: {
        isEdited: { type: Boolean, required: true },
        editedAt: { type: Number } // if Edited
    }
})

export default mongo.model('article', articleSchema);