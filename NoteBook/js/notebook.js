const notes = window.localStorage.getItem('notes') || null;

/**
 * this piece of code will add the notes to the page
 * when the page is loaded
 * 
*/
document.addEventListener('DOMContentLoaded', () => {
    if (notes != null) {
        let notesArray = JSON.parse(notes);

        notesArray.forEach(note => {
            addNoteToPage(note);
        });
    }

});

function getRandomColor() {
    let colors = ["#013220", "#01796F", "#8A9A5B", "#4A2F27", "#6B6B6B"]

    return colors[(Math.floor(Math.random() * colors.length))]
}

/**
 * this function will add a note to the page
 * 
 * @param {Object} note 
*/
function addNoteToPage(note) {
    const numberOfLines = 3;

    let notesList = document.querySelector('.right.container');
    let noteDiv = document.createElement('div');

    noteDiv.classList.add('note');

    if(note.completed){
        noteDiv.classList.add("completed")
    }

    noteDiv.setAttribute('id', note.id);

    console.log(JSON.parse(note.tags));

    let tagsContainer = "";

    JSON.parse(note.tags).forEach(tag => {
        let randomColor = getRandomColor()
        tagsContainer += `<span class="tag" style="--color: ${randomColor}">${tag}</span>`

    });

    noteDiv.innerHTML = `<div class="tags-container">
                            ${tagsContainer}
                        </div>
                        <div class="info">
                            <span class="title putEllipsis">${note.title}</span>
                            <p class="desc putEllipsis" style="--lines: 3;"></p>
                        </div>
                        <div class="btns">
                            <button onclick="completeNote('${note.id}')">${note.completed?'Mark as uncomplete':'Mark as complete'}</button>
                            <button onclick="openPopup('${note.id}')">view</button>
                            <button onclick="deleteNote('${note.id}')">delete</button>
                        </div>`;
    notesList.appendChild(noteDiv);

    let desc = note.desc.split('\n');
    let descText = desc.slice(0, numberOfLines).join('\n');

    noteDiv.querySelector('.desc').textContent = descText;
}

/**
 * this function will create a unique id for each note 
 * 
 * @param {Integer} length 
 * @returns 
 */
function genrateUniqueID(length = 6) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = Date.now().toString(36); // Use current timestamp as base
    for (let i = result.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

/**
 * this function will add a new note to the local storage
 * and call addNoteToPage to add the note to the page
 * 
 */
function addNote() {
    let title = document.querySelector('#title');
    let desc = document.querySelector('#note');
    let tags = document.querySelector('#tags');

    let tagsArray = tags.value.replace(" ", "").split(",");

    let note = {
        id: genrateUniqueID(),
        title: title.value,
        desc: desc.value,
        completed: false,
        tags: JSON.stringify(tagsArray)
    };

    let notes = window.localStorage.getItem('notes') || null;
    let notesArray = [] ;

    if (notes === null) {
        notesArray.push(note);
    } else {
        notesArray = JSON.parse(notes);
        notesArray.push(note);
    }
    window.localStorage.setItem('notes', JSON.stringify(notesArray));

    addNoteToPage(note);

    title.value = '';
    desc.value = '';
    desc.textContent = '';
    tags.value = '';
    tags.textContent = '';
}

/**
 * this function will delete a note from the local storage
 * and remove it from the page
 * 
 * @param {String} id 
 */

function deleteNote(id) {
    let notesArray = JSON.parse(window.localStorage.getItem('notes'));
    let noteIndex = notesArray.findIndex((note) => note.id === id);
    notesArray.splice(noteIndex, 1);
    window.localStorage.setItem('notes', JSON.stringify(notesArray));

    let noteDiv = document.getElementById(id);
    noteDiv.remove();
}

/**
 * this function will mark a note as completed
 * 
 * @param {String} id 
 */
function completeNote(id) {
    let notesArray = JSON.parse(window.localStorage.getItem('notes'));
    let noteIndex = notesArray.findIndex((note) => note.id === id);
    notesArray[noteIndex].completed = !notesArray[noteIndex].completed;
    window.localStorage.setItem('notes', JSON.stringify(notesArray));

    let note = document.getElementById(id);
    note.classList.toggle('completed');

    
    note.querySelector("button:first-child").innerText = notesArray[noteIndex].completed?"Mark as uncomplete":'Mark as complete';
    

}