import * as React from 'react';
import './header.css'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';




const Header = () => {


    return(
            <div>
                
                <div id='webLogo'></div>
                <h1 className='title animate__animated animate__fadeInUp'>MANAGE YOUR TASKS</h1>
                <p className='subTitle animate__animated animate__fadeInUp'>Anywhere. Anytime.</p>

            </div>
           ); 
};
export default Header;

