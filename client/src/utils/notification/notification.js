import "./notification.css";

export const ShowErrorMsg = (msg) => {
  return (
    <div className="errMsg">{msg}</div>
  )
}

export const ShowSuccessMsg = (msg) => {
  return (
    <div className="successMsg">{msg}</div>
  )
}
