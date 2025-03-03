import { Router } from "express";

import * as bh from "./RequestHandler/user.requesthandler.js"


import Auth from "./middleware/auth.js";

const router = Router();

// user
router.route("/adduser").post(bh.addUser);
router.route("/loginuser").post(bh.loginUser);






export default router;