interface Article {
    writerId: Number;
    articleId?: Number;
    title?: String;
    content: String;
    images: Array<String>;
    likes: Array<Number>;
    comments?: {
        writer: Number;
        createdAt: Number;
        content: String;
    };
    category: Array<Number>;
    createdAt: Number;
    editData: {
        isEdited: Boolean;
        editedAt?: Number;
    };
}

export default Article;