import { useEffect, useState } from "react";
import useGameStore from "../store/useGameStore";

export function useGameLogic() {
    const gameLoop = useGameStore(state => state.gameLoop);

    useEffect(() => {
        const timer = setInterval(() => {
            gameLoop()
        }, 200)
    
        return () => clearInterval(timer);
    }, [])
}