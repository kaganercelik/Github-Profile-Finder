import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";
import Spinner from "../components/layout/Spinner";
import RepoList from "../components/repos/RepoList";
import ProfileDetails from "../components/users/ProfileDetails";

function User() {
	const { getUser, user, loading, getRepos, repos } = useContext(GithubContext);

	const params = useParams();

	useEffect(() => {
		getUser(params.login);
		getRepos(params.login);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		name,
		type,
		avatar_url,
		location,
		bio,
		blog,
		twitter_username,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = user;

	return (
		<>
			<div className="w-full mx-auto lg:w-10/12">
				<ProfileDetails />
				<RepoList repos={repos} />
			</div>
		</>
	);
}

export default User;
