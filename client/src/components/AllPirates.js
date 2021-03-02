import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router';
import axios from 'axios';
import Button from '@material-ui/core/Button';



const mystyle={
    padding: "3%",
    backgroundColor: "rgb(243, 242, 242)"
    
}
const dis={
    display :"inline-flex",
    
}

export default () => {
    const [pirates, setPirates] = useState(null); 

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pirates')
            .then(response=>setPirates(response.data))
            .catch((err)=>console.log(err))
    }, [])

    const deleteHandler = (id) => {
        axios.delete('http://localhost:8000/api/pirate/' + id)
        .then(() => setPirates(pirates.filter(pirate => pirate._id !== id)))
        .catch((err)=>console.log(err))  
    }

    if (pirates === null) return "Loading...";

    return (
        <>
            <div style={mystyle}>
                <h1 >Pirate Crew</h1>
                <Button style={{    marginLeft: "70%"}} onClick={() => navigate("/pirate/new") } variant="contained" color="primary" disableElevation >
                    Add Pirate
                </Button>
            </div>
            {pirates.map((pirate, index)=>{
                    return (
                        <div key={index} style={{padding:"30px"}}>
                            <div style={dis}> 
                                <img style={{height: "200px", width: "200px", marginRight: "20px"}} src={pirate.image_url} alt={pirate.name}/>
                                <div style={{marginTop: "40px"}}>
                                    <h3>{pirate.name}</h3>   
                                    <Button style={{marginLeft:"20px", backgroundColor:"rgb(211, 187, 155)"}}  onClick={()=>navigate("/pirate/" + pirate._id)}  color="primary"  disableElevation >
                                        View Pirate                        
                                    </Button>
                                    <Button style={{marginLeft:"20px", backgroundColor:"rgb(211, 187, 155)"}} onClick={()=>deleteHandler(pirate._id)}  color="primary" disableElevation >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
            })}
        </>
    )
}
