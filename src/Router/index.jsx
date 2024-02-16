import Config from "../pages/Config";
import Home from "../pages/Home";
import { Grid, useMediaQuery } from "@mui/material";

const page = {
    0: <Home/>,
    1: <></>,
    2: <></>,
    3: <Config/>,
}


export default function Router({ index }) {
    const isMobile = useMediaQuery('(max-width: 700px)')

    return (
        <>
        <Grid container sx={{ bgcolor: 'primary.light' }}  item xs={12} height={!isMobile ? '100lvh' : '90lvh'}>
            {page[index]}
        </Grid>
        </>
    )
}