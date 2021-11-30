import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Nimish Bhandari",
    email: "nimish@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Test",
    email: "test@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
