interface Article {
    writerId: Number;
    articleId?: Number;
    title?: String;
    content: String;
    images: [{
        imgDir: String;
    }];
    likes: Array<Number>;
    comments?: {
        writer: Number;
        createdAt: Number;
        content: String;
    };
    categories: Array<Number>;
    createdAt: Number;
    editData: {
        isEdited: Boolean;
        editedAt?: Number;
    };
}

export default Article;