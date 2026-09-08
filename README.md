# DevCamp — Users API (starter)

## Pokretanje (3 komande, ~1 min)

```bash
git clone <URL_REPOA>
cd devcamp-users-api
npm install        # instalira + generira Prisma client + kreira bazu + puni podatke
npm run dev        # server na http://localhost:3000
```

Nema Postgresa, nema Dockera, nema `.env` kopiranja — baza je SQLite datoteka
(`prisma/dev.db`) koja se sama kreira tijekom `npm install`.

Provjera da sve radi — otvori u browseru:
- http://localhost:3000 → `{ "message": "Hello DevCamp!" }`
- http://localhost:3000/api/users → 3 korisnika

## Zadatak

U `src/index.ts` nalaze se dva `TODO` bloka:

1. `GET /api/users/:id` — vrati jednog korisnika, 404 ako ne postoji
2. `DELETE /api/users/:id` — obriši i vrati 204

Server se sam restarta na svaku promjenu (`tsx watch`).

## Postman

| Metoda | URL | Body |
|---|---|---|
| GET | `{{BASE_URL}}/api/users` | — |
| GET | `{{BASE_URL}}/api/users/1` | — |
| GET | `{{BASE_URL}}/api/users/999` | → očekuj 404 |
| POST | `{{BASE_URL}}/api/users` | `{ "name": "Ana", "email": "novo@mail.com" }` |
| PUT | `{{BASE_URL}}/api/users/1` | `{ "name": "Ana M.", "email": "ana@mail.com" }` |
| DELETE | `{{BASE_URL}}/api/users/3` | → očekuj 204 |

Environment varijabla: `BASE_URL = http://localhost:3000`

## Korisne komande

```bash
npm run reset    # obriši bazu i ponovno napuni (id 1, 2, 3)
npm run studio   # Prisma Studio - baza u browseru
```

## Ako `npm install` puca

Otvori repo u browseru, bez ičega lokalno:
`https://stackblitz.com/github/<korisnik>/<repo>`
