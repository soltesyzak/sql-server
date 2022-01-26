import express, {Request, Response} from "express";
import * as clientModel from "../models/client";
import {Client, BasicClient} from "../types/client";
const clientRouter = express.Router();

clientRouter.get("/", async (req: Request, res: Response) => {
    clientModel.findAll((err: Error, clients: Client[]) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        return res.status(200).json({data:clients});
    })
});

clientRouter.post("/", async (req: Request, res: Response) => {
    const newClient = req.body;
    clientModel.create(newClient, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        res.status(200).json({profileId:id});
    })
})

clientRouter.get("/:id", async (req: Request, res: Response) => {
    const clientId = Number(req.params.id);
    clientModel.findOne(clientId, (err: Error, client: Client) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        return res.status(200).json({...client});
    })
})

clientRouter.put("/:id", async (req: Request, res: Response) => {
    const client: Client = req.body;
    clientModel.update(client, (err: Error) => {
        if (err) {
            console.log(err)
            return res.status(500).json({errorMessage:err.message});
        }   
        return res.status(200).json({OK:true});
    })
})

clientRouter.delete("/:id", async (req: Request, res: Response) => {
    const deleted = Number(req.params.id);
    clientModel.deleteOne(deleted, (err: Error, message: Object) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        return res.status(200).json({...message});
    })
})

export {clientRouter};