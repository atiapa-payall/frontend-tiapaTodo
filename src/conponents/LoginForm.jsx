import Togglable from './Togglable';
export default function LoginForm({ handleSubmit, ...props }) {
	return (
		<Togglable buttonLabel={'Show Login'}>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						value={props.username}
						name='username'
						onChange={props.handleUsernameChange}
						placeholder='Username'
					/>
				</div>
				<div>
					<input
						type='password'
						value={props.password}
						name='password'
						onChange={props.handlePasswordChange}
						placeholder='Password'
					/>
				</div>
				<button>Login</button>
			</form>
		</Togglable>
	);
}
