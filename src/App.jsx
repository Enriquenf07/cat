import { CssBaseline, Grid, Paper, Button, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Router from './Router'
import Menu from './Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useGameLogic } from './GameLogic/useGameLogic'
import useStatsMenu from './pages/Home/Hooks/useStatsMenu'
import { numberformat } from 'swarm-numberformat'
import useGameStore from './store/useGameStore'

import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FEDBD0',
            light: '#f9efee',
            dark: '#ffc2ae'
        },
        secondary: {
            main: '#95dff3',
            light: '#d0f3fe',
            dark: '#4fc8e6'
        }
    },

});



function App() {
    const [index, setIndex] = useState(0)
    const [homeIndex, setHomeIndex] = useGameStore(state => [state.homeIndex, state.setHomeIndex])

    useGameLogic()

    const statsMenu = useStatsMenu(0)
    const isMobile = useMediaQuery('(max-width:700px)')


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

                <Grid container height={'100lvh'} sx={{ bgcolor: 'primary.dark' }}>
                    <Grid item container sx={{ flexDirection: isMobile ? 'column-reverse' : 'row' }} xs={12}>
                        <Grid item width={!isMobile ? '4rem' : '100vw'} height={isMobile ? '10vh' : '95lvh'}>
                            <Menu index={index} setIndex={setIndex} />
                        </Grid>
                        {!isMobile && <Grid item width={'16rem'}>
                            <Paper elevation={0} square={false}>
                                <Grid height={!isMobile && '100lvh'} sx={{ bgcolor: 'primary.main' }} style={{ padding: '1rem' }}>
                                    {statsMenu.buttons.map(b => (
                                        <>
                                            {b.initialCond && <Grid xs={12}>
                                                <Button sx={{ width: '100%', '&:hover': { bgcolor: 'grey.400' }, bgcolor: homeIndex == b.id && 'secondary.light' }}
                                                    onClick={() => setHomeIndex(b.id)}
                                                >
                                                    <Grid container width={'100%'} justifyContent={'space-between'}>
                                                        <Typography color={'text.primary'}>{b.title}</Typography>
                                                        <Typography color={'text.primary'}>{numberformat.formatShort(b.quantity ?? 0)}</Typography>
                                                    </Grid>
                                                </Button>
                                            </Grid>}
                                        </>
                                    )
                                    )}
                                </Grid>
                            </Paper>
                        </Grid>}
                        <Grid item style={{ width: !isMobile && 'calc(100% - 20rem)' }}>
                            <Paper elevation={0} square={false}>
                                <Router index={index} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default App
