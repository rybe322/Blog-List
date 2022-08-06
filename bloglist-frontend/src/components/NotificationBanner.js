const NotificationBanner = ({ message, isError=false }) => {
  if (message === null ) return null
  const normalStyle = {
    color: 'white',
    backgroundColor: 'green',
    fontSize: '30px'
  }
  const errorStyle = {
    color: 'red',
    backgroundColor: 'grey',
    fontSize: '30px'
  }
  return (
    <div style={isError ? errorStyle : normalStyle}>{message}</div>
  )
}

export default NotificationBanner