import { useEffect, useState } from 'react';
import './App.css';
import Note from './conponents/Note';
import Notification from './conponents/Notification';
import noteService from './services/noteService';
import loginService from './services/loginService';
import LoginForm from './conponents/LoginForm';
import NoteForm from './conponents/NoteForm';

export default function App() {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService
			.getAll()
			.then((initialNotes) => {
				setNotes(initialNotes);
			})
			.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		const loggendUserJSON = window.localStorage.getItem('loggedNoteAppUser');
		if (loggendUserJSON) {
			const user = JSON.parse(loggendUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const addNote = (noteObject) => {
		noteService.create(noteObject).then((res) => {
			setNotes([...notes, res]);
		});
	};
	const handleShowAll = () => {
		setShowAll(() => !showAll);
	};
	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((res) => {
				setNotes(notes.map((note) => (note.id !== id ? note : res)));
			})
			.catch(() => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};
	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login(username, password);

			window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
			noteService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('Wrong credentials');

			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};
	const handleLogout = () => {
		setUser(null);
		noteService.setToken(user.token);
		window.localStorage.removeItem('loggedNoteAppUser');
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notas perronas</h1>
			<Notification message={errorMessage} />
			{user ? (
				<NoteForm addNote={addNote} handleLogout={handleLogout} />
			) : (
				<LoginForm
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					handleSubmit={handleLogin}
				/>
			)}

			<div>
				<button onClick={handleShowAll}>
					{showAll ? 'Show only important' : 'Show all'}
				</button>
			</div>

			<ol>
				{notesToShow.map((note) => (
					<Note
						note={note}
						toggleImportance={toggleImportanceOf}
						key={note.id}
					/>
				))}
			</ol>
		</div>
	);
}
