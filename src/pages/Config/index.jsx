import { Button, Grid, Typography } from "@mui/material"
import useGameStore from "../../store/useGameStore"
import { toast } from "react-toastify"

export default function Config() {
    const reset = useGameStore(state => state.resetGame)
    const saveFile = useGameStore(state => state.saveFile)

    return (
        <>
            <Grid item container spacing={1} flexDirection={'row'} xs={12} sx={{ padding: '1.2rem' }}>
                <Grid item>
                    <Button onClick={reset} variant="contained" sx={{ padding: '2rem', bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
                        <Typography>Reset Game</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(saveFile)
                        toast.info('Saved in clipboard!')
                    }} variant="contained" sx={{ padding: '2rem', bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
                        <Typography>Export Game</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(saveFile)
                        toast.info('Saved in clipboard!')
                    }} variant="contained" sx={{ padding: '2rem', bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
                        <Typography>Import Game</Typography>
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}