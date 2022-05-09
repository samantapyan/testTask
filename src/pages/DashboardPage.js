import { makeStyles } from '@mui/styles';
import {useDispatch} from 'react-redux'
import { Grid } from '@mui/material';
import {  blue } from '@mui/material/colors';
import AppBar from '../components/AppBar'
import CreateText from '../components/CreateText'
import TextBlocks from '../components/TextBlocks'
import { useRef } from 'react'

import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        padding: theme.spacing(1),
        [theme.breakpoints.up('xs')]: {
            backgroundColor: blue[200],
        },
        [theme.breakpoints.up('sm')]: {
            backgroundColor: blue[700],
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: blue[200],
        },
    },
    editor: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: 'red'
    }
}));

function DashboardPage() {
   const classes = useStyles();
   const addTextSectionRef = useRef();

   function changeEditorValue(data) {
       addTextSectionRef.current.handleChange(data)
   }

    return (
        <Grid className={clsx(classes.root)}>
            <AppBar />
            <div className={clsx(classes.editor)}>
                <CreateText ref={addTextSectionRef} />
            </div>

            <TextBlocks changeEditorValue={changeEditorValue}/>
        </Grid>
    );
}

export default DashboardPage;
