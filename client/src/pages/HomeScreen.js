import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChatScreen from '../components/ChatScreen'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome'

const AllRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<Welcome/>} />
            <Route path='/:id/:name' element={<ChatScreen/>} />
        </Routes>
    )
}

function HomeScreen() {
  return (
    <Box sx={{display:"flex"}}>
        <Sidebar/>
        <AllRoutes/>
    </Box>
  )
}

export default HomeScreen
