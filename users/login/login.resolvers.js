import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { username, password },) => {
      //find user with
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      console.log(passwordOk);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Inccornet password',
        };
      }
      //check password with args.password
      //issue a token send it to the user
      const token = await jwt.sign(
        { id: user.id, potato: 'secreet' },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
      };
    },
  },
};
