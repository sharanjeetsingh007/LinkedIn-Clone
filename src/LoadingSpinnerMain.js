import React from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './LoadingSpinnerMain.css'

function LoadingSpinnerMain() {
    return (<div className='LoadingSpinnerMain'><CircularProgress color="inherit" /></div>
    )
}

export default LoadingSpinnerMain