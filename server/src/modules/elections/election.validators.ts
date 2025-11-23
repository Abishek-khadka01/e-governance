import Joi from "joi";

export const electionCreateSchema = Joi.object({
  election_name: Joi.string().required(),

  election_type: Joi.string()
    .valid(
      "federal",
      "provincial",
      "local",
      "by-election",
      "internal-party"
    )
    .required(),

  year: Joi.string()
    .pattern(/^\d{4}$/) // must be a 4-digit year
    .required(),

  startDate: Joi.date().required(),

  endDate: Joi.date()
    .greater(Joi.ref("startDate")) // endDate must be after startDate
    .required(),
});

export const electionUpdateSchema  = Joi.object({
     startDate: Joi.date().required(),

  endDate: Joi.date()
    .greater(Joi.ref("startDate")) // endDate must be after startDate
    .required(),
})
