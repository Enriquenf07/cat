import { Button, Dialog, Grid, TextField, Typography } from "@mui/material"
import useGameStore from "../../store/useGameStore"
import { toast } from "react-toastify"
import { useState } from "react"

export default function Config() {
    const reset = useGameStore(state => state.resetGame)
    const saveFile = useGameStore(state => state.saveFile)
    const [openModal, setOpenModal] = useState(false)
    const [newSaveFile, setNewSaveFile] = useState()
    const importSave = useGameStore(state => state.importSave)

    return (
        <>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <Grid container  flexDirection={'column'} sx={{padding:'1rem', gap: '0.4rem', bgcolor: 'secondary.main'}}>
                    <TextField onChange={e => setNewSaveFile(e.target.value)} label='Save'/>
                    <Button variant="contained" onClick={() => {
                        importSave(newSaveFile)
                        setOpenModal(false)
                    }}>Import</Button>
                </Grid>
            </Dialog>
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
                        setOpenModal(true)
                    }} variant="contained" sx={{ padding: '2rem', bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
                        <Typography>Import Game</Typography>
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}