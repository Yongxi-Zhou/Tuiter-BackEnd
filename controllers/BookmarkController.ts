/**
 * @file Controller RESTful Web service API for Bookmarks resource
 */
import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class TuitController Implements RESTful Web service API for Bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/Bookmarks to retrieve all the tuits Bookmarkd by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/Bookmarks to retrieve all users that Bookmarkd a tuit
 *     </li>
 *     <li>POST /api/users/:uid/Bookmarks/:tid to record that a user Bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unBookmarks/:tid to record that a user
 *     no londer Bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} BookmarkDao Singleton DAO implementing Bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
            app.get("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.findAUserBookmarksTuit);
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnBookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() { }

    /**
     * Retrieves all users that Bookmarkd a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the Bookmarkd tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) => {
        console.log("find all users");

        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(Bookmarks => res.json(Bookmarks));
    }

    /**
     * Retrieves all tuits Bookmarkd by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user Bookmarkd the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were Bookmarkd
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) => {
        console.log("find all tuits");
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(Bookmarks => res.json(Bookmarks));
    }

    /**
     * Retrieves all tuits Bookmarkd by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user Bookmarkd the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were Bookmarkd
     */
    findAUserBookmarksTuit = (req: Request, res: Response) => {
        console.log("find a user");
        BookmarkController.bookmarkDao.findAUserBookmarksTuit(req.params.uid, req.params.tid)
            .then(Bookmarks => res.json(Bookmarks));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being Bookmarkd
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Bookmarks that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) => {
        console.log('userBookmarksTuit');

        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(Bookmarks => res.json(Bookmarks));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unBookmarkd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the Bookmark was successful or not
     */
    userUnBookmarksTuit = (req: Request, res: Response) => {
        console.log("delete");

        BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }

};