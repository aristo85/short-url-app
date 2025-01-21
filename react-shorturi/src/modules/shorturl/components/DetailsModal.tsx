import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useGetShorturlInfoQuery } from "../shorturlApi";

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  shortUrl: string;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsModal: React.FC<DetailsModalProps> = ({
  open,
  onClose,
  shortUrl,
}) => {
  const { data, isLoading } = useGetShorturlInfoQuery(shortUrl, {
    skip: !shortUrl,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          URL Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Original URL:</strong> {data?.originalUrl}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Created At:</strong> {data?.createdAt.toString()}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Click Count:</strong> {data?.clickCount}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DetailsModal;
