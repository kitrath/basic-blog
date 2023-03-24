(() => {

let editFlag = false;
let postToEditId;

const newPostBtn = document.querySelector('#post-new');
const titleInput = document.querySelector('#post-title');
const editForm = document.querySelector('#blog-post-editor');
const contentTextarea = document.querySelector('#post-content');
const postsList = document.querySelector('#blog-post-list');

const show = (elem) => {
    elem.style.display = 'inline';
};

const hide = (elem) => {
    elem.style.display = 'none';
};

const clearEditor = () => {
    titleInput.value = '';
    contentTextarea.value = '';
}

const clearPost = (e) => {
    e.preventDefault();
    clearEditor();
    editFlag = false;
    hide(newPostBtn);
};

newPostBtn.addEventListener('click', clearPost);

const getPostById = async (id) => {
    try {
        return await fetch(`api/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
    } catch (err) {
        console.error(err); 
    }
};

const displayPostInEditor = async (e) => {
    e.preventDefault();

    const target = e.target;

    if (target.dataset.action === 'edit') {
        editFlag = true;
        const id = target.dataset.id;
        try {
            const response = await getPostById(id);
            const data = await response.json();
            const post = data.blog_post;
            postToEditId = post.id;
            titleInput.value = post.title;
            contentTextarea.value = post.content;
            // display button to clear editor
            show(newPostBtn);
        } catch (err) {
            console.error(err);
        }
    }
};

postsList.addEventListener('click', displayPostInEditor);

const deletePost = async (e) => {
    e.preventDefault();

    const target = e.target;

    if (target.dataset.action === 'delete') {
        const id = target.dataset.id;
        const confirmDelete = window.confirm(
            `Do you really want to delete post with id ${id}?`
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/posts/${id}`, {
                    method: 'DELETE',
                });
                
                if (response.ok) {
                    // We have to clear a post to edit from the
                    // editor becuase we lose the postId on refresh
                    clearEditor();
                    document.location.reload();
                    return;
                } else {
                    alert(`Unable to delete post with id ${id}.`)
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
};

postsList.addEventListener('click', deletePost);

// https://code-boxx.com/strip-remove-html-tags-javascript/
const stripTags = (mightBeHTML) => {
    const dom = new DOMParser().parseFromString(mightBeHTML, "text/html");

    return dom.body.textContent;
};

const editPost = async (post) => {
    try {
        // postToEditId (global) is set in displayPostInEditor()
        const response = await fetch(`/api/posts/${postToEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });

        if (response.ok) {
            editFlag = false;
            clearEditor();
            document.location.reload();
        } else {
            alert(`Unable to edit post with id ${postToEditId}.`);
        }
    } catch (err) {
        console.error(err);
    }
};

const createPost = async (post) => {
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
        
        if (response.ok) {
            clearEditor();
            document.location.reload();
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
};

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const errDisplay = document.querySelector('#err-post-editor');
    // Remove previous error message if one exists
    if (errDisplay.hasChildNodes()) {
        errDisplay.removeChild(errDisplay.firstChild);
    }

    const postTitle = titleInput.value.trim();
    const postContent = contentTextarea.value.trim();

    
    let errMsg = document.createElement('p');
    errMsg.style.color = 'red';

    if (!postTitle && !postContent) return;

    if (!postTitle) {
        errMsg.textContent = 'Your blog post must have a title';
        errDisplay.appendChild(errMsg);
        return;
    }

    if (!postContent) {
        errMsg.textContent = 'Your blog post must contain content';
        errDisplay.appendChild(errMsg);
        return;
    }

    const title = stripTags(postTitle);
    const content = stripTags(postContent);

    if (editFlag) {
        editPost({ title, content });
    } else {
        createPost({ title, content });
    }
});
// End IIFE
})();