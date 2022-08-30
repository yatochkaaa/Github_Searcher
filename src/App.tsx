import React from 'react';

import { requestUserRepos, requestUsers } from './api/api';
import { UserItem, User, RepoItem } from './types/types';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

import './styles/styles.scss';

const App: React.FC = () => {
  const [userInput, setUserInput] = React.useState<string>('');
  const [users, setUsers] = React.useState<UserItem[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [repoInput, setRepoInput] = React.useState<string>('');
  const [userRepos, setUserRepos] = React.useState<RepoItem[]>([]);


  const getUsers = async () => {
    const usersFromServer = await requestUsers(userInput);

    setUsers(usersFromServer.items);
  }

  const getRepos = async () => {
    if (selectedUser) {
      const reposFromServer = await requestUserRepos(selectedUser.login);

      setUserRepos(reposFromServer.items);
    };
  }

  React.useEffect(() => {
    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  React.useEffect(() => {
    getRepos();
    console.log(userRepos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  const filteredUserRepos = userRepos.filter(userRepo => userRepo.name.includes(repoInput))

  return (
    <div className="App">
      <SearchBar
        userInput={userInput}
        setUserInput={setUserInput}
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && (
        <Card
          selectedUser={selectedUser}
          repoInput={repoInput}
          setRepoInput={setRepoInput}
          userRepos={filteredUserRepos}
        />
      )}
    </div>
  );
}

export default App;
