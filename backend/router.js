import { Router } from "express";

import * as bh from "./RequestHandler/user.requesthandler.js"


import Auth from "./middleware/auth.js";

const router = Router();

// for buyer or seller
router.route("/addbuyerseller").post(bh.addbuyer);
router.route("/loginbuyerseller").post(bh.loginbuyer);
router.route("/homebuyerseller").get(Auth,bh.Homebuyer);
router.route("/getuser").post(bh.getUser);
router.route("/sellerforgot").post(bh.passwordRequest);
router.route("/forgotbuyerseller").post(bh.passwordRequest);
router.route("/sellerpasswordchange").put(bh.resetPassword);
router.route("/sellerupdate").put(bh.updateUser);
router.route("/getseller").get(bh.getSeller);
router.route("/getbuyer").get(bh.getBuyer);





export default router;