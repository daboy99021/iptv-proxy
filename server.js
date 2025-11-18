import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/proxy", async (req, res) => {
    const target = req.query.url;

    if (!target) {
        return res.status(400).json({ error: "Missing url parameter" });
    }

    try {
        const response = await fetch(target);
        const body = await response.text();

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Content-Type", response.headers.get("content-type") || "text/plain");

        res.send(body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Proxy running on 3000"));
