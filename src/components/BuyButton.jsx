import { Typography, Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function BuyButton({onClick, customLabel='Buy', customIcon=<ShoppingCartIcon fontSize=""/>}) {
    return (
        <Button variant="contained" sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }} onClick={onClick}>
            {customIcon}
            <Typography sx={{marginLeft: '0.3rem'}}>{customLabel}</Typography>
        </Button>
    )
}