import {Hashtag} from '../db'
import { NextFunction, Request, Response } from 'express'


export default class HashtagController {
  // for getting all data
  public static async show (req: Request, res: Response, next: NextFunction) {
    const allHashtags = await Hashtag.findAll({
      attributes: ['title']
    })
res.json({data:allHashtags})
  }}