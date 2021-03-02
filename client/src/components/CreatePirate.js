import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';




const mystyle={
    padding: "3%",
    backgroundColor: "rgb(243, 242, 242)"
    
}
const styles = {
    paper: {
        width: "50%", padding: "3%"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}

export default () => {
    const [name, setName] = useState(""); 
    const [image_url, setImageURL] = useState("");
    const [num_of_treasures, setNumOfTreasures] = useState("");
    const [catch_phrase, setCatchPhrase] = useState("");
    const [crew_position, setCrewPosition] = useState("");
    const [peg_leg, setPegLeg] = useState(true);
    const [eye_patch, setEyePatch] = useState(true);
    const [hook_hand, setHookHand] = useState(true);

    const [errors, setErrors] = useState([]);
  
    const onSubmitHandler = e => {
        e.preventDefault();
        setErrors([]);
        axios.post('http://localhost:8000/api/pirate', {
            name,
            image_url,
            num_of_treasures,
            catch_phrase,
            crew_position,
            peg_leg,
            eye_patch,
            hook_hand
        })
            .then(() => navigate("/"))
            .catch(err => {
                const errs = [];
                const innerErrors = err.response.data.errors;

                for (const key in innerErrors){
                    errs.push(innerErrors[key].message);
                }
                setErrors(errs);
            })
    }

    return (
        <>
            <div style={mystyle}>
                <h1 >Add Pirate</h1>
                <Button style={{    marginLeft: "70%"}} onClick={() => navigate("/")} variant="contained" color="primary" disableElevation >
                    Crew Board
                </Button>
            </div>
            <center>
            <Paper elevation={3} style={styles.paper}>
                    {errors.map((err, i) => (
                    <p key={i} style={{color: "red"}}>{err}</p>
                ))}                
                <form onSubmit={onSubmitHandler} style={{display: "grid"}}>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Pirate Name:</InputLabel>
                        <OutlinedInput type="text" value={name} onChange = {(e)=>setName(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Image URL:</InputLabel>
                        <OutlinedInput   type="text" value={image_url} onChange = {(e)=>setImageURL(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel> Number of Treasure Chests:</InputLabel>
                        <OutlinedInput type="number" value={num_of_treasures} onChange = {(e)=>setNumOfTreasures(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Pirate Catch Phrase:</InputLabel>
                        <OutlinedInput type="text" value={catch_phrase} onChange = {(e)=>setCatchPhrase(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Crew Position: </InputLabel>
                        <Select onChange = {(e)=>setCrewPosition(e.target.value)} name="crew_position" value={crew_position}>
                            <option value="">Select Crew Position</option>
                            <option value="Captain">Captain</option>
                            <option value="First Mate">First Mate</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </Select>
                    </FormControl>

                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Peg Leg:</InputLabel>
                            <Checkbox type="checkbox" value={peg_leg} onChange = {()=>setPegLeg(!peg_leg)} checked={peg_leg} />
                        </FormControl>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Eye Patch:</InputLabel>
                            <Checkbox type="checkbox" value={eye_patch} onChange = {()=>setEyePatch(!eye_patch)} checked={eye_patch}/>
                        </FormControl>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Hook Hand: </InputLabel>
                            <Checkbox type="checkbox" value={hook_hand} onChange = {()=>setHookHand(!hook_hand)} checked={hook_hand}/>
                        </FormControl>
                    
                    <Button type="submit" variant="contained" color="primary">
                        Add Pirate
                    </Button>
                </form>
            </Paper>
            </center>
    </>
    )
}
