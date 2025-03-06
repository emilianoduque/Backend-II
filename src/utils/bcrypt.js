import { hashSync, compareSync} from "bcrypt";

export const hashPassword = (password) => hashSync(password, 6);

export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD)