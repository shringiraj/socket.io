let commentList = [
    {
        username: "shringiraj",
        comment: "The flowers are so beautyfull."
    },
    {
        username: "shringiraj",
        comment: "The tab is on the CPU."
    },
    {
        username: "shringiraj",
        comment: "I am using Dhal's personal computer."
    },
    {
        username: "shringiraj",
        comment: "I had gone their."
    },
    {
        username: "shringiraj",
        comment: "The flowers are so beautyfull."
    },
];

function getComments() {
    return commentList;
}

function storeComment(comment) {
    return [...commentList, comment];
}

module.exports = {
    getComments,
    storeComment
}