interface Comments {
    articleId: Number;
    writerId: Number; // Writer's SLog Id
    createdAt?: Number;
    content: String;
}

export default Comments;