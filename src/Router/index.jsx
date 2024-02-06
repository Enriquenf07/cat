import Home from "../pages/Home";

const page = {
    0: <Home/>,
    1: <></>,
    2: <></>,
    3: <></>,
}

export default function Router({ index }) {
    return (
        <>
            {page[index]}
        </>
    )
}