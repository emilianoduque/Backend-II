import "dotenv/config";
import { hashSync, compareSync} from "bcrypt";

export const hashPassword = (password) => hashSync(password, parseInt(process.env.SALT));

export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD)