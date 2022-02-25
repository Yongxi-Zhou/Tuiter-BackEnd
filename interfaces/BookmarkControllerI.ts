import { Request, Response } from "express";

export default interface BookmarkControllerI {
    //get
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
    findAUserBookmarksTuit(req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;

    //post
    userBookmarksTuit(req: Request, res: Response): void;
    //delete
    userUnBookmarksTuit(req: Request, res: Response): void;
};