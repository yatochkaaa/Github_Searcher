const requestURL = 'https://api.github.com';

export const requestUsers = async (username: any) => {
  const response = await fetch(`${requestURL}/search/users?q=${username}+in:user&per_page=12`);
  
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};
