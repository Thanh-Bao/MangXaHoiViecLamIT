import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        // mode: 'dark',    
    },
    user: {
        card: {
            avatar: {
                width: 28,
                height: 28,
            }
        }
    },
    article: {
        contentWrapper: {
            bgColor: "rgba(0,0,0,.048)",
            padding: '16px',
        },
    },
    comment: {
        content: {
            fontSize: '0.85rem',
            padding: '4px 0',
            paddingLeft: '44px',
            paddingBottom: '20px'
        }
    },
    seeMore: {
        fontSize: 600,
    },
});

theme.typography.body2 = {
    fontSize: '.9375rem',
    color: '#000000'
};


theme.typography.caption = {
    color: '#000000'
};

theme.subheaderUserCard = {
    color: theme.typography.body2.color,
    fontSize: '.7rem',
}
theme.linkPost = {
    ...theme.subheaderUserCard,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    },
    cursor: 'pointer'
}


export default theme;