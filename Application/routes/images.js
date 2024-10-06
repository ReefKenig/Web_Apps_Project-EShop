const express = require("express");
const router = express.Router();
const imageController = require("../controllers/images");

router.post("/", imageController.addImage);
router.get("/all", imageController.getAllImages);
router.get("/:imageid", imageController.getImageById);
router.put("/:imageid", imageController.updateImage);
router.delete("/:imageid", imageController.deleteImage);

module.exports = router;
