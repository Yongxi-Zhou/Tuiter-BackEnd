import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() { }
    // findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    //     LikeModel
    //         .find({tuit: tid})
    //         .populate("likedBy")
    //         .exec();
    // findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    //     LikeModel
    //         .find({likedBy: uid})
    //         .populate("tuit")
    //         .exec();
    // userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    //     LikeModel.create({tuit: tid, likedBy: uid});
    // userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    //     LikeModel.deleteOne({tuit: tid, likedBy: uid});

    //get
    findAllFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowing: uid }).exec()

    findAllFollowedUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowed: uid }).exec()


    // post
    userFollowsAnotherUser = async (uid: string, auid: string): Promise<Follow> =>
        FollowModel.create({ userFollowed: uid, userFollowing: auid })

    //delete
    userUnfollowsAnotherUser = async (uid: string, auid: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowed: uid, userFollowing: auid })

    // userRemoveAllFollowedUser = async (uid: string): Promise<any> =>
    //     FollowModel.deleteOne({ userFollowed: uid })

    // userRemoveAllFollowingUser = async (uid: string): Promise<any> =>
    //     FollowModel.deleteOne({ userFollowed: uid })

}