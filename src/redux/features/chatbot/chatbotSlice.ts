export type ChatbotView = 'main' | 'survey' | 'location' | 'faq' | 'explore' | 'chat';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChatbotState {
    isOpen: boolean;
    view: ChatbotView;
    selectedCity: any | null;
}

const initialState: ChatbotState = {
    isOpen: false,
    view: 'main',
    selectedCity: null,
};

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState,
    reducers: {
        openChatbot: (state) => {
            state.isOpen = true;
        },
        closeChatbot: (state) => {
            state.isOpen = false;
            // Optionally reset view on close, or keep state
            // state.view = 'main'; 
        },
        setChatbotView: (state, action: PayloadAction<ChatbotView>) => {
            state.view = action.payload;
        },
        setSelectedCity: (state, action: PayloadAction<any>) => {
            state.selectedCity = action.payload;
        },
        resetChatbot: (state) => {
            state.isOpen = false;
            state.view = 'main';
            state.selectedCity = null;
        }
    },
});

export const { openChatbot, closeChatbot, setChatbotView, setSelectedCity, resetChatbot } = chatbotSlice.actions;

export default chatbotSlice.reducer;
