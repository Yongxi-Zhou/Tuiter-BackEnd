import { Request, Response } from "express";

export default interface FollowControllerI {
    //get
    findAllFollowingUser(req: Request, res: Response): void
    findAllFollowedUser(req: Request, res: Response): void

    // post
    userFollowsAnotherUser(req: Request, res: Response): void
    //delete
    userUnfollowsAnotherUser(req: Request, res: Response): void
    // userRemoveAllFollowedUser(req: Request, res: Response): void
    // userRemoveAllFollowingUser(req: Request, res: Response): void
};