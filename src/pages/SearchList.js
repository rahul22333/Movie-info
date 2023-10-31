import React from 'react'
import { useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AllCards from '../component/Card/AllCards';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const SearchList = () => {
    const location = useLocation();
    const searchList = location.state.searchList
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>
                <Container sx={{ py: 5 }} maxWidth="md">
                    <Grid container spacing={3} >
                        {searchList.length ?
                            searchList.map((item, index) => (
                                <AllCards
                                    key={index}
                                    id={item.id}
                                    type="movie"
                                    image={item.poster_path}
                                    title={item.title}
                                    rate={item.vote_average
                                    }
                                    lang={item.original_language} />
                            )) : " result not found "}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    )
}

export default SearchList


