import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json()); // parsira JSON body

// health check - da odmah vidis da server radi
app.get("/", (req, res) => {
  res.json({ message: "Hello DevCamp!" });
});

// ---------------------------------------------------------------
// GOTOVO - GET /api/users : dohvati sve
// ---------------------------------------------------------------
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// ---------------------------------------------------------------
// GOTOVO - POST /api/users : kreiraj novog
// ---------------------------------------------------------------
app.post("/api/users", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  const user = await prisma.user.create({
    data: { name, email, age },
  });

  res.status(201).json(user);
});

// ---------------------------------------------------------------
// GOTOVO - PUT /api/users/:id : azuriraj
// ---------------------------------------------------------------
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// ===============================================================
// ZADATAK 1 - GET /api/users/:id
// Vrati jednog korisnika.
// Ako ne postoji -> status 404 i { error: "User not found" }
//
// Hint:
//   const { id } = req.params;                  // string!
// ===============================================================

// TODO: napisi svoj kod ovdje

// ===============================================================
// ZADATAK 2 - DELETE /api/users/:id
// Obrisi korisnika i vrati status 204 bez body-ja: res.status(204).send()
// Ako ne postoji -> 404
// ===============================================================

// TODO: napisi svoj kod ovdje

// ===============================================================
// BONUS - sto vratiti ako je :id slovo, a ne broj?
// Probaj u Postmanu: GET /api/users/abc
// ===============================================================

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
