export type RegisterUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  email: string;
  name?: string;
  password?: string;
  bio?: string | null;
  avatar?: string | null;
};

// Kamu juga bisa membuat tipe untuk Response kembaliannya
export type UserResponse = {
  id: string;
  name: string;
  email: string;
  token?: string | null;
};
