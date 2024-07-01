let openedPopupID = null

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".popup-container").addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-container')) {
            closePopup();
        }
    });
});

function getNoteById(id) {
    let notesArray = window.localStorage.getItem("notes");
    notesArray = JSON.parse(notesArray);
    let note = notesArray.find((note) => note.id === id);

    return note;
}

function openPopup(id) {
    let note = getNoteById(id);

    let popup = document.querySelector('.popup-container');
    popup.style.display = 'flex';
    let title = popup.querySelector('#popup-title');
    let desc = popup.querySelector('#popup-note');
    let tags = popup.querySelector('#popup-tags');


    title.value = note.title;
    desc.value = note.desc;
    tags.value = JSON.parse(note.tags).join(",")
    
    openedPopupID = id;
}

function saveEdit() {
    const newTitle = document.getElementById('popup-title').value;
    const newNote = document.getElementById('popup-note').value;
    let newTags = document.getElementById('popup-tags').value;

    newTags = newTags.replace(/\s/g, '');

    
    let selectedNote = getNoteById(openedPopupID);
    selectedNote.title = newTitle;
    selectedNote.desc = newNote;
    selectedNote.tags = JSON.stringify(newTags.split(','));

    let notesArray = JSON.parse(window.localStorage.getItem('notes'));
    let noteIndex = notesArray.findIndex((note) => note.id === openedPopupID);
    notesArray[noteIndex] = selectedNote;

    window.localStorage.setItem('notes', JSON.stringify(notesArray));

    // Update the UI
    let note = document.getElementById(openedPopupID);
    note.querySelector(".title").innerText = newTitle;
    note.querySelector('.desc').innerText = newNote;

    let tagsContainer = note.querySelector('.tags-container');
    tagsContainer.innerHTML = '';
    let splitedTags = newTags.split(',');
    if(splitedTags.length !== 0){

        splitedTags.forEach(tag => {
            let randomColor = getRandomColor()
            tagsContainer.innerHTML += `<span class="tag" style="--color: ${randomColor}">${tag}</span>`
        });
    }else{
        let randomColor = getRandomColor()
        tagsContainer.innerHTML = `<span class="tag" style="--color: ${randomColor}">${tag}</span>`
    }

    closePopup();
}

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
}
