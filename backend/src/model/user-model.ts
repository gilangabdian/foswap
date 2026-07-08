// File: src/model/user-model.ts

export type RegisterUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

// Kamu juga bisa membuat tipe untuk Response kembaliannya
export type UserResponse = {
  id: string;
  name: string;
  email: string;
};
