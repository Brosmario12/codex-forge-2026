# Codex Forge 2026

Proyecto web premium con React, Vite, Supabase, Vercel y una funcion serverless de estrategia IA.

## Desarrollo

```bash
npm install
npm run dev
```

## Verificacion

```bash
npm run lint
npm run build
```

## Inteligencia artificial

La ruta `POST /api/strategist` usa OpenAI si existe `OPENAI_API_KEY` en Vercel. Si no existe, responde con un modo demo local para que el producto siga funcionando.

Variables:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.4-mini
```

## Supabase

La tabla `forge_requests` guarda briefs y estrategias generadas.

```bash
supabase link --project-ref TU_PROJECT_REF
supabase db push --linked
```

## Deploy

```bash
vercel --prod
```
