import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setQuizFormData as setReduxQuizFormData } from "../../Features/Quiz/quizFormSlice";
import { styled } from "@mui/system";

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

  const [quizFormData, setQuizFormData] = React.useState({
    numberOfQuestions: "",
    category: "",
    difficulty: "",
    type: "",
    encoding: "Default Encoding",
  });

  const handleChange = (event) => {
    setQuizFormData({
      ...quizFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
            <MenuItem value={"General Knowledge"}>General Knowledge</MenuItem>
            <MenuItem value={"Entertainment: Books"}>
              Entertainment: Books
            </MenuItem>
            <MenuItem value={"Entertainment: Film"}>
              Entertainment: Film
            </MenuItem>
            <MenuItem value={"Entertainment: Music"}>
              Entertainment: Music
            </MenuItem>
            <MenuItem value={"Entertainment: Musicals & Theatres"}>
              Entertainment: Musicals & Theatres
            </MenuItem>
            <MenuItem value={"Entertainment: Television"}>
              Entertainment: Television
            </MenuItem>
            <MenuItem value={"Entertainment: Video Games"}>
              Entertainment: Video Games
            </MenuItem>
            <MenuItem value={"Entertainment: Board Games"}>
              Entertainment: Board Games
            </MenuItem>
            <MenuItem value={"Science & Nature"}>Science & Nature</MenuItem>
            <MenuItem value={"Science: Computers"}>Science: Computers</MenuItem>
            <MenuItem value={"Science: Mathematics"}>
              Science: Mathematics
            </MenuItem>
            <MenuItem value={"Mythology"}>Mythology</MenuItem>
            <MenuItem value={"Sports"}>Sports</MenuItem>
            <MenuItem value={"Geography"}>Geography</MenuItem>
            <MenuItem value={"History"}>History</MenuItem>
            <MenuItem value={"Politics"}>Politics</MenuItem>
            <MenuItem value={"Art"}>Art</MenuItem>
            <MenuItem value={"Celebrities"}>Celebrities</MenuItem>
            <MenuItem value={"Animals"}>Animals</MenuItem>
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
            <MenuItem value={"Easy"}>Easy</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Hard"}>Hard</MenuItem>
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
            <MenuItem value={"Multiple Choice"}>Multiple Choice</MenuItem>
            <MenuItem value={"True / False"}>True / False</MenuItem>
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
