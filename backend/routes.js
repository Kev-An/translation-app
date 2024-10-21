import { Router } from "express";
import translate from "translate";
import dotenv from 'dotenv';
dotenv.config();
translate.engine = "google";
translate.key = process.env.translateKey;

const router = Router(); // Ensure 'router' is not redefined

router.post("/translate", async (req, res) => {
    const text = req.body.text;
    const selectedLanguage = req.body.selectedLanguage;
    
    try {
        const translatedText = await translate(text, selectedLanguage); 
        res.status(200).send({ translatedText, selectedLanguage });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while translating.");
    }
});

export default router;
