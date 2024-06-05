interface Article {
    writerId: Number;
    articleId?: Number;
    title?: String;
    content: String;
    images: Array<String>;
    likes: Array<Number>;
    category: Array<Number>;
    createdAt: Number;
    editData: {
        isEdited: Boolean;
        editedAt?: Number;
    };
}

export default Article;