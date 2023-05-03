import express  from "express";
import Property from "../models/Property.js";
import { createProperty,
        updatedProperty,
        deleteProperty,
        getProperty,
        getProperties,
        countPropertiesByCity,
        countPropertiesByType,
        readInfiniteScroll 
    }
    from "../controllers/PropertyController.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

//ADD PROPERTY
router.post("/add",verifyUser,createProperty)

//UPDATE PROPERTY
router.put("/update/:id",updatedProperty)

//DELETE PROPERTY
router.delete("/delete/:id",verifyUser,deleteProperty)

//GET PROPERTY
router.get("/get/:id",getProperty)

//GET ALL PROPERTY
router.get("/getall",getProperties)


router.get("/countByCity",countPropertiesByCity)

router.get("/countBytype",countPropertiesByType)

router.get("/infinite",readInfiniteScroll)
export default router