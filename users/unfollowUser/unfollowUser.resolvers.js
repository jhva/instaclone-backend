import { protectedResolver } from '../users.utils';
import client from '../../client';

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.findUnique({
          where: { username },
        });
        if (!ok) {
          return {
            ok: false,
            error: '사용자를 언팔로우하지못했습니다',
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
          error: '사용자를 언팔로우 하였습니다',
        };
      }
    ),
  },
};
