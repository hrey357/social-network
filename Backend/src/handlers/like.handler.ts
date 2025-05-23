import { Request, Response } from "express";
import Like from "../models/like.model";
import { extractInfoToken } from "./jwt.handler";
import sequelize from "sequelize/lib/sequelize";

export const getLikes = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to get all likes in every post of the social network.'
    #swagger.summary = 'Get likes'
    #swagger.tags = ['Likes']
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkGetLikes"
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
  const likes = await Like.findAll({
    attributes: [
      'mensaje',
      [sequelize.fn('COUNT', sequelize.col('Like.id')), 'count'],
    ],
    group: ['Like.mensaje'],
    order: [[sequelize.col('count'), 'DESC']]
  });
  res.json({ data: likes });
};


export const toggleLike = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to toggle like in some post of the social network.'
    #swagger.summary = 'Toglle like'
    #swagger.tags = ['Likes']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id of Post to toggle Like',
      type: 'number'
    }
    #swagger.responses[200] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/DeleteToggleLike"
              }
          }           
      }
    } 
    #swagger.responses[201] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkToggleLike"
              }
          }           
      }
    } 
    #swagger.responses[400] = {
      description: "Unauthorized Resource",
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

  const { id } = req.params;
  const payload = extractInfoToken(req);
  // console.log(payload['id']);
  
  const like = await Like.findOne({
    where: {
      usuario: payload["id"],
      mensaje: id,
    },
  });

  if (!like) {
    const like = await Like.create({ mensaje: id, usuario: payload["id"] });
    res.status(201).json({ data: like });
  }
  else{
    await like.destroy();
    res.json({ data: "Like Eliminado" });
  }
  
};


export const getLikesByUser = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.description = 'Resouce to get Likes by User of the social network.'
    #swagger.summary = 'Get Likes By User'
    #swagger.tags = ['Likes']


    
    #swagger.responses[201] = {
      description: "Success Response",
      content: {
          "application/json": {
              schema:{
                  $ref: "#/components/schemas/OkToggleLike"
              }
          }           
      }
    } 
    #swagger.responses[400] = {
      description: "Unauthorized Resource",
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
  
  const likes = await Like.findAll({
    attributes: [
      'mensaje',
    ],
    where: {
      usuario: payload["id"],
    },
  });


    res.status(200).json({ data: likes });


  
};
