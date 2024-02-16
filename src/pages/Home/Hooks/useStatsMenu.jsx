import { useState } from "react"
import Rats from "../pages/Rats"
import useGameStore from "../../../store/useGameStore"
import Hunting from "../pages/Hunting"

export default function useStatsMenu(index) {
    const ratsValue = useGameStore(state => state.rats.number)
    const huntingValue = useGameStore(state => state.hunting.number)

    const statsButtons = [
        {
            id: 0,
            title: 'Rats',
            initialCond: true,
            content: <Rats/>,
            quantity: ratsValue
        },
        {
            id: 1,
            title: 'Hunting',
            initialCond: true,
            content: <Hunting/>,
            quantity: huntingValue
        },
        {
            id: 2,
            title: 'oi',
            initialCond: false,
            content: <>3</>
        },
        {
            id: 3,
            title: 'oi',
            initialCond: false,
            content: <>4</>
        },
    ]
    
    return {
        buttons: statsButtons,
        display: () => statsButtons[index].content
    }
}