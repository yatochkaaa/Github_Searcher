const requestURL = 'https://api.github.com';

export const requestUsers = async (username: string) => {
  const response = await fetch(`${requestURL}/search/users?q=${username}&type=usersr&per_page=12`);
  
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const requestUser = async (username: string) => {
  const response = await fetch(`${requestURL}/users/${username}`);
  
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const requestUserRepos = async (username: string) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=user:${username}`);
  
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}
