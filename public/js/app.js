let username;
let socket = io();
do {
    username = prompt('Please provide username.')
} while (!username)

let commentBox = document.querySelector('#commentBox')
let postBtn = document.querySelector('#postBtn')
let comments = document.querySelector('#comments')

postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //alert(commentBox.value);

    postComment(commentBox.value)
})

function postComment(comment) {
    if (!comment) {
        return;
    }
    data = {
        comment,
        username,
    }
    appendComment(data);
    // Broadcast
    broadcastComment(data);
    //store in database
    syncWithDb(data);
}
fetch('/api/comments')
    .then(response => response.json())
    .then(json => {
        json.forEach(comment => {
            appendComment(comment)
        });
    })
function appendComment(data) {
    let lTag = document.createElement('li');

    let markup = `
        <div class="card card-primary">
            <div class="card-body m-0 py-1">
                <p class="h6">${data.username}</p>
                <p class="m-0">${data.comment}</p>
                <p class="m-0">${moment(data.time).format('LT')}</p>
            </div>
        </div>
    `
    lTag.innerHTML = markup;
    // console.log(lTag)
    comments.prepend(lTag)
    commentBox.value = '';
}
function broadcastComment(data) {
    socket.emit('comment', data);
}

socket.on('comment', (data) => {
    appendComment(data);
})

function syncWithDb(data) {
    headers = {
        "Content-Type": "application/json",
    }
    fetch("/api/comment", { method: 'post', body: data, headers })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
}