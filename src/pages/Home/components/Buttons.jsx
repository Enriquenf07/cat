import { Box, Button, Divider, Grid } from "@mui/material";

export default function Buttons() {
    return (
        <>
            <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                <Divider />
            </Box>
            <Grid container>
                <Grid item xs={6}>
                    <Button variant="outlined" fullWidth>Buy one</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" fullWidth>Buy max</Button>
                </Grid>
            </Grid>
        </>

    )
}