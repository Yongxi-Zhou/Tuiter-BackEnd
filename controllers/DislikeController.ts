/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import { Express, Request, Response } from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/dislikeControllerI";
import TuitDao from "../daos/TuitDao";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import LikeDao from "../daos/LikeDao";

/**
 * @class TuitController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that disliked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no londer dislikes a tuit</li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();

    private static dislikeController: DislikeControllerI | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): DislikeControllerI => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
            app.get("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.checkIfDisLike);

        }
        return DislikeController.dislikeController;
    }

    private constructor() { }

    checkIfDisLike = async (req: Request, res: Response) => {
        const tid = req.params.tid;
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        await DislikeController.dislikeDao.findUserDislikesTuit(userId, tid).then(isdislike => res.json(isdislike))

    }

    /**
     * Retrieves all users that disliked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the disliked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * Retrieves all tuits disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were disliked
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                const tuitsFromdislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromdislikes);
            });
    }


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao;
        const tuitDao = DislikeController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        console.log(userId);
        console.log("toggle");

        try {
            const userAlreadydislikedTuit = await dislikeDao.findUserDislikesTuit(userId, tid);
            const userAlreadylikedTuit = await DislikeController.likeDao.findUserLikesTuit(userId, tid);

            const howManydislikedTuit = await dislikeDao.countHowManyDislikedTuit(tid);
            const howManylikedTuit = await DislikeController.likeDao.countHowManyLikedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);
            console.log(tuit);
            console.log(howManydislikedTuit);
            console.log(userAlreadydislikedTuit);



            if (userAlreadydislikedTuit) {
                await dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = howManydislikedTuit - 1;
            } else {
                if (userAlreadylikedTuit) {
                    await DislikeController.likeDao.userUnlikesTuit(userId, tid)
                    tuit.stats.likes = howManylikedTuit - 1;
                }
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManydislikedTuit + 1;
            };
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};