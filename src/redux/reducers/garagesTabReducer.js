import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicle_tab: true,
  socialMedia_tab: true,
  post_tab: false,
  reply_tab: false,
  bookmark_tab: false,
  favorites_tab: false,
  blog_tab: false,
  social_media: false
};

const garagesTabReducer = createSlice({
  name: "garagesTabReducer",
  initialState,
  reducers: {
    vehicleTab: (state, action) => {
      state.vehicle_tab = true;
      state.socialMedia_tab = false;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media = false
    },


    social_mediaTab: (state, action) => {
      state.vehicle_tab = true;
      state.socialMedia_tab = false;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media=true
    },


    socialMediaTab: (state, action) => {
      state.vehicle_tab = true;
      state.socialMedia_tab = true;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media = false
    },
    postTab: (state, action) => {
      state.vehicle_tab = false;
      state.socialMedia_tab = false;
      state.post_tab = true;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media = false
    },
    replyTab: (state, action) => {
      state.vehicle_tab = false;
      state.socialMedia_tab = false;
      state.post_tab = false;
      state.reply_tab = true;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media = false
    },
    bookMarkTab: (state, action) => {
      state.vehicle_tab = false;
      state.socialMedia_tab = false;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = true;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media = false
    },
    favoritesTab: (state, action) => {
      state.vehicle_tab = false;
      state.socialMedia_tab = false;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = true;
      state.blog_tab = false;
      state.social_media = false
    },
    blogTab: (state, action) => {
      state.vehicle_tab = false;
      state.socialMedia_tab = false;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = true;
      state.social_media = false
    },
    reSetGarageTab: (state, action) => {
      state.vehicle_tab = true;
      state.socialMedia_tab = true;
      state.post_tab = false;
      state.reply_tab = false;
      state.bookmark_tab = false;
      state.favorites_tab = false;
      state.blog_tab = false;
      state.social_media = false
    },
  },
});

export const {
  vehicleTab,
  socialMediaTab,
  postTab,
  replyTab,
  bookMarkTab,
  favoritesTab,
  blogTab,
  reSetGarageTab,
} = garagesTabReducer.actions;

export default garagesTabReducer.reducer;
