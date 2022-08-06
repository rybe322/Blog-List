const UserInfo = ({ user }) => {
  if (user !== null) {
    return (
      <div>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
      </div>
    )
  }
}

export default UserInfo