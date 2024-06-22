import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const[user,setUser]=useState([]);

    const{id}=useParams();

    useEffect(()=>{
        getUser();
    },[])

    const getUser=async()=>{
        const response= await axios.get("http://localhost:8080/allUsers");
        setUser(response.data);
    }

    const deleteUser=async(id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`);
        getUser();
    }

  return (
    <div className="container">
        <div className='py-4'>
        <table className="table border shadow">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((users,index)=>(
                        <tr>
                            <th scope='row' key={index}>{index+1}</th>
                            <td>{users.name}</td>
                            <td>{users.username}</td>
                            <td>{users.email}</td>
                            <td>
                                <Link className='btn btn-primary mx-2'
                                      to={`viewuser/${users.id}`}>View</Link>
                                <Link className='btn btn-outline-primary mx-2'
                                      to={`edituser/${users.id}`} > Edit </Link>
                                <button className='btn btn-outline-danger mx-2'
                                        onClick={()=>deleteUser(users.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}
