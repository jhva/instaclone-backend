import { protectedResolver } from '../users.utils';
import client from '../../client';

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({
        where: { username },
      });
      if (!ok) {
        return { ok: false, error: '사용자를 찾을수없습니다' };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
