import { z, ZodType } from 'zod';

export const StatusSchema = <T extends ZodType>(data: T) =>
  z.discriminatedUnion('status', [
    z.object({ status: z.literal('success'), data }),
    z.object({ status: z.literal('failed'), error: z.instanceof(Error) }),
  ]);

type StatusType<T extends ZodType> = ReturnType<typeof StatusSchema<T>>;

export type Status<T> = z.infer<StatusType<ZodType<T>>>;
