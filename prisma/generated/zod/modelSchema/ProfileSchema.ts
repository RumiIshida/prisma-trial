import { z } from 'zod';

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  id: z.number(),
  bio: z.string().nullable(),
  userId: z.number(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// PROFILE PARTIAL SCHEMA
/////////////////////////////////////////

export const ProfilePartialSchema = ProfileSchema.partial()

export type ProfilePartial = z.infer<typeof ProfilePartialSchema>

/////////////////////////////////////////
// PROFILE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ProfileOptionalDefaultsSchema = ProfileSchema.merge(z.object({
  id: z.number().optional(),
}))

export type ProfileOptionalDefaults = z.infer<typeof ProfileOptionalDefaultsSchema>

export default ProfileSchema;
