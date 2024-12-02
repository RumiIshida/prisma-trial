import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id','title','createdAt','content','published','postUserId']);

export default PostScalarFieldEnumSchema;
