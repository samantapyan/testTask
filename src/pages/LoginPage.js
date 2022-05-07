import { makeStyles } from '@mui/styles';
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {Grid, Button, Paper, Link} from '@mui/material';
import { red, green, blue } from '@mui/material/colors';
import clsx from 'clsx';
import {loginFields} from "../Fields/Fields";
import CheckedFields  from './../components/CheckedFields'
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../services/firebaseConfig";
import {getUser} from "../store/reducers/userReducer";
import { getAuth } from "firebase/auth";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
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
    link:{margin:'10px 0 20px'},
    paper: { padding: 20, width: 400, margin: '15% auto' },
    input: {
        margin: '10px 0'
    }
}));

function App() {
   const classes = useStyles();
   const navigate = useNavigate()

   const emailRegexp  ='(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
   let schema = yup.object().shape({
        password: yup.string().required(),
        email: yup.string().required().matches(emailRegexp, "Invalid Email")
    })

    const { register,resetField, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)});


    const authN = getAuth();
    const user = authN.currentUser;
    console.log("auth user+++",user);


    const onSubmit = (formData) => {
        const {email, password} = formData
        console.log("login", email, password)
        signInWithEmailAndPassword(auth, email, password).then(r =>{
            console.log("Success LOGIN", r)
            // dispatch(setUser({email:r.user.email, uid:r.user.uid }))
            // navigate('/')

        })
        .catch(e => {
           // setPasswordMatching({message:e.message,isError:true})
        })
    };

const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getUser({collectionName: 'users', id: 'D10Hizuy4SPYjBwGPdoZjRMBG5J2'}))
    }, [])

    const paperStyle = { padding: 20, width: 400, margin: '15% auto' }

    return (
        <Grid className={classes.root}>
            <Paper elevation={15} className={clsx(classes.paper) }>
              <h3>Login Page</h3>
                <div className="form_container">
                    <form className="signup" onSubmit={handleSubmit(onSubmit)}>
                        <CheckedFields fields={loginFields} schemaData={schema} register={register} errors={errors}/>
                        <div className={clsx(classes.link) }>
                            <Link
                                onClick={e =>  {console.log('click+');e.stopPropagation(); e.preventDefault(); navigate('/registration')}}
                                component="button"
                                variant="body2"
                            >
                                Don't have account yet ? Just Register
                            </Link>
                        </div>

                        <Button variant="contained" color="secondary" type={'submit'}>
                            Submit
                        </Button>
                    </form>
                </div>
                <div>
                </div>
            </Paper>
        </Grid>
    );
}

export default App;
