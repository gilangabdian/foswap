import Joi from "joi";

// 1. Validasi untuk Register (Semua data wajib diisi)
const registerUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  name: Joi.string().max(100).required(),
  password: Joi.string().min(6).max(255).required(), // Min 6 karakter untuk standar keamanan
});

// 2. Validasi untuk Login (Hanya butuh email dan password)
const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(255).required(),
});

// 3. Validasi untuk Update Profile (Bisa satuan/PATCH atau keseluruhan/PUT)
const updateUserValidation = Joi.object({
  email: Joi.string().email().required(),
  // Semuanya dibuat optional() karena user mungkin hanya ingin update 'name' saja, atau 'bio' saja
  name: Joi.string().max(100).optional(),
  password: Joi.string().min(6).max(255).optional(),

  // allow(null, '') mengizinkan user mengosongkan bio mereka kembali jika sebelumnya ada isinya
  bio: Joi.string().max(255).optional().allow(null, ""),

  // uri() memastikan string yang dikirim adalah format URL/Link yang valid
  avatar: Joi.string().uri().max(255).optional().allow(null, ""),
});

const putUserValidation = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().max(100).required(),
  bio: Joi.string().max(255).optional().allow(null, ""),
});

export { registerUserValidation, loginUserValidation, updateUserValidation, putUserValidation };
