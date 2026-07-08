import Joi from "joi";

export const createProjectValidation = Joi.object({
  title: Joi.string().max(100).optional(),
});

export const updateProjectSettingsValidation = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string().max(100).optional(),
  templateId: Joi.number().positive().optional(),
  transitionDuration: Joi.number().min(1).max(10).optional(),
  backgroundType: Joi.string().valid("SOLID_COLOR", "BLUR_IMAGE").optional(),
  backgroundColor: Joi.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().messages({
    "string.pattern.base": "backgroundColor must be a valid hex color code (e.g., #000000)",
  }),
});
