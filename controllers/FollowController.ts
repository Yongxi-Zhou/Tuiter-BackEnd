/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";


export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following-user", FollowController.followController.findAllFollowingUser);
            app.get("/api/users/:uid/followed-user", FollowController.followController.findAllFollowedUser);
            app.post("/api/users/:uid/follows/:auid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:auid", FollowController.followController.userUnfollowsAnotherUser);
        }
        return FollowController.followController
    }

    private constructor() { }

    //get
    findAllFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingUser(req.params.uid).then(result => {
            res.json(result)
        })
    findAllFollowedUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedUser(req.params.uid).then(result => {
            res.json(result)
        })

    // post
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.auid).then(result => {
            res.json(result)
        })
    //delete
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.auid).then(result => {
            res.send(result)
        })
    // userRemoveAllFollowedUser = (req: Request, res: Response) =>
    //     FollowController.followDao.userRemoveAllFollowedUser().then(result => {
    //         res.send(result)
    //     })
    // userRemoveAllFollowingUser = (req: Request, res: Response) =>
    //     FollowController.followDao.userRemoveAllFollowingUser().then(result => {
    //         res.send(result)
    //     })
};