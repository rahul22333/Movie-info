import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FetchData } from './Fetchdata';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [search, setSearch] = useState()
    const [searchList, setSearchList] = useState([])
    const navigate = useNavigate()
    const searchListApi = `https://api.themoviedb.org/3/search/movie?query=${search ? search : ""}&api_key=9d5b8e25ecd3e4f7d23376aee2eda565`
    useEffect(() => {
        FetchData(searchListApi).then((data) => {
            setSearchList(data)
        }).catch((err) => {
            alert(err)
        })
    }, [search])
    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
    }
    const handleSearchlist = () => {
        setSearch("")
        navigate('/searchlist', { state: { searchList } })
    }
   return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar >
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, }}
                    >
                        MOVIES App
                    </Typography>
                          <Search >
                            <SearchIconWrapper >
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="…"
                                inputProps={{ 'aria-label': 'search'  , value:search}}
                                onChange={handleSearch}
                            />
                            <Button
                                onClick={handleSearchlist}
                                variant="text"
                                color='secondary'

                            >
                                search
                            </Button>
                        </Search> 
                </Toolbar>
            </AppBar>


        </ThemeProvider>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));







