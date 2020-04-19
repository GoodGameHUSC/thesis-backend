const requireAuth = (socket, next) => {
  if(!socket.user) return false;
  return true;
}
export default requireAuth;