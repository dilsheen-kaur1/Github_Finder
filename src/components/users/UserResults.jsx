import {useContext, useEffect,useState} from 'react'
import Spinner from '../layouts/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResults() {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true)//false default
    const { users, loading ,fetchUsers } = useContext(GithubContext)
    // useEffect(()=>{
    //     fetchUsers()
    // },[])

    // const fetchUsers = async ()=>{
    //     const response = await fetch(`https://api.github.com/users`, {
    //         headers:{
    //             Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    //         }
    //     })
    //     const data = await response.json();
    //     setUsers(data)
    //     setLoading(false)
    // }

    if(!loading){
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3'>
                {users.map((user) =>(
                    // <h3>{user.login}</h3>
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
          )
    }
    else{
        return <Spinner />
    }
 
}

export default UserResults