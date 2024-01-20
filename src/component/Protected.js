import React, {  useContext} from 'react'
import {  Navigate} from 'react-router-dom';
import UserContext from '../Context';

function Protected ( props ) {
    const {loggedData} = useContext(UserContext)
  return (
    (loggedData.userData||loggedData.userGmail)? props.children :<Navigate to="/login"/>
  )
}

export default Protected