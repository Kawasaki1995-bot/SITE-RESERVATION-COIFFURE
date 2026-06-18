const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const salonsRoutes = require("./routes/salons.routes");
const prestationsRoutes = require("./routes/prestations.routes");
const horairesRoutes = require("./routes/horaires.routes");
const creneauxRoutes = require("./routes/creneaux.routes");
const reservationsRoutes = require("./routes/reservations.routes");
const adminRoutes = require("./routes/admin.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.FRONTEND_URL || "*";

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET manquant dans le fichier .env");
  process.exit(1);
}

app.use(
  cors({
    origin: corsOrigin,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API Cut&Go operationnelle",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/salons", salonsRoutes);
app.use("/api/prestations", prestationsRoutes);
app.use("/api/horaires", horairesRoutes);
app.use("/api/creneaux", creneauxRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable",
  });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`API Cut&Go demarree sur http://localhost:${port}`);
});
