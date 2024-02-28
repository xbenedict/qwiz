import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setQuizFormData as setReduxQuizFormData } from "../../Features/Quiz/quizFormSlice";
import { styled } from "@mui/system";
import { initializeSocket } from "../../socketIoClient/socketIoClient";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#3c4142",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ece8ef",
  padding: "20px",
  borderRadius: "20px",
});

export default function QuizForm() {
  const dispatch = useDispatch();
  const roomId = useSelector((state) => {
    return state.rooms.roomId;
  });
  const [quizFormData, setQuizFormData] = React.useState({
    numberOfQuestions: "",
    category: "",
    difficulty: "",
    type: "",
    encoding: "Default Encoding",
    roomId: roomId,
  });

  const handleChange = (event) => {
    setQuizFormData({
      ...quizFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const socket = initializeSocket();

    socket.emit("quizSubmitted", quizFormData);

    dispatch(setReduxQuizFormData(quizFormData));
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="question-count-label">
            Number of Questions:
          </InputLabel>
          <Select
            labelId="question-count-label"
            id="question-count-select"
            name="numberOfQuestions"
            value={quizFormData.numberOfQuestions}
            onChange={handleChange}
            label="Number of Questions:"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="category-label">Select Category:</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            name="category"
            value={quizFormData.category}
            onChange={handleChange}
            label="Select Category:"
          >
            <MenuItem value={"Any Category"}>Any Category</MenuItem>
            <MenuItem value={9}>General Knowledge</MenuItem>
            <MenuItem value={10}>Entertainment: Books</MenuItem>
            <MenuItem value={11}>Entertainment: Film</MenuItem>
            <MenuItem value={12}>Entertainment: Music</MenuItem>
            <MenuItem value={13}>Entertainment: Musicals & Theatres</MenuItem>
            <MenuItem value={14}>Entertainment: Television</MenuItem>
            <MenuItem value={15}>Entertainment: Video Games</MenuItem>
            <MenuItem value={16}>Entertainment: Board Games</MenuItem>
            <MenuItem value={17}>Science & Nature</MenuItem>
            <MenuItem value={18}>Science: Computers</MenuItem>
            <MenuItem value={19}>Science: Mathematics</MenuItem>
            <MenuItem value={20}>Mythology</MenuItem>
            <MenuItem value={21}>Sports</MenuItem>
            <MenuItem value={22}>Geography</MenuItem>
            <MenuItem value={23}>History</MenuItem>
            <MenuItem value={24}>Politics</MenuItem>
            <MenuItem value={25}>Art</MenuItem>
            <MenuItem value={26}>Celebrities</MenuItem>
            <MenuItem value={27}>Animals</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="difficulty-label">Select Difficulty:</InputLabel>
          <Select
            labelId="difficulty-label"
            id="difficulty-select"
            name="difficulty"
            value={quizFormData.difficulty}
            onChange={handleChange}
            label="Select Difficulty:"
          >
            <MenuItem value={"Any Difficulty"}>Any Difficulty</MenuItem>
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="type-label">Select Type:</InputLabel>
          <Select
            labelId="type-label"
            id="type-select"
            name="type"
            value={quizFormData.type}
            onChange={handleChange}
            label="Select Type:"
          >
            <MenuItem value={"Any Type"}>Any Type</MenuItem>
            <MenuItem value={"multiple"}>Multiple Choice</MenuItem>
            <MenuItem value={"boolean"}>True / False</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#006e90", color: "white" }}
        >
          Submit
        </Button>
      </StyledForm>
    </Container>
  );
}
