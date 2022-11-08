export function getUserEmail(users, currentUserEmail) {
  return users.filter((user) => user !== currentUserEmail)[0];
}
