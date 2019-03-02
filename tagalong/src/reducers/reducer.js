export const GET_USER = ''
export const GET_USER_SUCCESS = '';
export const GET_USER_FAIL = '';

export default function reducer(state = { token: '' }, action) {
  switch (action.type) {

        loading: false,
        error: 'Error while fetching users'
      };
    default:
      return state;
  }
}

// Want this to be a function containing what we do with the info
export function listRepos(user) {
  return {
    type: GET_REPOS,
    payload: {
      request: {
        url: `/users/${user}/repos`
      }
    }
  };
}
