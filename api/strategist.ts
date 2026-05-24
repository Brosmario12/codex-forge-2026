import OpenAI from 'openai'

type Brief = {
  company?: string
  audience?: string
  goal?: string
}

type ApiRequest = {
  method?: string
  body?: Brief
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
}

function fallbackStrategy(brief: Brief) {
  const company = brief.company || 'la marca'
  const audience = brief.audience || 'clientes premium'
  const goal = brief.goal || 'capturar demanda'

  return [
    `Modo demo AI: posiciona ${company} como una opcion premium para ${audience}.`,
    `Hero: promesa directa sobre ${goal}, con prueba visual y una llamada de accion de bajo riesgo.`,
    'Arquitectura: problema caro, solucion clara, paquetes, prueba social, comparativa y formulario breve.',
    'Oferta: una auditoria inicial o prototipo en 24 horas para bajar friccion.',
    'Siguiente accion: conectar OPENAI_API_KEY en Vercel para activar respuestas reales del modelo.',
  ].join('\n')
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const brief = req.body as Brief

  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({
      mode: 'demo',
      strategy: fallbackStrategy(brief),
    })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
    input: [
      {
        role: 'system',
        content:
          'You are a senior product strategist and conversion-focused web architect. Return concise Spanish advice. No fluff.',
      },
      {
        role: 'user',
        content: `Negocio: ${brief.company}\nAudiencia: ${brief.audience}\nObjetivo: ${brief.goal}\n\nDevuelve una estrategia web 2026 con: posicionamiento, hero, secciones, datos a capturar y siguiente experimento.`,
      },
    ],
  })

  return res.status(200).json({
    mode: 'openai',
    strategy: response.output_text,
  })
}
