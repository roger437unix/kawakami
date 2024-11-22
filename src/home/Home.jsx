import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import MainContent from './MainContent';
import { Link } from "react-router-dom"; //import do link

import './App.css';

function Home() {

   

    return (
        <div className="container">
            
            
            <Sidebar  />
            
            <MainContent />

            <div className="profile-icon">
                <Link to="/Perfil">
                <a ><img src="./img/person.png" alt="Perfil" /></a>
                </Link>
                
            </div>

            <div className="addBico_">
                <Link to="/AddBico">
                <button className='addBico'>
                    <p>+</p>
                    </button>
                </Link>
                
            </div>
            
        </div>
    );
}

export default Home;
