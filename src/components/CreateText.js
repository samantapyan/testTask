import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import SlateEditor from './Editor/Editor'
import {forwardRef, useImperativeHandle, useRef} from 'react';



const CreateText = forwardRef((props, ref) => {
    const editorRef = useRef();
    useImperativeHandle(ref, () => ({
        handleChange(data) {
            editorRef.current.changeValueOfEditor(data)
        }

    }));


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                 <SlateEditor ref={editorRef}/>
            </Container>
        </AppBar>
    );
})


export default CreateText;
