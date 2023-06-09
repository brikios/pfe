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
        getPropertyByOwner,
        getAllProperties
    }
    from "../controllers/PropertyController.js";

    import  upload  from'../utils/UploadImages.js'
import { verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

//ADD PROPERTY
router.post("/add",verifyTokenContract,upload.array('images'),createProperty) 
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

router.get("/getallpropeties",getAllProperties)

router.get("/countByCity",countPropertiesByCity)

router.get("/countBytype",countPropertiesByType)

router.get("/infinite",readInfiniteScroll)
export default router