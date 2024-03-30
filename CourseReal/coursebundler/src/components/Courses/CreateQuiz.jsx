import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import axios from 'axios';

const GenerateQuiz = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    createdBy: '',
    quiz: [],
  });

  const handleQuizChange = newQuizData => {
    setCourseData(prevData => ({ ...prevData, quiz: newQuizData }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/courses/create', courseData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            fullWidth
            value={courseData.title}
            onChange={e =>
              setCourseData(prevData => ({
                ...prevData,
                title: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={courseData.description}
            onChange={e =>
              setCourseData(prevData => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Category"
            fullWidth
            value={courseData.category}
            onChange={e =>
              setCourseData(prevData => ({
                ...prevData,
                category: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Created By"
            fullWidth
            value={courseData.createdBy}
            onChange={e =>
              setCourseData(prevData => ({
                ...prevData,
                createdBy: e.target.value,
              }))
            }
          />
        </Grid>
        {/* Render the question form component based on the number of questions */}

        {/* Replace the following code with your question form component */}
        <Grid item xs={12}>
          <TextField
            label="Number of Questions"
            type="number"
            fullWidth
            value={courseData.quiz.length}
            onChange={e => {
              const numQuestions = parseInt(e.target.value);
              const newQuizData = Array(numQuestions).fill('');
              handleQuizChange(newQuizData);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GenerateQuiz;