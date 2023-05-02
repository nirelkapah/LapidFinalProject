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

                {/* <h1 className='subTitle animate__animated animate__fadeInUp font-effect-neon'>Scroll Down</h1> */}
                {/* <h4 className='subTitle animate__animated animate__fadeInUp'>With Us</h4> */}
                {/* <KeyboardDoubleArrowDownSharpIcon className='arrow animate__animated animate__fadeInUp font-effect-neon'/> */}
            </div>
           ); 
};
export default Header;

