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

    console.log(note, title, desc);

    title.value = note.title;
    desc.value = note.desc;
    tags.value = JSON.parse(note.tags).join(",")
    
    openedPopupID = id;
}

function saveEdit() {
    const newTitle = document.getElementById('popup-title').value;
    const newNote = document.getElementById('popup-note').value;

    let selectedNote = getNoteById(openedPopupID);
    selectedNote.title = newTitle;
    selectedNote.desc = newNote;

    let notesArray = JSON.parse(window.localStorage.getItem('notes'));
    let noteIndex = notesArray.findIndex((note) => note.id === openedPopupID);
    notesArray[noteIndex] = selectedNote;

    window.localStorage.setItem('notes', JSON.stringify(notesArray));

    // Update the UI
    document.querySelector('.note .title').value = newTitle;
    document.querySelector('.note .desc').innerText = newNote;

    closePopup();
}

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
}
