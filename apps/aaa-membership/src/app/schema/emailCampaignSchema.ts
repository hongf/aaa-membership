import { commonSchema } from './commonSchema';
import { z } from 'zod';

export const emailCampaignSchema = z.object({
  id:  commonSchema.requiredField,
  campaignName: commonSchema.requiredField,
  comment: z.string().optional(),
  memberFilterDescription: z.string().optional(),
  subject: commonSchema.requiredField,
  contentTemplate: commonSchema.requiredField,

  totalEmailSent: z.number().optional(),
  createdBy: z.string().optional(),
  createdDatetime: z.date().optional(),
  lastUpdatedBy: z.string().optional(),
  lastUpdatedDatetime: z.date().optional(),
  sendBy: z.string().optional(),
  sendDatetime: z.string().optional(),
});

export type IEmailCampaign = z.infer<typeof emailCampaignSchema>;
