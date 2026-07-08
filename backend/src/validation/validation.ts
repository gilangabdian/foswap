import Joi from "joi";
import { ResponseError } from "../error/response-error";

// Menggunakan Generic <T> agar hasil kembaliannya punya tipe data yang jelas
export const validate = <T>(schema: Joi.Schema, request: unknown): T => {
  const result = schema.validate(request, {
    abortEarly: false, // Opsional tapi penting: tampilkan semua error sekaligus, jangan berhenti di error pertama
    allowUnknown: false, // Opsional: tolak properti gaib yang tidak ada di schema
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value as T;
  }
};
