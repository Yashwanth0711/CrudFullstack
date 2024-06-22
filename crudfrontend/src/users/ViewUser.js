import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

    const {id}=useParams();
    
    const[user,setUser]=useState({
        name:"",
        username:"",
        email:""
    })

    useEffect(()=>{loadUser();},[]);
    
    const loadUser=async ()=>{
        const result=(await axios.get(`http://localhost:8080/user/${id}`)).data;
        setUser(result);
    }
    

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center'>Details of User:</h2>
                <div className="card" >
                    <ul className="list-group list-group-flush shadow-lg ">
                        <li className="list-group-item">Name : {user.name}</li>
                        <li className="list-group-item">Username : {user.username}</li>
                        <li className="list-group-item">E-mail : {user.email}</li>
                    </ul>
                </div>
                <Link className='btn btn-outline-danger mx-2' to="/">Back</Link>
            </div>
        </div>
    </div>
  )
}