import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.inputValue)
  return (
    <span style={{paddingRight:'10px'}}>
      <Button variant="contained" sx={{ display: 'inline' }} onClick={() => setOpen(true)} style={{display: 'inline'}}>{props.title}</Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          props.onClose(value);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField value={value} onChange={e => setValue(e.target.value)} variant="standard"/>
        <Button onClick={() => {
          setOpen(false);
          props.onClose(value);
        }}>OK</Button>
        </Box>
      </Modal>
    </span>
  );
}