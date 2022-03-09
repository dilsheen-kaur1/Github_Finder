import { createContext, useReducer, useState } from "react";
import { createRenderer } from "react-dom/test-utils";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true)//false default

    const initialState = {
        users: [],
        user : {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //get inital users (testing purpose)
    // const fetchUsers = async () => {
    //     setLoading()
    //     const response = await fetch('https://api.github.com/users', {
    //         headers: {
    //             Authorization: `${GITHUB_TOKEN}`
    //         }
    //     })
    //     const data = await response.json();
    //     // setUsers(data)
    //     // setLoading(false)

    //     dispatch({
    //         type: 'GET_USERS',
    //         payload: data
    //     })
    // }

    //get search results
    const searchUsers = async (text) =>{
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        })
        const {items} = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    //get single user
    const getUser = async (login) =>{
        setLoading()
        const response = await fetch(`https://api.github.com/users/${login}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        })
        if(!response.status === 404){
            window.location = '/notfound'
        }

        else{
            const data = await response.json();

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
        
    }

    //get user repos
    const getUserRepos = async (login) =>{
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        })
        const data = await response.json();

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    //clear users from state
    const clearUsers = ()=>dispatch({type: 'CLEAR_USERS'})

    const setLoading = ()=>dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
                // fetchUsers
            }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext