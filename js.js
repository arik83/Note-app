document.addEventListener('DOMContentLoaded', function () {
    loadNotes();
});

function addNote() {
    const listName = document.getElementById('listName').value.trim();
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');

    if (noteInput.value.trim() !== '' && listName !== '') {
        const note = document.createElement('div');
        note.className = 'note';

        // Create separate elements for list name and note text
        const listNameElement = document.createElement('div');
        listNameElement.className = 'list-name';
        listNameElement.textContent = `List: ${listName}`;

        const noteTextElement = document.createElement('div');
        noteTextElement.className = 'note-text';
        noteTextElement.textContent = `Note: ${noteInput.value}`;

        note.appendChild(listNameElement);
        note.appendChild(noteTextElement);

        // Save note to specific list
        saveNoteToLocalStorage(listName, noteInput.value);

        notesContainer.appendChild(note);

        // Clear the input fields after adding the note
        document.getElementById('listName').value = '';
        noteInput.value = '';
    }
}

function saveNoteToLocalStorage(listName, note) {
    let lists = getListsFromLocalStorage();

    // Check if the list already exists
    const existingList = lists.find(list => list.name === listName);

    if (existingList) {
        existingList.notes.push(note);
    } else {
        // Create a new list if it doesn't exist
        const newList = { name: listName, notes: [note] };
        lists.push(newList);
    }

    localStorage.setItem('lists', JSON.stringify(lists));
}

function getListsFromLocalStorage() {
    let lists = localStorage.getItem('lists');

    if (lists === null) {
        lists = [];
    } else {
        lists = JSON.parse(lists);
    }

    return lists;
}

function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    const lists = getListsFromLocalStorage();

    lists.forEach(function (list) {
        list.notes.forEach(function (noteText) {
            const note = document.createElement('div');
            note.className = 'note';

            // Separate elements for list name and note text
            const listNameElement = document.createElement('div');
            listNameElement.className = 'list-name';
            listNameElement.textContent = `List: ${list.name}`;

            const noteTextElement = document.createElement('div');
            noteTextElement.className = 'note-text';
            noteTextElement.textContent = `Note: ${noteText}`;

            note.appendChild(listNameElement);
            note.appendChild(noteTextElement);

            notesContainer.appendChild(note);
        });
    });
}
