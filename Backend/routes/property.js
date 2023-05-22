import express  from "express";
import Property from "../models/Property.js";
import { createProperty,
        updatedProperty,
        deleteProperty,
        getProperty,
        getProperties,
        countPropertiesByCity,
        countPropertiesByType,
        readInfiniteScroll, 
        getPropertyByOwner
    }
    from "../controllers/PropertyController.js";

const router = express.Router();

//ADD PROPERTY
router.post("/add",createProperty)

//UPDATE PROPERTY
router.put("/update/:id",updatedProperty)

//DELETE PROPERTY
router.delete("/delete/:id",deleteProperty)

//GET PROPERTY
router.get("/get/:id",getProperty)

//GET PROPERTY BY OWNER 
router.get('/getByOwner/:id',getPropertyByOwner)
//GET ALL PROPERTY
router.get("/getall",getProperties)


router.get("/countByCity",countPropertiesByCity)

router.get("/countBytype",countPropertiesByType)

router.get("/infinite",readInfiniteScroll)
export default router