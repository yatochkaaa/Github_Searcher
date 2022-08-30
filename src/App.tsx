import React from 'react';

import { requestUsers } from './api/api';
import { User } from './types/types';
import SearchBar from './components/SearchBar';

import './styles/styles.scss';

const App: React.FC = () => {
  const [input, setInput] = React.useState<string>('');
  const [users, setUsers] = React.useState<User[]>([]);

  const getUsers = async () => {
    const usersFromServer = await requestUsers(input);

    setUsers(usersFromServer.items);
  }

  React.useEffect(() => {
    getUsers();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="App">
      <SearchBar
        input={input}
        setInput={setInput}
        users={users}
      />
    </div>
  );
}

export default App;
