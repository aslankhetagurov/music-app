import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../../../supabaseClient';

const initialState = {
    chartList: null,
    prevChartList: null,
    chartListLoadingStatus: null,
};

export const fetchChartList = createAsyncThunk(
    'chart/fetchChartList',
    async (_, thunkAPI) => {
        try {
            let { data: chartList, error: chartListError } = await supabase
                .from('chart')
                .select('*, albums(*)')
                .order('day_listenings', { ascending: false });

            if (chartListError) {
                console.log(chartListError);
                return;
            }

            let { data: prevChartList, error: prevChartListError } =
                await supabase
                    .from('previous_day_chart')
                    .select('*, albums(*)')
                    .order('day_listenings', { ascending: false });

            if (prevChartListError) {
                console.log(prevChartListError);
                return;
            }

            return { chartList, prevChartList };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchChartList.pending, (state) => {
            state.chartListLoadingStatus = 'loading';
        });

        builder.addCase(fetchChartList.fulfilled, (state, action) => {
            if (action.payload.chartList && action.payload.prevChartList) {
                state.chartListLoadingStatus = 'idle';
                state.chartList = action.payload.chartList;
                state.prevChartList = action.payload.prevChartList;
            } else {
                state.chartListLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchChartList.rejected, (state) => {
            state.chartListLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

export const selectChartList = (state) => state.chart.chartList;
export const selectPrevChartList = (state) => state.chart.prevChartList;
export const selectChartListLoadingStatus = (state) =>
    state.chart.chartListLoadingStatus;

export default chartSlice.reducer;
