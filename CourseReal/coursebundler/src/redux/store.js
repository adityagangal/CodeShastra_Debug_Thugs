import {configureStore} from "@reduxjs/toolkit";
import { profileReducer, subscriptionReducer, userReducer } from "./reducers/userReducer";
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from "./reducers/adminReducer";
import { otherReducer } from "./reducers/otherReducer";
import { BotOpen, llmInferenceSlice } from "./reducers/llmreducer";


const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        course:courseReducer,
        subscription:subscriptionReducer,
        admin: adminReducer,
        other: otherReducer,
        BotUI: BotOpen.reducer,
        llmInference: llmInferenceSlice.reducer,
    },
})

export default store;

