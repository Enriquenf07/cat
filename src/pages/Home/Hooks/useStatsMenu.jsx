import { useState } from "react"
import Rats from "../pages/Rats"

export default function useStatsMenu() {
    const [index, setIndex] = useState(0)

    const statsButtons = [
        {
            id: 0,
            title: 'Rats',
            initialCond: true,
            content: <Rats/>
        },
        {
            id: 1,
            title: 'oi',
            initialCond: true,
            content: <>2</>
        },
        {
            id: 2,
            title: 'oi',
            initialCond: true,
            content: <>3</>
        },
        {
            id: 3,
            title: 'oi',
            initialCond: true,
            content: <>4</>
        },
    ]
    
    return {
        buttons: statsButtons,
        setIndex: setIndex,
        display: () => statsButtons[index].content
    }
}