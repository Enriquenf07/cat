import { Box, Button, Divider, Typography } from "@mui/material";
import Title from "../components/Title";
import Upgrades from "../components/Upgrades";
import useGameStore from "../../../store/useGameStore";
import { numberformat } from "swarm-numberformat";

import BuyButton from "../../../components/BuyButton";
import AddIcon from '@mui/icons-material/Add';


export default function Hunting() {
    const hunting = useGameStore(state => state.hunting)

    return (
        <>
            <Title>Hunting</Title>
            <Typography variant="body2">This is your hunting level, you started to became good at this...</Typography>
            <Typography variant="body2">Hunting level: {numberformat.format(hunting.number)}</Typography>
            <Typography variant="body2">Next level at: {numberformat.format(hunting.price)} Rats</Typography>
            <BuyButton onClick={() => hunting.buyHunting()} customLabel={'Next level'} customIcon={<AddIcon fontSize=""/>}/>
            {   hunting.upgrades.some(u => !u.isBought) &&
                <Upgrades>
                    {hunting.upgrades.map(u => {
                        if (!u.isBought) {
                            return (
                                <Box sx={{ marginBottom: '0.6rem' }} key={u.index}>
                                    <Typography variant="body2">{u.title}</Typography>
                                    <Typography variant="body2">{u.description}</Typography>
                                    <Typography variant="body2">You need {numberformat.format(u.price)} rats</Typography>
                                    <BuyButton onClick={() => hunting.buyUpgrade(u.index)}/>
                                </Box>
                            )
                        }

                    })}
                </Upgrades>
            }
        </>
    )
}