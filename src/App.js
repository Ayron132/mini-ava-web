import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Posts from './pages/Posts';
import ActivityResponse from './pages/ActivityResponse';
import ActivityResponses from './pages/ActivityResponses';
import './App.css';

function App() {
  return (
    <BrowserRouter style={{margin: 0}}>
      <div style={{margin: 0}}>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/classrooms/:id/posts" element={<Posts />} />
        <Route path="/classrooms/:classroomId/posts/:id/response" element={<ActivityResponse />} />
        <Route path="/classrooms/:classroomId/posts/:postId/responses" element={<ActivityResponses />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
