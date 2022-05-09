import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { red } from '@mui/material/colors';




const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        // overflow: 'hidden',
        padding: theme.spacing(1),
        [theme.breakpoints.up('xs')]: {
            backgroundColor: red[200],
        },
        [theme.breakpoints.up('sm')]: {
            backgroundColor: red[700],
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: red[200],
        },
    },
    link:{margin:'10px 0 20px'},
    paper: { padding: 20, width: 400, margin: '15% auto' },
    input: {
        margin: '10px 0'
    }
}));

function DashboardPage() {
   const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <h1>4.0.4 NOT FOUND</h1>
        </Grid>
    );
}

export default DashboardPage;
