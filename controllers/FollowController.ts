/**
 * @file Controller RESTful Web service API for follows resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class TuitController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/following-user to retrieve all the tuits followd by a user
 *     </li>
 *     <li>GET /api/users/:uid/followed-user to retrieve all users that followd a tuit
 *     </li>
 *     <li>POST /api/users/:uid/follows/:tid to record that a user follows a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:tid to record that a user
 *     no londer follows a tuit</li>
 * </ul>
 * @property {followDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {followController} followController Singleton controller implementing
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
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following-user", FollowController.followController.findAllFollowingUser);
            app.get("/api/users/:uid/followed-user", FollowController.followController.findAllFollowedUser);
            app.post("/api/users/:uid/following/:auid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:auid", FollowController.followController.userUnfollowsAnotherUser);
            app.delete("/api/users/:uid/remove-all-follower", FollowController.followController.userRemoveAllFollower);
            app.delete("/api/users/:uid/remove-all-following", FollowController.followController.userRemoveAllFollowing);
        }
        return FollowController.followController
    }

    private constructor() { }

    //get
    /**
     * Retrieves all users that followd a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the followd tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingUser(req.params.uid).then(result =>
            res.json(result)
        )

    /**
     * Retrieves all tuits followd by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followd the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were followd
     */
    findAllFollowedUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedUser(req.params.uid).then(result =>
            res.json(result)
        )

    // post
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being followd
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.auid).then(result =>
            res.json(result)
        )
    //delete
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unfollowd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.auid).then(result =>
            res.send(result)
        )
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unfollowd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userRemoveAllFollower = (req: Request, res: Response) =>
        FollowController.followDao.userRemoveAllFollower(req.params.uid).then(result => {
            res.send(result)
        })
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unfollowd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userRemoveAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.userRemoveAllFollowing(req.params.uid).then(result => {
            res.send(result)
        })
};