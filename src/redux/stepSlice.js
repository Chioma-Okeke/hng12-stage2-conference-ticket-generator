import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stepCounter: 1,
    currentSection: "Ticket Selection",
};

const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        setStepCounter: (state, action) => {
            state.stepCounter = action.payload;
        },
        setCurrentSection: (state, action) => {
            state.currentSection = action.payload;
        },
        resetStep: (state) => {
            state.stepCounter = 1;
            state.currentSection = "Ticket Selection";
        },
    },
});

export const { setStepCounter, setCurrentSection, resetStep } = stepSlice.actions;
export default stepSlice.reducer;
