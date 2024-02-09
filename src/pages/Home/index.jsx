import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import useStatsMenu from "./Hooks/useStatsMenu";
import { numberformat } from "swarm-numberformat";
import useGameStore from "../../store/useGameStore";

export default function Home() {
    const [isStatsVisible, setIsStatsVisible] = useState(true)
    const homeIndex = useGameStore(state => state.homeIndex)
    const menu = useStatsMenu(homeIndex)
    return (
        <Grid item xs={12} md={12} sx={{ padding: '1.2rem' }}>
            {menu.display()}
        </Grid>
    )
}