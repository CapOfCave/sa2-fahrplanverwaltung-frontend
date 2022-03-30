import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Box, Divider, List, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField } from '@mui/material';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Navigate, useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";
import AddBusLineStop from "./AddBusLineStop";
import DeleteBusLineStop from "./DeleteBusLineStop";


export default function BusLineModifyStops({ isStaff, setIsStaff }) {

  let { id } = useParams();
  var [editedLineStop, setEditedLineStop] = useState(null);
  const [showDeleteBusLineDialog, setDeleteBusLineDialog] = useState(false);
  const [showAddBusLineDialog, setShowAddBusLineDialog] = useState(false);
  const [name, setName] = useState(null);
  const [lineStops, setLineStops] = useState([])
  const { enqueueSnackbar } = useSnackbar();

  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => apiService().getBusLine(id).then((result) => {
    setLineStops(result.lineStops);
    setName(result.name)
  }), []);

  const [allBusStops, setAllBusStops] = useState([]);
  useEffect(() => apiService().apiGetAllBusStops().then(result => setAllBusStops(result)), []);

  function removeBusStopFromLine(busStopId) {
    apiService().apiDeleteLineStop(busStopId, id)
      .then(refresh)
      .catch(error => enqueueSnackbar(error.response.data, { variant: "error" }));
    closeDialog();
  }

  function refresh() {
    apiService().getBusLine(id).then(((result) => {
      setLineStops(result.lineStops);
      setName(result.name)
    }), []);
  }

  function displayAddDialog(index) {
    setTargetIndex(index);
    setShowAddBusLineDialog(true);
  }

  function displayDeleteDialog(lineStop) {
    setEditedLineStop(lineStop)
    setDeleteBusLineDialog(true)
  }

  function closeDialog() {
    setDeleteBusLineDialog(false)
    setShowAddBusLineDialog(false)
    setEditedLineStop(undefined)
  }



  // helper function for client-side prediction of reorder result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) return
    setLineStops(reorder(lineStops, result.source.index, result.destination.index))
    apiService().apiPatchLineStop(result.draggableId, id, undefined, result.destination.index)

  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
  });

  const updateSecondsToNextStop = (event, lineStopToEdit) => {
    const secondsToNextStop = event.target.value * 60
    const newLineStop = { ...lineStopToEdit, secondsToNextStop };
    setLineStops(lineStops => lineStops.map(lineStop => lineStop.id === lineStopToEdit.id ? newLineStop : lineStop));
    apiService().apiPatchLineStop(lineStopToEdit.id, id, secondsToNextStop, undefined)
  }


  if (!isStaff) {
    return (
      <Navigate to="/buslines" />
    );
  }

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>


      <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
        <Divider sx={{ width: '90%', marginLeft: "5%" }}>
          <h1>Bearbeitung der Linie: {name}</h1>
        </Divider>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
              <List ref={droppableProvided.innerRef}>
                {lineStops.map((lineStop, index) => (
                  <Draggable key={lineStop.id} draggableId={lineStop.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        sx={{
                          minHeight: '4rem',
                        }}

                      >
                        <ListItemIcon>
                          <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={lineStop.busStopName}
                        />
                        <ListItemSecondaryAction sx={{ display: droppableSnapshot.isDraggingOver ? "none" : undefined }}>
                          <TextField
                            value={lineStop.secondsToNextStop / 60 ?? null}
                            onChange={(event) => updateSecondsToNextStop(event, lineStop)}
                            label="Minuten zum nächsten Halt"
                            size="small"
                            sx={{ width: '15rem' }}
                            type="number"
                            variant="outlined"
                          />
                          <IconButton onClick={() => displayDeleteDialog(lineStop)}>
                            <DeleteIcon />
                          </IconButton>

                          <IconButton sx={{ position: 'relative', bottom: '2rem' }} onClick={() => displayAddDialog(index)}>
                            <AddCircleOutlineIcon />
                          </IconButton>

                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>

                ))}
                {droppableProvided.placeholder}
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: '16px',
                  boxSizing: 'border-box'
                }}>
                  <IconButton
                    onClick={() => displayAddDialog(lineStops.length)}
                    sx={{ position: 'relative', bottom: '1rem', display: droppableSnapshot.isDraggingOver ? "none" : undefined }}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </List>

            )}
          </Droppable>
        </DragDropContext>


      </Container>

      <DeleteBusLineStop
        open={showDeleteBusLineDialog}
        lineStop={editedLineStop}
        handleClose={closeDialog}
        confirmDeletion={() => removeBusStopFromLine(editedLineStop.id)}></DeleteBusLineStop>

      <AddBusLineStop
        open={showAddBusLineDialog}
        allBusStops={allBusStops}
        onSuccess={refresh}
        targetIndex={targetIndex}
        lineId={id}
        handleClose={closeDialog}></AddBusLineStop>
    </div>
  );
}