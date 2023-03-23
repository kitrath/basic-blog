(() => {

// https://code-boxx.com/strip-remove-html-tags-javascript/
const stripTags = (mightBeHTML) => {
    const dom = new DOMParser().parseFromString(mightBeHTML, "text/html");

    return dom.body.textContent;
};

const handleComment = async (e) => {
    e.preventDefault();

    try {
        const textArea = document.querySelector('#comment-content');
        const input = textArea.value.trim();

        if (!input.length) {
            return;
        }

        const content = stripTags(input);

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            textArea.value = '';
            document.location.reload();
        } else {
            alert('Something went wrong.  Please try again');
        }
    } catch (err) {
        console.error(err);
    }
};

const commentForm = document.querySelector('#comment-form');
commentForm.addEventListener('submit', handleComment);
// End IIFE
})();