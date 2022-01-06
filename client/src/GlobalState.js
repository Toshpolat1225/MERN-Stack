import React, {createContext, useState} from 'react'
// , useEffect
export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    return (
        <GlobalState.Provider value={"Value in Global"}>
            {children}
        </GlobalState.Provider>
    )
}