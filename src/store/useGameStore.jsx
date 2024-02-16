import Decimal from 'break_infinity.js';
import { toast } from 'react-toastify';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const ratsModel = {
    number: new Decimal(0),
    upgrades: [
        {
            index: 0,
            title: 'upgrade 1',
            description: 'oi',
            price: new Decimal('100000'),
            isBought: false,
        },
    ],
}

const huntingModel = {
    number: new Decimal(1),
    upgrades: [

    ],
    price: new Decimal(10)
}

const useGameStore = create(
    persist(
        (set, get) => ({
            homeIndex: 0,
            setHomeIndex: newState => set({ homeIndex: newState }),
            saveFile: '',
            rats: {
                ...ratsModel,
                buyUpgrade: upgrade => {
                    if (get().rats.number.greaterThanOrEqualTo(get().rats.upgrades[upgrade].price)) {
                        set({ rats: { ...get().rats, upgrades: get().rats.upgrades.map(u => u.index == upgrade ? { ...u, isBought: true } : u) } })
                    }
                }
            },
            hunting: {
                ...huntingModel,
                buyUpgrade: upgrade => {
                    const price = get().rats.upgrades[upgrade].price
                    if (get().rats.number.greaterThanOrEqualTo(price)) {
                        set({ rats: { ...get().rats, number: get().rats.number.minus(price), upgrades: get().rats.upgrades.map(u => u.index == upgrade ? { ...u, isBought: true } : u) } })
                    }
                },
                buyHunting: () => {
                    const price = get().hunting.price
                    if (get().rats.number.greaterThanOrEqualTo(price)) {
                        set({ hunting: { ...get().hunting, price: new Decimal(price).pow(1.07), number: get().hunting.number.plus(1) } })
                        set({ rats: { ...get().rats, number: get().rats.number.minus(price) } })
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
                        rats: { ...get().rats, number: get().rats.number.plus(new Decimal(tick).times(new Decimal(get().hunting.number).times(0.1).plus(1))) },
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
                    },
                    hunting: {
                        number: get().hunting.number.toString(),
                        price: get().hunting.price.toString(),
                        upgrades: get().hunting.upgrades.map(u => ({ ...u, price: u.price.toString() }))
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
                set({
                    rats: {
                        ...get().rats, number: new Decimal(saveFile.rats.number),
                        upgrades: get().rats.upgrades.map(u => ({ ...u, isBought: saveFile.rats.upgrades[u.index]?.isBought }))
                    },
                    hunting: {
                        ...get().hunting, number: new Decimal(saveFile.hunting.number), price: new Decimal(saveFile.hunting.price),
                        upgrades: get().hunting.upgrades.map(u => ({ ...u, isBought: saveFile.hunting.upgrades[u.index]?.isBought }))
                    }
                })

            },
            importSave: (encodedSave) => {
                const saveFile = JSON.parse(atob(encodedSave))
                set({ rats: { ...get().rats, number: new Decimal(saveFile.rats.number), upgrades: saveFile.rats.upgrades.map(u => ({ ...u, price: new Decimal(u.price) })) } })
            },
            resetGame: () => {
                set({
                    rats: {
                        ...ratsModel,
                        buyUpgrade: upgrade => {
                            if (get().rats.number.greaterThanOrEqualTo(get().rats.upgrades[upgrade].price)) {
                                set({ rats: { ...get().rats, upgrades: get().rats.upgrades.map(u => u.index == upgrade ? { ...u, isBought: true } : u) } })
                            }
                        }
                    },
                    hunting: {
                        ...huntingModel,
                        buyUpgrade: upgrade => {
                            if (get().rats.number.greaterThanOrEqualTo(get().rats.upgrades[upgrade].price)) {
                                set({ rats: { ...get().rats, upgrades: get().rats.upgrades.map(u => u.index == upgrade ? { ...u, isBought: true } : u) } })
                            }
                        },
                        buyHunting: () => {
                            const price = get().hunting.price
                            if (get().rats.number.greaterThanOrEqualTo(price)) {
                                set({ hunting: { ...get().hunting, price: new Decimal(price).pow(1.07), number: get().hunting.number.plus(1) } })
                                set({ rats: { ...get().rats, number: get().rats.number.minus(price) } })
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