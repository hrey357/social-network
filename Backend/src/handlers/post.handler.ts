import { Request, Response } from "express";
import Post from "../models/post.model";
import { extractInfoToken } from "./jwt.handler";

export const getPosts = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to get Post of the social network.'
    #swagger.summary = 'Get Post'
    #swagger.tags = ['Post']
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                $ref: "#/components/schemas/OkPosts"
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
  */
  const posts = await Post.findAll({
    order: [["id", "DESC"]],
  });
  res.json({ data: posts });
};

export const getPostById = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to get Post by Id of the social network.'
    #swagger.summary = 'Get Post By Id'
    #swagger.tags = ['Post']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id of Post to get',
      type: 'number'
    }
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                $ref: "#/components/schemas/OkPost"
              }
          }           
      }
    } 
    #swagger.responses[400] = {
      description: "Bad Request Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/BadRequest"
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
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(404).json({
      error: "Post No Encontrado",
    });
  }
  res.json({ data: post });
};

export const createPost = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to create Post of the social network.'
    #swagger.summary = 'Create Post'
    #swagger.tags = ['Post']
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/RequestBodyPost" }
    } 
    #swagger.responses[201] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                $ref: "#/components/schemas/Post"
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
  */
  const payload = extractInfoToken(req);
  // console.log(payload['id']);
  const post = await Post.create({ ...req.body, usuario: payload["id"] });
  res.status(201).json({ data: post });
};

export const updatePost = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to update Post of the social network.'
    #swagger.summary = 'Update Post'
    #swagger.tags = ['Post']
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/RequestBodyPost" }
    } 
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/Post"
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
    #swagger.responses[403] = {
      description: "Forbidden Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/Forbidden"
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
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({
      error: "Post No Encontrado",
    });
  }

  const payload = extractInfoToken(req);
  // console.log(payload['id']);

  if (post.usuario !== payload["id"]) {
    return res.status(403).json({
      error: "Sin acceso, no eres el propietario del Post",
    });
  }

  post.mensaje = req.body.mensaje;

  // Actualizar
  await post.save();
  res.json({ data: post });
};

export const deletePost = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to delete Post by Id of the social network.'
    #swagger.summary = 'Delete Post By Id'
    #swagger.tags = ['Post']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id of Post to delete',
      type: 'number'
    } 
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                   data: "Post Eliminado" 
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
    #swagger.responses[403] = {
      description: "Forbidden Resource",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/Forbidden"
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
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({
      error: "Post No Encontrado",
    });
  }

  const payload = extractInfoToken(req);
  // console.log(payload['id']);

  if (post.usuario !== payload["id"]) {
    return res.status(403).json({
      error: "Sin acceso, no eres el propietario del Post",
    });
  }

  await post.destroy();
  res.json({ data: "Post Eliminado" });
};
