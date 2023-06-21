import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  visible,
  setVisible,
  onConfirm,
}: ConfirmDialogProps) {
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Dialog open={visible} onClose={handleClose}>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Excluir paciente
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voce não terá mais acesso ao paciente, deseja mesmo excluí-lo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleClose();
            onConfirm();
          }}
        >
          Sim, excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
