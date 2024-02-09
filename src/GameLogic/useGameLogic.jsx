import { useEffect, useState } from "react";
import useGameStore from "../store/useGameStore";

export function useGameLogic() {
    const gameLoop = useGameStore(state => state.gameLoop);
    const load = useGameStore(state => state.load)

    
    useEffect(() => {
        load()
        const timer = setInterval(() => {
            gameLoop()
        }, 200)
    
        return () => clearInterval(timer);
    }, [])
}