import client from '../client';

export default {
  Photo: {
    user: ({ userId }) => {
      console.log(userId);
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
 