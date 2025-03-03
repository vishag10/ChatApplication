import { Router } from "express";

import * as bh from "./RequestHandler/user.requesthandler.js"


import Auth from "./middleware/auth.js";

const router = Router();

// for buyer or seller
router.route("/adduser").post(bh.addUser);






export default router;