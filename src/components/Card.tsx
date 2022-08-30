import React from 'react';
import { RepoItem, User } from '../types/types';
import formatDate from '../utils/formatDate';

interface Props {
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  repoInput: string;
  setRepoInput: React.Dispatch<React.SetStateAction<string>>;
  userRepos: RepoItem[];
}

const Card: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  repoInput,
  setRepoInput,
  userRepos
}) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target; 

    setRepoInput(value);
  }

  const handleClick = () => {
    setSelectedUser(null)
  }

  return (
    <>
      <div
        className='modal'
        aria-label="modal"
        role="button"
        onClick={handleClick}
      />

      <div className='card modal__window'>
        <div className='card__container'>
          <div className='card__info'>
            <img
              className='card__avatar'
              src={selectedUser.avatar_url}
              alt="user's avatar"
            />

            <div className='card__bio'>
              <ul className='card__bio-list'>
                <li className='card__bio-item'>
                  {selectedUser.login}
                </li>

                {selectedUser.email && (
                  <li className='card__bio-item'>
                    {selectedUser.email}
                  </li>
                )}

                <li className='card__bio-item'>
                  {selectedUser.location}
                </li>

                <li className='card__bio-item'>
                  {formatDate(selectedUser.created_at)}
                </li>

                <li className='card__bio-item'>
                  {selectedUser.followers} Followers
                </li>

                <li className='card__bio-item'>
                  Following {selectedUser.following}
                </li>
              </ul>
            </div>
          </div>

          <input
            className='card__input input'
            type="text"
            placeholder="Search for User's Repositories"
            value={repoInput}
            onChange={handleChangeInput}
          />
        </div>

        {userRepos.map(userRepo => {
          return (
            <a
              className='card__repo-item'
              key={userRepo.id}
              href={userRepo.html_url}
              target="blank"
            >
              <div>{userRepo.name}</div>

              <div className='card__repo-evaluation'>
                <div>{userRepo.forks} Forks</div>
                <div>{userRepo.stargazers_count} Stars</div>
              </div>
            </a>
          )
        })}
      </div>
    </>
  );
}

export default Card;