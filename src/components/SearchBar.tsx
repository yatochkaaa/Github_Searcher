import React from 'react';
import { requestUser } from '../api/api';
import { UserItem, User } from '../types/types';

interface Props {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  users: UserItem[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SearchBar: React.FC<Props> = ({
  userInput,
  setUserInput,
  users,
  selectedUser,
  setSelectedUser
}) => {
  const getUser = async (login: string) => {
    const userFromServer = await requestUser(login);

    setSelectedUser(userFromServer);
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target; 

    setUserInput(value);
  }

  return (
    <div className='search'>
      <div className='search__header'>
        <h2 className='search__title'>
          Github Searcher
        </h2>

        <input
          className='search__input input'
          type="text"
          placeholder="Search for Users"
          value={userInput}
          onChange={handleChangeInput}
        />
      </div>

      <div className='search__result'>
        {users.map(user => {
          return (
            <div
              className='search__user lineCard'
              key={user.id}
              onClick={() => {
                if (user.id === selectedUser?.id) {
                  setSelectedUser(null)
                } else {
                  getUser(user.login)
                }
              }}
            >
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
    </div>
  );
}

export default SearchBar;
