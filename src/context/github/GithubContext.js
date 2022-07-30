import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	//  Set Loading
	const setLoading = () => {
		dispatch({ type: "SET_LOADING" });
	};

	const searchUsers = async (text) => {
		await setLoading();

		const params = new URLSearchParams({
			q: text,
		});

		const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {});
		const { items } = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: items,
		});
	};

	//  Get single user
	const getUser = async (login) => {
		await setLoading();

		const response = await fetch(`${GITHUB_URL}/users/${login}`);

		if (response.status === 404) {
			window.location = "/notfound";
		} else {
			const data = await response.json();

			dispatch({
				type: "GET_USER",
				payload: data,
			});
		}
	};

	//  Get repos
	const getRepos = async (login) => {
		await setLoading();

		const params = new URLSearchParams({
			sort: "created",
			per_page: 10,
		});

		const response = await fetch(
			`${GITHUB_URL}/users/${login}/repos?${params}`
		);
		const data = await response.json();

		dispatch({
			type: "GET_REPOS",
			payload: data,
		});
	};

	const clearUsers = () => {
		dispatch({
			type: "CLEAR_USERS",
		});
	};

	return (
		<GithubContext.Provider
			value={{
				...state,
				getUser,
				searchUsers,
				clearUsers,
				getRepos,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
