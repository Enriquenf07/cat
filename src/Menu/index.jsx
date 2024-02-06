import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
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
            icon: <LocationCityIcon/>,
            initialCond: true
        },
        {
            id: 3,
            label: 'Settings',
            icon: <SettingsIcon />,
            initialCond: true
        },
        
    ]
    
    return (
        <Grid item xs={12}>
            <Paper elevation={6} >
                <BottomNavigation
                    value={index}
                >
                    {MENU.map((item) => {
                        return item.initialCond && <BottomNavigationAction key={item.id} label={item.label} icon={item.icon} onClick={() => setIndex(item.id)}/>
                    })}
                </BottomNavigation>
            </Paper>
        </Grid>
    );
}