import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    
} from '@material-ui/core';

const mystyle={
    padding: "3%",
    backgroundColor: "rgb(243, 242, 242)"
    
}
const styles = {
    paper: {
        width: "60%", padding: "3%"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}
const dis={
    display:"flex"
}




export default props => {
    const [pirate, setPirate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirate/" + props.id)
            .then(res => setPirate(res.data))
    }, [props.id])

    return (
        <div>
            <div style={mystyle}>
                <h1 >Pirate Crew</h1>
                <Button style={{    marginLeft: "70%"}} onClick={() => navigate("/")} variant="contained" color="primary" disableElevation >
                    Crew Board
                </Button>
            </div>
            <div>
                <center>
                <Paper elevation={3} style={styles.paper}>
                    <div style={dis}>
                        <div style={{ width: '100%'}}>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>Catch Phrase: {pirate.catch_phrase}</h4>
                            </Box>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>Crew Position: {pirate.crew_position}</h4>
                            </Box>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>Treasures: {pirate.num_of_treasures}</h4>
                            </Box>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>Peg leg: {pirate.peg_leg ? "Yes" : "No"}</h4>
                            </Box>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>Patch: {pirate.eye_patch ? "Yes" : "No"}</h4>
                            </Box>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>Hook Hand: {pirate.hook_hand ? "Yes" : "No"}</h4>
                            </Box>
                        </div>
                        <div>
                            <img style={{height: "400px", width: "350px"}} src={pirate.image_url} alt={pirate.name}/>
                            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                                <h4>"{pirate.catch_phrase }"</h4>
                            </Box>
                        </div>
                    </div>
                </Paper>
                </center>
            </div>
        </div>
    )
}
