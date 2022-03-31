import React, { useEffect, useState, useReducer } from "react";

/* creando mi propio UseHook */
function useLocalStorage(itemName, initialValue) {
  /* ESTADOS DE CARGA */
  const [state, dispatch] = useReducer(reducer, initialState({ initialValue }));

  const {
    sincronizedItem,
    error,
    loading,
    item
  } = state;

  /* const [sincronizedItem, setSincronizedItem] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(initialValue); */
  
  /* ACTION CREATOR */
  const onError = (error)=> dispatch({ 
    type: actionTypes.error, 
    payload: error 
  });
  
  const onSuccess = (item)=> dispatch({ 
    type: actionTypes.success, 
    payload: item 
  });
  
  const onSave = (item)=> dispatch({ 
    type: actionTypes.save, 
    payload: item 
  });

  const onSincronize = ()=> dispatch({ 
    type: actionTypes.sincronize, 
    
  });
   
  useEffect(() => {
    setTimeout(() => {
      try {
        /* ====================== LOCALSTORAGE ========================== */
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          /* parsedItem = initialValue; */
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem);/* setItem(parsedItem); */
       /*  setLoading(false);
        setSincronizedItem(true) */
        /*==================== LOCALSTORAGE ========================== */
      } catch (error) {
        onError(error);
        /* setError(error)
        console.log(error)
        alert('ha sucedio un error') */
      }
    }, 1000);
  }, [sincronizedItem])

  /*================= persisitencias en localStorage ==================*/

  const saveTodos = (newItem) => {
    try {
      const stringigiedTodos = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringigiedTodos);
      onSave(newItem);
    } catch (error) {
      onError(error);
      /* setError(error); */
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  }

  /*================= persisitencias en localStorage ==================*/

  return {
    item,
    saveTodos,
    loading,
    error,
    sincronizeItem
  }

}

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: initialValue
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'save',
  sincronize: 'SINCRONIZE'
}

const reducerObject = (state, payload) => ({

  [actionTypes.error]: {
    ...state,
    error: true
  },
  [actionTypes.success]:{
    ...state,
    error: false,
    loading: false,
    sincronizedItem:true,
    item: payload
  },
  [actionTypes.save]: {
    ...state,
    item: payload
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true
  }

})

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { useLocalStorage };
