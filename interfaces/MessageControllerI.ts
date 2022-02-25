import { Request, Response } from "express";

export default interface LikeControllerI {
    //get
    findMessagedUserSent(req: Request, res: Response): void;
    findMessagedUserReceived(req: Request, res: Response): void;

    //post
    userSentMessagesToAnotherUser(req: Request, res: Response): void;
    //delete
    userDeleteMessage(req: Request, res: Response): void;

    //delete all
    userDeleteAllMessage(req: Request, res: Response): void;

    //put
    updateLastMessage(req: Request, res: Response): void;
};