import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  contentService,
  serviceService,
  countryService,
  testimonialService,
} from '../services';

export const fetchContent = createAsyncThunk('site/fetchContent', async (_, { rejectWithValue }) => {
  try {
    const { data } = await contentService.get();
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load content');
  }
});

export const fetchServices = createAsyncThunk('site/fetchServices', async (_, { rejectWithValue }) => {
  try {
    const { data } = await serviceService.getAll({ public: true });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load services');
  }
});

export const fetchCountries = createAsyncThunk('site/fetchCountries', async (_, { rejectWithValue }) => {
  try {
    const { data } = await countryService.getAll({ public: true });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load countries');
  }
});

export const fetchTestimonials = createAsyncThunk(
  'site/fetchTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await testimonialService.getAll({ public: true });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load testimonials');
    }
  }
);

export const fetchPublicData = createAsyncThunk('site/fetchPublicData', async (_, { dispatch }) => {
  await Promise.all([
    dispatch(fetchContent()),
    dispatch(fetchServices()),
    dispatch(fetchCountries()),
    dispatch(fetchTestimonials()),
  ]);
});

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    content: null,
    services: [],
    countries: [],
    testimonials: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
      })
      .addCase(fetchPublicData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPublicData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default siteSlice.reducer;
