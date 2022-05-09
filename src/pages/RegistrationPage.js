import { makeStyles } from '@mui/styles';
import {Grid, Button, Paper, Link} from '@mui/material';
import { blue } from '@mui/material/colors';
import clsx from 'clsx';
import {useDispatch} from 'react-redux'
import {signUpFields} from "../Fields/Fields";
import CheckedFields  from '../components/CheckedFields'
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import { useAuthState} from 'react-firebase-hooks/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "./../services/firebase"
import {auth} from "../services/firebaseConfig";
import {useEffect} from "react";
import {setUser} from "../store/reducers/userReducer";

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
    link:{margin:'10px 0 20px'},
    paper: { padding: 20, width: 400, margin: '50px auto', overflowY:'auto', height: 600 },
    input: {
        margin: '10px 0'
    }
}));

function RegistrationPage() {
   const classes = useStyles();
   const dispatch = useDispatch()
   const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
   const emailRegexp  ='(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
   let schema = yup.object().shape({
        firstName: yup.string().required(),
        password: yup.string().required(),
        passwordAgain: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match'),
        email: yup.string().required().matches(emailRegexp, "Invalid Email"),
        lastName: yup.string().required(),
    })


    const { register, handleSubmit,  formState: { errors } } = useForm({
        resolver: yupResolver(schema)});
    const onSubmit = data => {
    const {email, password} = data
        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password).then(r =>{
                firebase.addUser({email:r.user.email, uid:r.user.uid,type:"user", ...data},r => {
                    setTimeout(() => {
                        navigate("/")
                    }, 200)
                })
                signInWithEmailAndPassword(auth, email, password).then(data =>{
                    dispatch(setUser({email:r.user.email, uid:r.user.uid }))
                    navigate('/')
                })
                .catch(error => {})
            })
            .catch(e => {
              console.log("err reg = ",e.message)
            })
    };

    useEffect(() => {
        if (!loading && user) {
            navigate('/')
        }
    }, [user, loading])


    return (
        <>
            {loading === false && !user ? (
                <Grid className={classes.root}>
                    <Paper elevation={15} className={clsx(classes.paper) }>
                        <h3>Registration Page</h3>
                        <div className="form_container">
                            <form className="signup" onSubmit={handleSubmit(onSubmit)}>
                                <CheckedFields fields={signUpFields} schemaData={schema} register={register} errors={errors}/>
                                <div className={clsx(classes.link) }>
                                    <Link
                                        onClick={e =>  {console.log('click+');e.stopPropagation(); e.preventDefault(); navigate('/')}}
                                        component="button"
                                        variant="body2"
                                    >
                                        Do you have account ? Login here
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
            ): ''}
        </>

    );
}

export default RegistrationPage;
