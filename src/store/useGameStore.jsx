import Decimal from 'break_infinity.js';
import { toast } from 'react-toastify';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const useGameStore = create(
    persist(
        (set, get) => ({
            homeIndex: 0,
            setHomeIndex: newState => set({ homeIndex: newState }),
            saveFile: '',
            rats: {
                number: new Decimal(0),
                upgrades: [
                    {
                        index: 0,
                        title: 'upgrade 1',
                        description: 'oi',
                        price: new Decimal(100),
                        isBought: false,
                    }
                ],
                buyUpgrade: upgrade => {
                    if (get().rats.number.greaterThanOrEqualTo(get().rats.upgrades[upgrade].price)) {
                        set({ rats: { ...get().rats, upgrades: get().rats.upgrades.map(u => u.index == upgrade ? { ...u, isBought: true } : u) } })
                    }
                }
            },


            lastUpdateTime: Date.now(),
            gameLoop: () => {
                const currentTime = Date.now();
                const upgradeMulti = get().rats.upgrades[0].isBought ? 2 : 1
                if (currentTime >= get().lastUpdateTime) {
                    const tick = (currentTime - get().lastUpdateTime) / 1000;
                    set({
                        rats: { ...get().rats, number: get().rats.number.plus(tick * upgradeMulti) },
                        lastUpdateTime: currentTime
                    });
                    get().save()
                }
            },

            save: () => {
                const obj = {
                    rats: {
                        number: get().rats.number.toString(),
                        upgrades: get().rats.upgrades.map(u => ({ ...u, price: u.price.toString() }))
                    }
                }
                const encodedSave = btoa(JSON.stringify(obj))
                set({ saveFile: encodedSave })
            },
            load: () => {
                if (get().saveFile == '') {
                    return
                }
                const saveFile = JSON.parse(atob(get().saveFile))
                set({ rats: { ...get().rats, number: new Decimal(saveFile.rats.number), upgrades: saveFile.rats.upgrades.map(u => ({ ...u, price: new Decimal(u.price) })) } })
            },
            resetGame: () => {
                set({
                    rats: {
                        number: new Decimal(0),
                        upgrades: [
                            {
                                index: 0,
                                title: 'upgrade  1',
                                description: 'oi',
                                price: new Decimal(100),
                                isBought: false,
                            }
                        ], 
                        buyUpgrade: upgrade => {
                            if (get().rats.number.greaterThanOrEqualTo(get().rats.upgrades[upgrade].price)) {
                                set({ rats: { ...get().rats, upgrades: get().rats.upgrades.map(u => u.index == upgrade ? { ...u, isBought: true } : u) } })
                            }
                        }
                    }
                });
            }

        }),
        {
            name: 'save',
            partialize: (state) => ({ saveFile: state.saveFile }),
        }
    ))

export default useGameStore