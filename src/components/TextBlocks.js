import  {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import {useDispatch, useSelector} from 'react-redux'
import {getTextBlocks,  removeTextBlock} from "../store/reducers/textBlocksReducer";
import firebase from './../services/firebase'
import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderTextBlocks } from "./Reorder";
import { AuthorList } from "./AuthorList";


const CreateText = ({changeEditorValue}) => {

    const [tBlocks, setTextBlocks] = useState({});
    const  textBlocks = useSelector(store => store.textBlocks)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getTextBlocks())
    }, [])

    let textBlocksData = textBlocks.hasOwnProperty('textBlocks') ? [...textBlocks.textBlocks] : []

    useEffect(()=> {
        if (textBlocksData.length) {
            let droppableLines = {}
            textBlocksData.forEach(tBlock => {
                if (tBlock.lineId in  droppableLines) {
                    droppableLines[tBlock.lineId][tBlock.index] = {...tBlock}
                } else {
                    droppableLines[tBlock.lineId] = []
                    droppableLines[tBlock.lineId][tBlock.index] = {...tBlock}
                }
            })
            setTextBlocks(droppableLines)
        }

    }, [textBlocks])


    useEffect(() => {
        updateTextBlocks()
    }, [tBlocks,textBlocksData ])



    const checkIsChangedItem = (tBlock, textBlocksData) => {
        let item = textBlocksData.find(itm => itm.id === tBlock.id)
        if (( tBlock && tBlock.hasOwnProperty('index') && item && item.hasOwnProperty('index') &&
            tBlock.index !== item.index) ||
            (  tBlock && tBlock.hasOwnProperty('lineId') && item && item.hasOwnProperty('lineId') &&

                tBlock.lineId !== item.lineId
        ) ) {
            return true
        }
        return false
    }


    const editTextBlock = (textBlock) => {
        changeEditorValue(textBlock)
    }

    const deleteTextBlock = (textBlock) => {
        firebase.deleteSingleDoc(textBlock.id, 'textBlocks', () => {
            let tBlocksCopy = {...tBlocks}
             let row = tBlocksCopy[textBlock.lineId]
             if (row.length) {
                 tBlocksCopy[textBlock.lineId] = row.filter(item => item.id !== textBlock.id)
                 if (tBlocksCopy[textBlock.lineId].length === 0) {
                     delete  tBlocksCopy[textBlock.lineId]
                 } else {
                     tBlocksCopy[textBlock.lineId].forEach((tBlock, index) => {
                         tBlock.index = index
                     })
                 }
             }
             setTextBlocks(tBlocksCopy)
             dispatch(removeTextBlock(textBlock.id))
        })

    }

   const updateTextBlocks = () => {
       let textBlocksCopy = {...tBlocks}
       for(let droppableId in textBlocksCopy) {
           if (textBlocksCopy[droppableId].length ) {
               textBlocksCopy[droppableId].forEach(tBlock => {
                   let isChanged = checkIsChangedItem(tBlock, textBlocksData)
                   if (true) {
                        let request =  firebase.setSingleDoc('textBlocks',tBlock)
                       request.then(e => {}).catch(e => {})
                   }
               })
           }
       }
    }

    return (
        <AppBar position="static">
            <DragDropContext
                onDragEnd={({ destination, source }) => {
                   let newTextBlocks = {...tBlocks}
                    if (!destination) {
                        let id = new Date().getTime()
                        newTextBlocks[id] = []
                        setTextBlocks(reorderTextBlocks({...newTextBlocks}, source, {
                         droppableId: id,
                         index: 0
                        }));
                       return;
                    }
                    setTextBlocks(reorderTextBlocks({...newTextBlocks}, source, destination));
                }}
            >
                <div style={{width: '100%'}}>
                    {Object.entries(tBlocks).map(([k, v]) => (
                        k &&(
                            <AuthorList
                                deleteTextBlock={deleteTextBlock}
                                editTextBlock={editTextBlock}
                                internalScroll
                                key={k}
                                listId={k}
                                listType="CARD"
                                tBlocks={v}
                            />
                        )
                    ))}
                </div>
            </DragDropContext>
        </AppBar>
    );
};
export default CreateText;
