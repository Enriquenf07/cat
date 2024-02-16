import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Divider, Paper, IconButton, Typography, useMediaQuery } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationCityIcon from '@mui/icons-material/LocationCity';


export default function Menu({ setIndex, index }) {
    const MENU = [
        {
            id: 0,
            label: 'Home',
            icon: <HomeIcon />,
            initialCond: true
        },
        {
            id: 1,
            label: 'Character',
            icon: <PersonIcon />,
            initialCond: true
        },
        {
            id: 2,
            label: 'City',
            icon: <LocationCityIcon />,
            initialCond: true
        },
        {
            id: 3,
            label: 'Settings',
            icon: <SettingsIcon />,
            initialCond: true
        },

    ]

    const isMobile = useMediaQuery('(max-width:700px)')

    

    return (
        <>
            <Grid item xs={12} container height={'100%'} flexDirection={isMobile ? 'row' : 'column'} justifyContent={!isMobile ? 'space-between' : 'center'} alignItems={isMobile && 'end'} style={{ paddingTop: !isMobile && '1rem' }}>
                <Grid item container width={isMobile ? 'fit-content' : '100%'}>
                    {MENU.slice(0, -1).map(i => {
                        return (
                            <>
                                <Grid item container flexDirection={'column'} alignItems={'center'} xs={true} md={12} marginBottom={!isMobile && '0.6rem'}>
                                    <IconButton sx={index == i.id && {bgcolor: 'secondary.light', '&:hover': {bgcolor: 'secondary.main'}}} onClick={() => setIndex(i.id)} aria-label="add to shopping cart">
                                        {i.icon}
                                    </IconButton>
                                    {!isMobile && <Typography fontSize={'14px'}>{i.label}</Typography>}
                                </Grid>
                            </>

                        )
                    })}
                </Grid>
                <Grid item container sx={{width: isMobile ? 'fit-content' : '100%'}} flexDirection={'column'}  alignItems={'center'}>
                    <IconButton onClick={() => setIndex(MENU[MENU.length - 1].id)} aria-label="Settings">
                        {MENU[MENU.length - 1].icon}
                    </IconButton>
                </Grid>
            </Grid>

        </>

    );
}