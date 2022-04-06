
// **REQUIRES MUI**
import { useValue } from "hooks/useValue";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import "./Searchbar.css"

const SearchBox = styled('div')(({ theme }) => ({
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.35)
    },
    marginLeft: 0,
    width: '500px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        cursor: 'pointer'
    }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%', 
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0)
    }
}));

const Searchbar = (props) => {
    const [inputValue, handleInputChange, clear] = useValue();

    return (
        <SearchBox>
            <SearchIconWrapper onClick={() => {console.log("clicked")}}>
            <i className="fa-solid fa-magnifying-glass"></i>
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            />
        </SearchBox>
    );   
}

export default Searchbar;
