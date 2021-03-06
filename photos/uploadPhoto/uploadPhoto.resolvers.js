import { protectedResolver } from '../../users/users.utils';
import client from '../../client';
import { processHashtags } from '../photos.utils';
import { uploadToS3 } from '../../shared/shared.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = null;
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = processHashtags(caption);
          /// 해시태그가있으면
          //생성 get or create
        }
        const fileUrl = await uploadToS3(file, loggedInUser.id, 'uploads');
        return client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        //save the photo with the parsere
        //add the photo the hashtags
      }
    ),
  },
};
