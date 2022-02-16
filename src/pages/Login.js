import { Divider, TextField } from '@mui/material'
import React from 'react'
import style from '../styles/style.css'
import Box from "@mui/material/Box";

function Login() {
  return (
   <>
   <div className="a">
       <h1 className="login_head">
           Login
       </h1>
       <Box>

       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
       
       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
       </Box>
       <input type="password" name="" id="" />
   </div>
   </>
  )
}

export default Login