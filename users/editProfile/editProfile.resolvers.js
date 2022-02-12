import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { protectedResolver } from '../users.utils';
import { createWriteStream } from 'fs';

console.log(process.cwd());

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        //파일 읽을 코드
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + '/uploads/' + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }
        //유저가 준 토큰 ???
        console.log(avatar);

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return { ok: false, error: '씨발없다' };
        }
      }
    ),
  },
};
