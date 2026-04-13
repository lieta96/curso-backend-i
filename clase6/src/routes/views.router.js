import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.render("index.handlebars");
});
router.get("/chat", (req, res) => {
  const { user } = req.query;
  
  res.render("chat.handlebars", { user });
});
export default router;
