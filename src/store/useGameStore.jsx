import Decimal from 'break_infinity.js';
import { toast } from 'react-toastify';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const useGameStore = create(
    persist(
        (set, get) => ({
            rats: {
                number: new Decimal(0),
                upgrades: [
                    {
                        index: 0,
                        title: 'upgrade 1',
                        description: 'oi',
                        price: new Decimal(10),
                        isBought: false,
                    }
                ],
                buyUpgrade: upgrade => {
                    if (get().rats.number.greaterThanOrEqualTo(get().rats.upgrades[upgrade].price)) {
                        set({ rats: { ...get().rats, upgrades: get().rats.upgrades.map(u => u.index == upgrade ? {...u, isBought: true} : u) } })
                    }
                }
            },


            lastUpdateTime: Date.now(),
            gameLoop: () => {
                const currentTime = Date.now();
                if (currentTime >= get().lastUpdateTime) {
                    const tick = (currentTime - get().lastUpdateTime) / 1000;
                    set({
                        rats: {...get().rats, number: get().rats.number.plus(tick)},
                        lastUpdateTime: currentTime
                    });
                }
            },
            haha: 0

        }),
        {
            name: 'save',
            partialize: (state) => ({ haha: state.haha }),
        }
    ))

export default useGameStore