import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { API_URL } from 'app/constants'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['Authorization'] = `Token ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'Token',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (username, password) => {
        const response = await axios.post(API_URL + '/users/login/', {
            username,
            password,
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(response.status)
        console.log(response.data)
        const accessToken = response.data["token"]
        console.log(accessToken)
    
        const response2 = await axios.get(API_URL + '/users/me/', {
            headers: {
                Authorization: "Token " + accessToken,
              },
        })
        .catch((error) => {
            console.log(error)
        })
        const user  = response2.data

        setSession(accessToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }
    
    const register = async (username, first_name, last_name, password) => {
        const response = await axios.post(API_URL + '/users/signup/', {
            username,
            first_name,
            last_name,
            password,
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(response.data)

        const response2 = await axios.post(API_URL + '/users/login/', {
            username,
            password,
        })
        .catch((error) => {
            console.log(error)
        })

        console.log(response2.data)

        const accessToken = response2.data["token"]
        console.log(accessToken)

        //user things -> why would I need a get method?
        const user = response.data
        console.log(user)


        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken) {
                    setSession(accessToken)
                    const response = await axios.get(API_URL + '/users/me/')

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: response.data,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'Token',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { setSession }
