import { Typography } from "@mui/material";

export default function Title({children}){
    return(
        <>
            <Typography variant="h5" >
                {children}
            </Typography>
        </>
    )
}