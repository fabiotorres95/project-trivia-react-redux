export const USER_PLAYER = 'USER_PLAYER';

export const requestUserPlayer = (name, email) => ({
  type: USER_PLAYER,
  name,
  email,
});
