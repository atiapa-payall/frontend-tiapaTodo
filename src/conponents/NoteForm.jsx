import { useState, useRef } from 'react';
import Togglable from './Togglable';
export default function NoteForm({ addNote, handleLogout }) {
	const [newNote, setNewNote] = useState('');
	const togglableRef = useRef();

	const handleChange = (event) => {
		setNewNote(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const noteObject = {
			content: newNote,
			important: Math.random() > 0.5,
		};

		addNote(noteObject);
		setNewNote('');
		togglableRef.current.toggleVisibility();
	};

	return (
		<Togglable buttonLabel={'New note'} ref={togglableRef}>
			<h2>Create a new note</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Write your note'
					onChange={handleChange}
					value={newNote}
				/>
				<button>save</button>
			</form>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</Togglable>
	);
}
