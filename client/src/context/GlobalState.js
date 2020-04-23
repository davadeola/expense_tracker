import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer';
import axios from 'axios';

//initial state
const initialState = {
  transactions: [],
  errors:  null,
  loading: true,
  backgroundState: true
};


//create context
export const GlobalContext = createContext(initialState);


//Provider component

export const GlobalProvider  =  ({children}) =>{
    const [state, dispatch ] = useReducer(AppReducer, initialState);

    //actions that make call to the reducer
    async function getTransactions(){
      try {
        const res = await axios.get('/api/v1/transactions');
      
          dispatch({
          type: 'GET_TRANSACTIONS',
          payload: res.data.data
        })
      } catch (error) {

        dispatch({
          type: 'TRANSACTIONS_ERROR',
          payload: error.response.data.error
        })

        console.log(error);
        
        
      }
    }


     async function deleteTransactions(id){

      try {
        await axios.delete(`/api/v1/transactions/${id}`);

        dispatch({
          type: 'DELETE_TRANSACTION',
          payload: id
        })

      } catch (error) {
        dispatch({
          type: 'TRANSACTIONS_ERROR',
          payload: error.response.data.error
        })
      }


       
     }


     async function addTransaction(transaction){
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res  = await axios.post(`/api/v1/transactions`, transaction, config);

        dispatch({
          type: 'ADD_TRANSACTION',
          payload: res.data.data
       })

      } catch (error) {
        dispatch({
          type: 'TRANSACTIONS_ERROR',
          payload: error
        })
      }


       
     }

     function changeBackground(){
       dispatch({
         type: 'CHANGE_BACKGROUND',
         payload: false
       })
     }


    return(<GlobalContext.Provider value={{
        transactions: state.transactions,
        backgroundState: state.backgroundState,
        error: state.error,
        loading: state.loading,
        deleteTransactions,
        getTransactions,
        addTransaction,
        changeBackground
        }}>
        {children}
    </GlobalContext.Provider>)
}