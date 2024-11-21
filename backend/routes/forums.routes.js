import {Router} from "express"
import { createForum, createForumComment, readForum, readForumComment, readForumComments, readForums, updateForum, updateForumComment } from "../models/forums.models.js"

const router = Router(); 

router.post("/forums", createForum);
router.get("/forums/id", readForum);
router.get("/forums", readForums);
router.put("/forums", updateForum);  

router.post("/forums/comments", createForumComment);
router.get("/forums/comments/id", readForumComment);
router.get("/forums/comments", readForumComments);
router.put("/forums/comments", updateForumComment);

export default router 