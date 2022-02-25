/**
 * @file Controller RESTful Web service API for Messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Messages";
import { Express, Request, Response } from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @class MessageController Implements RESTful Web service API for Messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/Messages to create a new Message instance for
 *     a given user</li>
 *     <li>GET /api/Messages to retrieve all the Message instances</li>
 *     <li>GET /api/Messages/:tid to retrieve a particular Message instances</li>
 *     <li>GET /api/users/:uid/Messages to retrieve Messages for a given user </li>
 *     <li>PUT /api/Messages/:tid to modify an individual Message instance </li>
 *     <li>DELETE /api/Messages/:tid to remove a particular Message instance</li>
 * </ul>
 * @property {MessageDao} MessageDao Singleton DAO implementing Message CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/Messages", MessageController.messageController.findAllMessages);
            app.get("/api/users/:uid/Messages", MessageController.messageController.findAllMessagesByUser);
            app.get("/api/Messages/:uid", MessageController.messageController.findMessageById);
            app.post("/api/users/:uid/Messages", MessageController.messageController.createMessageByUser);
            app.put("/api/Messages/:uid", MessageController.messageController.updateMessage);
            app.delete("/api/Messages/:uid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() { }
    findMessagedUserSent(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    findMessagedUserReceived(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    userSentMessagesToAnotherUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    userDeleteMessage(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    userDeleteAllMessageSent(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    userDeleteAllMessageReceived(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then((Messages: Message[]) => res.json(Messages));

    /**
     * Retrieves all Messages from the database for a particular user and returns
     * an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    findAllMessagesByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesByUser(req.params.uid)
            .then((Messages: Message[]) => res.json(Messages));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the Message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the Message that matches the user ID
     */
    findMessageById = (req: Request, res: Response) =>
        MessageController.messageDao.findMessageById(req.params.uid)
            .then((Message: Message) => res.json(Message));

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new Message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Message that was inserted in the
     * database
     */
    createMessageByUser = (req: Request, res: Response) =>
        MessageController.messageDao.createMessageByUser(req.params.uid, req.body)
            .then((Message: Message) => res.json(Message));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the Message to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a Message was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.uid, req.body)
            .then((status) => res.send(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the Message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.uid)
            .then((status) => res.send(status));
};
