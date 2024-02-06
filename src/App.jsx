import { CssBaseline, Grid } from '@mui/material'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Router from './Router'
import Menu from './Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useGameLogic } from './GameLogic/useGameLogic'

const theme = createTheme({
    palette: {
        mode: 'light',
    },

});

function App() {
    const [index, setIndex] = useState(0)

    useGameLogic()

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ToastContainer
                    position="bottom-left"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="colored"
                />

                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} md={7}>
                        <Menu index={index} setIndex={setIndex} />
                        <Router index={index} />
                    </Grid>
                </Grid>
            </ThemeProvider>


        </>
    )
}

export default App
