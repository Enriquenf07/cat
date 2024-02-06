import { Box, Button, Divider, Typography } from "@mui/material";

export default function Upgrades({children}) {
    return (
        <>
            <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                <Divider />
            </Box>
            <Typography variant="h6" color={'primary'}>
                Upgrades
            </Typography>
            {children}

        </>
    )
}