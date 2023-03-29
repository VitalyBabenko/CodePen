import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',

  async ({ user, formData }, { rejectWithValue }) => {
    const gql = getGql();

    try {
      const response = await gql.request(
        `
        mutation uploadImage($image: ImageInput!) {
          ImageUpsert(image: $image) {
            _id
            text
            url
          }
        }
        
        `,
        {
          image: formData,
        }
      );

      console.log(response.ImageUpsert);

      const imageId = response.ImageUpsert._id;

      // if (imageId) {
      //   const response = await gql.request(
      //     `
      //       mutation setAvatar{
      //         UserUpsert(user:{_id: "${user.id}", avatar: {_id: "${imageId}"}}){
      //             _id, avatar{
      //                 _id
      //             }
      //         }
      //     }
      //     `
      //   );

      //   console.log(response.UserUpsert);
      // }
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong please try again.');
    }

    // try {
    //   const response = await gql.request(
    //     `
    //     mutation ChangeAvatar($user: UserInput!) {
    //       UserUpsert(user: $user) {
    //         _id
    //         login
    //         nick
    //         avatar {
    //           url
    //         }
    //       }
    //     }
    //     `,
    //     {
    //       user: {
    //         _id: user.id,
    //         avatar,
    //       },
    //     }
    //   );

    //   if (response.UserFindOne) {
    //     return response.UserFindOne;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return rejectWithValue('Something went wrong please try again.');
    // }
  }
);
