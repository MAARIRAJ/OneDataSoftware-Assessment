import { createSlice } from "@reduxjs/toolkit";
import jobsData from "../data/jobs.json";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: jobsData,
    applications: [],
  },
  reducers: {
    markAsApplied: (state, action) => {
      const jobId = action.payload;
      const job = state.jobs.find((j) => j.id === jobId);
      if (job) job.applied = true;
    },
    addApplication: (state, action) => {
      const { jobId, formData } = action.payload;
      state.applications.push({
        jobId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        skills: formData.skills,
        aboutMe: formData.aboutMe, 
        aboutMeHTML: formData.aboutMeHTML,
      });
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { markAsApplied,addApplication, addJob, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;
