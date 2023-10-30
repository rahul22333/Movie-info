import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, InputBase, Box, Divider, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FetchData } from './Fetchdata';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [search, setSearch] = useState()
    const [searchList, setSearchList] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setSearch("")
    };
    const navigate = useNavigate()
    const searchListApi = `https://api.themoviedb.org/3/search/movie?query=${search ? search : ""}&api_key=9d5b8e25ecd3e4f7d23376aee2eda565`
    useEffect(() => {
        FetchData(searchListApi).then((data) => {
            setSearchList(data)
            console.log(searchList)
        }).catch((err) => {
            alert(err)
        })
    }, [search])
    const handleSearch = (e) => {
        setTimeout(() => {
            setSearch(e.target.value)
        }, 1000)
    }
    const handleSearchlist = (id, type = 'movie') => {
        navigate(`/movieinfo/${id}`, { state: { type } })
        handleClose()
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
                    <Search onClick={handleOpen}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => { handleSearch(e) }}
                        />
                    </Search>

                    {searchList ?
                        searchList.map((item, index) => (

                            <Typography id="modal-modal-description" sx={{ mt: 2 }}
                                key={index}
                                onClick={() => { handleSearchlist(item.id) }}
                            >
                                {item.title}
                                <Divider />
                            </Typography>

                        )) : null}

                </Box>
            </Modal>


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

const style = {
    position: 'absolute',
    top: '10%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    overflow: 'hidden'
};
