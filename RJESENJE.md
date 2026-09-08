# Rješenje (otvoriti nakon vježbe)

```ts
// GET /api/users/:id
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({ error: "Id must be a number" });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// DELETE /api/users/:id
app.delete("/api/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});
```

## Točke za diskusiju

- `req.params` je **uvijek string** — bez `Number(id)` Prisma baca grešku tipa
- 204 nema body: `res.status(204).json({...})` je besmislen
- Bez provjere `Number.isNaN`, `/api/users/abc` daje 404 umjesto 400 —
  krivo je klijentov zahtjev, ne "nema resursa"
- `findUnique` vraća `null`, ne baca grešku — bez `if (!user)` klijent dobije
  `200 null` umjesto 404
- `catch (err)` hvata sve — u produkciji se provjerava Prisma error kod `P2025`
