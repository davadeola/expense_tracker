import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'

export const Header = () => {

    const {backgroundState} = useContext(GlobalContext);

    return (
        <div>
            <h2>Expense Tracker. You are {backgroundState ? "SAFE" : "IN DEBT"}</h2>
        </div>
    )
}
