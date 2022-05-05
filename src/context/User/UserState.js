import UserContext from "./UserContext"

const UserState = (props)=>{
    const data = {
        username:"",
        ch_name:""
    }
    const Setdata = (username,ch_name)=>{
        data.username = username;
        data.ch_name = ch_name
    }
    return(
    <UserContext.Provider value={{data,Setdata}}>
        {props.childern}
    </UserContext.Provider>
    )
}
export default UserState