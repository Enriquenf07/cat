import { Typography, Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function BuyButton({onClick}) {
    return (
        <Button variant="contained" sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }} onClick={onClick}>
            <ShoppingCartIcon fontSize=""/>
            <Typography sx={{marginLeft: '0.3rem'}}>Buy</Typography>
        </Button>
    )
}