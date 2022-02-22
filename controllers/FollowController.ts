/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): LikeController => {
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

    // findAllUsersThatLikedTuit = (req: Request, res: Response) =>
    //     LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
    //         .then(likes => res.json(likes));

    // findAllTuitsLikedByUser = (req: Request, res: Response) =>
    //     LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
    //         .then(likes => res.json(likes));

    // userLikesTuit = (req: Request, res: Response) =>
    //     LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
    //         .then(likes => res.json(likes));

    // userUnlikesTuit = (req: Request, res: Response) =>
    //     LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
    //         .then(status => res.send(status));

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