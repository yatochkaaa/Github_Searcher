import React from 'react';

import { requestUsers } from './api/api';
import { User } from './types/types';

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
  }, [input]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target; 

    setInput(value);
  }

  return (
    <div className="App">
      <section className='search'>
        <div className='search__header'>
          <h2 className='search__title'>
            Github Searcher
          </h2>

          <input
            className='search__input'
            type="text"
            placeholder='Search for Users'
            value={input}
            onChange={handleChangeInput}
          />
        </div>

        <div className='search__result'>
          {users.map(user => {
            return (
              <div className='search__user lineCard'>
                <div className='lineCard__bio'>
                  <img
                    className='lineCard__avatar'
                    src={user.avatar_url}
                    alt="user's avatar"
                  />

                  <div className='lineCard__login'>
                    {user.login}
                  </div>
                </div>

                <div className='lineCard__repo'>
                  {`Repo: ${user.repos_url.length}`}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
