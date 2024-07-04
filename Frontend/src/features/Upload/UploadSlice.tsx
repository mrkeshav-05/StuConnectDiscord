import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface UploadState {
    file: File | null;
}

const initialState: UploadState = {
    file: null,
};

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload;
        },
        unsetFile: (state) => {
            state.file = null;
        }
    }
});

export const selectFile = (state: RootState) => state.upload.file;
export const { setFile, unsetFile } = uploadSlice.actions;
export default uploadSlice.reducer;
