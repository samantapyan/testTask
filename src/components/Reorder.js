import { DraggableLocation } from "react-beautiful-dnd";


export const reorder = ( list,  startIndex, endIndex) => {
    const result = Array.from(list);
    const [ removed ] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderTextBlocks = (
    textBlocks,
    source,
    destination
) => {

    const current = [...textBlocks[source.droppableId]];
    const next = [...textBlocks[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        reordered.forEach((t, index) => {
            t.index = index
            t.lineId = destination.droppableId
        })
        return {
            ...textBlocks,
            [source.droppableId]: reordered
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);
    // target.index = destination.index

    current.forEach((t, index) => {
        if (t) {
            t.index = index
            t.lineId = source.droppableId
        }
    })
    next.forEach((t, index) => {
        if (t) {
            t.index = index
            t.lineId = destination.droppableId
        }
    })

    return {
        ...textBlocks,
        [source.droppableId]: current,
        [destination.droppableId]: next
    };
};