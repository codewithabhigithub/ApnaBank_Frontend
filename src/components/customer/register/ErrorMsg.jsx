import './ErrorMsg.css'
function ErrorMsg(props){
    return(
        <div className="error">
            {props.children}
        </div>
    )
}
export default ErrorMsg