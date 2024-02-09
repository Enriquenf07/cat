import { Box, Button, Typography } from "@mui/material";
import Title from "../components/Title";
import Buttons from "../components/Buttons";
import Upgrades from "../components/Upgrades";
import useGameStore from "../../../store/useGameStore";
import { numberformat } from "swarm-numberformat";

import BuyButton from "../../../components/BuyButton";


export default function Rats() {
    const rats = useGameStore(state => state.rats)

    return (
        <>
            <Title>Rats</Title>
            <Typography variant="body2">You decide to hunt rats</Typography>
            <Typography variant="body2">you have {numberformat.format(rats.number)} rats</Typography>
            {   rats.upgrades.some(u => !u.isBought) &&
                <Upgrades>
                    {rats.upgrades.map(u => {
                        if (!u.isBought) {
                            return (
                                <Box sx={{ marginBottom: '0.6rem' }} key={u.index}>
                                    <Typography variant="body2">{u.title}</Typography>
                                    <Typography variant="body2">{u.description}</Typography>
                                    <Typography variant="body2">You need {numberformat.format(u.price)} rats</Typography>
                                    <BuyButton onClick={() => rats.buyUpgrade(u.index)}/>
                                </Box>
                            )
                        }

                    })}
                </Upgrades>
            }

        </>
    )
}