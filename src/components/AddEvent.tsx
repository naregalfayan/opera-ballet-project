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
import { useReducer, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { addNewEvent, getAllEvents } from "../lib/api";
import { reducer } from "../lib/reducer";
import { InitialState } from "../lib/initialState";
import { ActionTypes } from "../lib/types";

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
export interface Inputs {
  title: string;
  date: string;
  time: string;
  cover: string;
  type: string;
  composer: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Required"),
  date: yup.string().required("Required"),
  time: yup.string().required("Required"),
  cover: yup.string().required("Required"),
  type: yup.string().required("Required"),
  composer: yup.string().required("Required"),
});

export const AddEvent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, InitialState);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const handleAdd: SubmitHandler<Inputs> = async (data) => {
    await addNewEvent(data);
    const response = await getAllEvents(state.currentFilter);
    dispatch({ type: ActionTypes.setEvents, payload: response });
    setOpen(false);
    reset();
  };

  return (
    <Box my={2}>
      <Button onClick={() => setOpen(true)} variant="contained">
        add
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(handleAdd)}>
            <Box my={2}>
              <TextField
                variant="outlined"
                label="title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            </Box>
            <Box my={2}>
              <TextField
                variant="outlined"
                label="date"
                {...register("date")}
                error={!!errors.date}
                helperText={errors.date ? errors.date.message : ""}
              />
            </Box>
            <Box my={2}>
              <TextField
                variant="outlined"
                label="time"
                {...register("time")}
                error={!!errors.time}
                helperText={errors.time ? errors.time.message : ""}
              />
            </Box>
            <Box my={2}>
              <TextField
                variant="outlined"
                label="composer"
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
                label="cover"
                error={!!errors.cover}
                helperText={errors.cover ? errors.cover.message : ""}
              />
            </Box>
            <Button type="submit" variant="outlined">
              {" "}
              submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
