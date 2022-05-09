import React, {useState} from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";
import {blue} from "@mui/material/colors";
import parse from "html-react-parser";
import {convertNodesToHtml} from "./Editor/SerializeToHtml";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const TextBlockSettings = ({classes, deleteTextBlock, textBlock, editTextBlock}) => {
    const options = [
        {
            name: 'Edit',
            id:'edit'
        },
        {
            name: 'Delete',
            id: 'delete'
        }
    ];

    const ITEM_HEIGHT = 48;


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const executeAction = (key) => {
        if (key === 'delete') {
            deleteTextBlock(textBlock)
        } else if (key === 'edit') {
            editTextBlock(textBlock)
        }
        handleClose()
    }

    return <div  className={clsx(classes.draggableItemSettings)}>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
            }}
        >
            {options.length > 0 && options.map((option) => (
                <MenuItem key={option.id}  onClick={e => executeAction(option.id)}>
                    {option.name}
                </MenuItem>
            ))}
        </Menu>
    </div>

}




const useStyles = makeStyles((theme) => ({
    draggableItem: {
       flex:1,
       width: 'calc((100% - 206px) * 0.117857)',
       background:'purple !important'
    },
    draggableItemContent: {
       position: 'relative !important',
    },
    draggableItemSettings: {
        left: '10px',
        position: 'absolute'
    },
    textBlock: {
        margin:theme.spacing(1),
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
    }
}));


export const AuthorList = ({ listId, listType, tBlocks, deleteTextBlock, editTextBlock }) => {
    const classes = useStyles();

    return (
        <Droppable
            droppableId={listId}
            type={listType}
            direction="horizontal"
            isCombineEnabled={false}
        >
            {dropProvided => (
                <div {...dropProvided.droppableProps} style={{width: '100%'}}>
                      <div style={{ display: "flex", }} ref={dropProvided.innerRef}>
                            {tBlocks.map((textBlock, index) => {
                                if (textBlock) {
                                     return (<Draggable key={textBlock.id} draggableId={textBlock.id} index={index} >
                                {dragProvided => (
                                    <div
                                        className={clsx(classes.draggableItem)}
                                        {...dragProvided.dragHandleProps}
                                        {...dragProvided.draggableProps}
                                        ref={dragProvided.innerRef}
                                    >
                                        <div  className={clsx(classes.draggableItemContent)}>
                                            <TextBlockSettings classes={classes} textBlock={textBlock} deleteTextBlock={deleteTextBlock} editTextBlock={editTextBlock}/>
                                            {textBlock?.textBlockData && textBlock.textBlockData.length > 0 && (
                                                <div className={clsx(classes.textBlock)}>
                                                    { parse(convertNodesToHtml(textBlock.textBlockData ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                </Draggable>)
                                 }}
                             )}
                           {dropProvided.placeholder}
                      </div>
                </div>
            )}
        </Droppable>
    );
};