interface Article {
    writerId: Number;
    articleId?: Number;
    title?: String;
    content: String;
    images: Array<String>;
    likes: Array<Number>;
    category: String;
    createdAt: Number;
    editData: {
        isEdited: Boolean;
        editedAt?: Number;
    };
}

export default Article;