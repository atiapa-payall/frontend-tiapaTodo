const Note = ({ note, toggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important';
	return (
		<li>
			<p>{note.content}</p>
			<small>
				<time>{note.date}</time>
			</small>
			<button onClick={toggleImportance}>{label}</button>
		</li>
	);
};

export default Note;
