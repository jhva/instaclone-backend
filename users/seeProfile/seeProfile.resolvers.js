import client from '../../client';

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: { username },
        include: {
          following: true,
          followers: true,
        },
      }),
    //include 사용자가 원하는  사용자관계를 갖게해주는것 to
  },
};
