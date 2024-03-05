import { Box, Grid, Paper } from "@mui/material";
// import {Image} from 'mui-image'

const Header = () => {
  return (
    <Grid container direction={'column'}>
      <Box
        component="img"
        sx={{
          height: '40px',
          width: '40px',
          position: 'fixed',
          left: '1%',
          top: '1%'
        }}
        alt="logo"
        src="/logo_new.png"
      />
      <Grid item className="title animate__animated animate__fadeInUp" fontWeight={600} fontFamily={"Poppins"} fontSize={'4em'} color={'white'}>
        MANAGE YOUR TASKS
      </Grid>
      <Grid item className="subTitle animate__animated animate__fadeInUp" fontFamily={"Dancing Script"} fontSize={'2em'} color={'white'}>
        Anywhere. Anytime.
      </Grid>
    </Grid>
  );
};
export default Header;
