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
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findMessagedUserSent);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findMessagedUserReceived);
            app.post("/api/users/:uid/messages/:auid", MessageController.messageController.userSentMessagesToAnotherUser);
            app.delete("/api/users/:uid/messages/:auid", MessageController.messageController.userDeleteMessage);
            app.delete("/api/users/:uid/allmessages/:auid", MessageController.messageController.userDeleteAllMessage);
            app.put("/api/users/:uid/messages/:auid", MessageController.messageController.updateLastMessage);
        }
        return MessageController.messageController;
    }

    private constructor() { }
    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    findMessagedUserSent(req: Request, res: Response): void {
        console.log("findMessageSent");

        MessageController.messageDao.findMessagedUserSent(req.params.uid)
            .then((Messages) => res.json(Messages));
    }

    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    findMessagedUserReceived(req: Request, res: Response): void {
        console.log("findMessageReceived");

        MessageController.messageDao.findMessagedUserReceived(req.params.uid)
            .then((Messages) => res.json(Messages));
    }

    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    userSentMessagesToAnotherUser(req: Request, res: Response): void {
        console.log("userSentMessagesToAnotherUser");

        MessageController.messageDao.userSentMessagesToAnotherUser(req.params.uid, req.params.auid, req.body)
            .then((status) => res.send(status));
    }

    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    userDeleteMessage(req: Request, res: Response): void {
        console.log("userDeleteMessage");
        MessageController.messageDao.userDeleteMessage(req.params.uid, req.params.auid)
            .then((status) => res.send(status));
    }

    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    userDeleteAllMessage(req: Request, res: Response): void {
        console.log("userDeleteAllMessage");
        MessageController.messageDao.userDeleteAllMessage(req.params.uid, req.params.auid)
            .then((status) => res.send(status));
    }

    /**
     * Retrieves all Messages from the database and returns an array of Messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Message objects
     */
    updateLastMessage(req: Request, res: Response): void {
        console.log("updateLastMessage");
        MessageController.messageDao.updateLastMessage(req.params.uid, req.params.auid, req.body)
            .then((status) => res.send(status));
    }
};
