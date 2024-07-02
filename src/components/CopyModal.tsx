import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Dispatch } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { addNewEvent, getAllEvents } from "../lib/api";
import { ActionTypes, IEvent, FilterTypes, IAction } from "../lib/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  title: yup.string().required("Required"),
  date: yup.string().required("Required"),
  time: yup.string().required("Required"),
  cover: yup.string().required("Required"),
  type: yup.string().required("Required"),
  composer: yup.string().required("Required"),
});

interface CopyModalProps {
  open: boolean;
  handleClose: () => void;
  event: IEvent;
  dispatch: Dispatch<IAction>;
  currentFilter: FilterTypes;
}

export const CopyModal: React.FC<CopyModalProps> = ({
  open,
  handleClose,
  event,
  dispatch,
  currentFilter,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEvent>({
    resolver: yupResolver(validationSchema),
    defaultValues: event,
  });

  const handleCopy: SubmitHandler<IEvent> = async (data) => {
    await addNewEvent(data);
    const response = await getAllEvents(currentFilter);
    dispatch({ type: ActionTypes.setEvents, payload: response });
    handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(handleCopy)}>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Date"
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date ? errors.date.message : ""}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Time"
              {...register("time")}
              error={!!errors.time}
              helperText={errors.time ? errors.time.message : ""}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Composer"
              {...register("composer")}
              error={!!errors.composer}
              helperText={errors.composer ? errors.composer.message : ""}
            />
          </Box>
          <Box my={2}>
            <FormControl sx={{ width: 200 }} error={!!errors.type}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select labelId="type-label" label="Type" {...register("type")}>
                <MenuItem value="opera">Opera</MenuItem>
                <MenuItem value="ballet">Ballet</MenuItem>
              </Select>
              {errors.type && (
                <FormHelperText>{errors.type.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              {...register("cover")}
              label="Cover"
              error={!!errors.cover}
              helperText={errors.cover ? errors.cover.message : ""}
            />
          </Box>
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
