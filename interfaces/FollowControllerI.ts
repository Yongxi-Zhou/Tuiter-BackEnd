import { Request, Response } from "express";

export default interface FollowControllerI {
    //get
    findAllFollowingUser(req: Request, res: Response): void
    findAllFollowedUser(req: Request, res: Response): void

    // post
    userFollowsAnotherUser(req: Request, res: Response): void
    //delete
    userUnfollowsAnotherUser(req: Request, res: Response): void
    userRemoveAllFollower(req: Request, res: Response): void
    userRemoveAllFollowing(req: Request, res: Response): void
};