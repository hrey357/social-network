import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import { extractInfoToken } from "./jwt.handler";

export const login = async (req: Request, res: Response) => {
  /* 
    #swagger.description = 'Login resource to social network'
    #swagger.summary = 'Login resource'
    #swagger.tags = ['Signin']
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/RequestBodyLogin" }
    } 
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkLogin",
              }
          }           
      }
    } 
    #swagger.responses[400] = {
      description: "BadRequest Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/BadRequest"
              }
          }           
      }
    } 
    #swagger.responses[404] = {
      description: "Not Found Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/NotFound"
              }
          }           
      }
    }
  */
  let body = req.body;

  User.findOne({
    where: {
      email: body.email,
    },
  })
    .then((usuarioDB) => {
      if (!usuarioDB) {
        return res.status(404).json({
          error: `Usuario ${body.email} no encontrado`,
        });
      }

      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
        return res.status(400).json({
          error: "Contraseña incorrecta",
        });
      }

      const { id, firstname, lastname, email, role } = usuarioDB;

      // Genera el token de autenticación
      let token = jwt.sign(
        { id, firstname, lastname, email, role },
        "este-es-el-seed-desarrollo",
        { expiresIn: "1h" }
      );

      res
      .header('Access-Control-Expose-Headers', 'Authorization')
      .header('Authorization', token)
      .json({
        data: {
           id, firstname, lastname, email, role 
        }
      });
    })
    .catch((error) => {
      console.log({ error });
      res.status(500).json({
        error: { message: { ...error } },
      });
    });
};

export const register = async (req: Request, res: Response) => {
  /* 
    #swagger.description = 'Register user to social network'
    #swagger.summary = 'Register user'
    #swagger.tags = ['Register']
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/RequestBodyRegister" }
    } 
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkRegister",
              }
          }           
      }
    } 
    #swagger.responses[400] = {
      description: "BadRequest Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/BadRequest"
              }
          }           
      }
    } 
  */
  let body = req.body;

  let { firstname, lastname, email, password, alias, dateofbirth } = body;
  let usuario = new User({
    firstname,
    lastname,
    email,
    alias,
    dateofbirth,
    password: bcrypt.hashSync(password, 10),
    role: "User",
  });

  usuario
    .save()
    .then((usuarioDB) => {
      const { id, firstname, lastname, email, password, alias, dateofbirth } =
        usuarioDB;
      return res.json({
        usuario: {
          id,
          firstname,
          lastname,
          email,
        },
      });
    })
    .catch((err) => {
      const { errors } = err;
      const { message, type, path, value, origin } = errors[0];
      return res.status(400).json({
        errors: [{ message, type, path, value, origin }],
      });
    });
};

export const perfil = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to get user perfil'
    #swagger.summary = 'User perfil'
    #swagger.tags = ['User']'
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkPerfil",
              }
          }           
      }
    } 
    #swagger.responses[401] = {
      description: "Unauthorized Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/Unauthorized"
              }
          }           
      }
    } 
    #swagger.responses[404] = {
      description: "Not Found Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/NotFound"
              }
          }           
      }
    }
  */

    const payload = extractInfoToken(req);
    // console.log(payload['id']);
    const usuarioDB = await User.findByPk(payload["id"]);

    if (!usuarioDB) {
      return res.status(404).json({
        error: `Usuario con id ${payload["id"]} no encontrado`,
      });
    }

    const { id, firstname, lastname, email, alias, dateofbirth, role } =
      usuarioDB;

    return res.json({
      user: { id, firstname, lastname, email, alias, dateofbirth, role },
    });

};

export const getUsers = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to get user list register to social network.'
    #swagger.summary = 'User list'
    #swagger.tags = ['User']
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkGetUsers",
              }
          }           
      }
    } 
    #swagger.responses[401] = {
      description: "Unauthorized Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/Unauthorized"
              }
          }           
      }
    } 
    #swagger.responses[404] = {
      description: "Not Found Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/NotFound"
              }
          }           
      }
    }
  */

  const payload = extractInfoToken(req);
  console.log(payload['id']);
  const usuariosDB = await User.findAll({
    attributes: ["id", "firstname", "lastname", "email", "role"]
  });

  if (!usuariosDB) {
    return res.status(404).json({
      error: `Al parecer no existe ningún usuario`,
    });
  }

  return res.json({
    data: usuariosDB,
  });

};
