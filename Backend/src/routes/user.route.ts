import { Router } from "express";
import { handleInputErrors } from "../middleware";
import { body } from "express-validator";
import { getUsers, login, perfil, register } from "../handlers/user.handler";
import { verifyToken } from "../handlers/jwt.handler";

const routerAuth = Router();

routerAuth.post("/login",
  body("email").exists().withMessage("La propiedad email debe ser enviada"),
  body("email").notEmpty().withMessage("El email no puede ir vacio"),
  body("password").exists().withMessage("La propiedad password debe ser enviada"),
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  handleInputErrors,
  login
);

routerAuth.post("/register",
  body("email").exists().withMessage("La propiedad email debe ser enviada"),
  body("email").notEmpty().withMessage("El email no puede ir vacio"),
  body("password").exists().withMessage("La propiedad password debe ser enviada"),
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  body("firstname").exists().withMessage("La propiedad firstname debe ser enviada"),
  body("firstname").notEmpty().withMessage("El firstname no puede ir vacio"),
  body("lastname").exists().withMessage("La propiedad lastname debe ser enviada"),
  body("lastname").notEmpty().withMessage("El lastname no puede ir vacio"),
  body("alias").exists().withMessage("La propiedad alias debe ser enviada"),
  body("alias").notEmpty().withMessage("El alias no puede ir vacio"),
  body("dateofbirth").exists().withMessage("La propiedad dateofbirth debe ser enviada"),
  body("dateofbirth").notEmpty().withMessage("El dateofbirth no puede ir vacio"),
  handleInputErrors,
  register
);

routerAuth.get("/", verifyToken, perfil);

routerAuth.get("/users", verifyToken, getUsers);

export default routerAuth;