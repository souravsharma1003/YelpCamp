const express=require("express");
const campController=require("../controllers/camp.controllers");
const validateCampground=require("../middlewares/campgroundSchemaValidation.middleware");
const router=express.Router();

router.get("/",campController.allCamps);

router.post("/",validateCampground,campController.createCamp);

router.get("/new",campController.newCamp);

router.get("/:id/edit",campController.getEditCamp);

router.get("/:id",campController.getCamp);

router.put("/:id",validateCampground,campController.editCamp);

router.delete("/:id",campController.deleteCamp);

module.exports=router;