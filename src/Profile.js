import { useState, useEffect } from "react";
/**
 * Profile: Creates and handles the form for collecting the madLib words
 * 
 * Props: 
 * -onSubmit: function for passing the form data up to the parent
 * -formData: state for passing form data to parent
 * 
 * States:
 * -message: current value typed into the form
 * 
 * App --> ItemList --> Profile
 */

function Profile({onSubmit, setFormData, user }){
    //keeps input val props up to date
    const handleChange = evt => {
        const [ name, value ] = [evt.target.name, evt.target.value];
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };
    //ensures the user is logged in
    if(!user) {
      return (<h1 style={{color:"orange"}}>Login to view</h1>)
    }

    return(
        <div className="profile">
            <h1>{user.username}'s details</h1>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>

            <form onSubmit={onSubmit}>
                <label htmlFor="first_name" >First name</label>
                <input type="text" name="firstName" onChange={handleChange}></input><br/>
                <label htmlFor="last_name">Last name</label>
                <input type="text" name="lastName" onChange={handleChange}></input><br/>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={handleChange} ></input><br/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={handleChange}></input><br/>
                <button>Update</button>
            </form>
        </div>
    )
}

export default Profile;