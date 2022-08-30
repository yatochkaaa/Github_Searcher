import React from 'react';
import { User } from '../types/types';

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  users: User[];
}

const SearchBar: React.FC<Props> = ({ input, setInput, users }) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target; 

    setInput(value);
  }

  return (
    <div className='search'>
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
    </div>
  );
}

export default SearchBar;
