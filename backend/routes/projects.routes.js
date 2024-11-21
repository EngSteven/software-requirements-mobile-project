import { Router } from "express";
import { 
    getProyects, 
    createProyect, 
    updateProyect, 
    deleteProyect, 
    getProyectsByCategory, 
    getProyectsByLimitDate, 
    getProyectsByFundingGoal, 
    getProyectsByCollection, 
    activeProjectsCount, 
    getActiveProjectRatings, 
    makeProjectRating, 
    updateRating, 
    answerProjectRating, 
    updateCommentRating, 
    deactivateProjectRating, 
    getAverageRatingProject, 
    checkNearbyProjects,
    getProyectById,
    getUserProject,
    getUserProjectsByCategory,
    getUserProjectsByFundingGoal,
    getUserProjectsByCollection,
    getUserProjectsByLimitDate,
    getProyectsByOwner
} from "../models/projects.models.js";

const router = Router();

router.get('/proyectos', getProyects);
router.get('/proyectos/id', getProyectsByOwner);

router.get('/proyectos/categoria', getProyectsByCategory);
router.get('/proyectos/objetivo', getProyectsByFundingGoal);
router.get('/proyectos/recaudado', getProyectsByCollection);
router.get('/proyectos/fechaLimite', getProyectsByLimitDate);

router.get('/proyectos/usuario', getUserProject);
router.get('/proyectos/usuario/categoria', getUserProjectsByCategory);
router.get('/proyectos/usuario/objetivo', getUserProjectsByFundingGoal);
router.get('/proyectos/usuario/recaudado', getUserProjectsByCollection);
router.get('/proyectos/usuario/fechaLimite', getUserProjectsByLimitDate);

router.get('/proyecto/id', getProyectById);

router.post('/proyecto', createProyect);

router.put('/proyecto', updateProyect);

router.delete('/proyecto', deleteProyect);

router.get("/proyecto/active/count", activeProjectsCount);

router.get("/proyectos/nearby", checkNearbyProjects);

// Ratings de proyectos
router.get("/proyectos/ratings", getActiveProjectRatings);
router.post("/proyectos/ratings", makeProjectRating);
router.put("/proyectos/ratings/rating", updateRating);
router.post("/proyectos/ratings/answer", answerProjectRating);
router.put("/proyectos/ratings/comment", updateCommentRating);
router.delete("/proyectos/ratings", deactivateProjectRating);
router.get("/proyectos/ratings/average", getAverageRatingProject);


export default router;