import { Router } from "express";

import * as bh from "./RequestHandler/user.requesthandler.js"
import * as mh from "./RequestHandler/message.requesthandler.js"



import Auth from "./middleware/auth.js";

const router = Router();

// user
router.route("/adduser").post(bh.addUser);
router.route("/loginuser").post(bh.loginUser);
router.route("/getuser").get(Auth, bh.HomeUser);
router.route("/getsidebar").post(mh.getUserSidebar);
router.route("/sendmessage").post(mh.sendMessage);
router.route("/getmessage").post(mh.getMessage);






export default router;