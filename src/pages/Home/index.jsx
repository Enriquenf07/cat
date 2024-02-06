import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import useStatsMenu from "./Hooks/useStatsMenu";
import { numberformat } from "swarm-numberformat";

export default function Home() {
    const [isStatsVisible, setIsStatsVisible] = useState(true)
    const menu = useStatsMenu()
    return (
        <Grid container item xs={12}>
            <Grid item xs={12} md={2.5} justifyContent={'center'}>
                <Button fullWidth onClick={() => setIsStatsVisible(p => !p)}>{isStatsVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</Button>
                <Divider></Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {
                        isStatsVisible &&
                        menu.buttons.map(button => (
                            <div key={button.id}>
                                <Button fullWidth sx={{display: 'flex', justifyContent: 'space-between', padding: '0.7rem',paddingLeft: '1.4rem'}} onClick={() => menu.setIndex([button.id])}>
                                    <Box>
                                        <Typography variant="body2">
                                           {button.title} 
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">
                                            {button.quantity && numberformat.format(button.quantity)}
                                        </Typography>
                                    </Box>
                                </Button>
                                <Divider></Divider>
                            </div>
                        ))
                    }
                </Box>

            </Grid>
            <Grid item xs={12} md={9.5} sx={{ padding: '1.2rem' }}>
                {menu.display()}
            </Grid>
        </Grid>
    )
}