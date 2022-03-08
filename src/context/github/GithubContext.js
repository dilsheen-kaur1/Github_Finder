import { createContext, useEffect, useState } from "react";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)//false default

    const fetchUsers = async () => {
        const response = await fetch(`https://api.github.com/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const data = await response.json();
        setUsers(data)
        setLoading(false)
    }
    return <GithubContext.Provider
            value={{
                users,
                loading,
                fetchUsers
            }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext