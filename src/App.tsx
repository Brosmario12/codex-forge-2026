import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  Orbit,
  RadioTower,
  Send,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import heroImage from './assets/forge-command-center.png'
import './App.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const systems = [
  {
    icon: BrainCircuit,
    label: 'AI Strategy Engine',
    body: 'Genera arquitectura, oferta, copy y plan de lanzamiento desde un brief corto.',
  },
  {
    icon: Layers3,
    label: 'Design System Fast',
    body: 'Componentes, tokens, layout responsive y direccion visual sin ruido de plantilla.',
  },
  {
    icon: Database,
    label: 'Supabase Data Layer',
    body: 'Leads, auditorias y solicitudes quedan capturadas en una base preparada para crecer.',
  },
  {
    icon: RadioTower,
    label: 'Vercel Release Grid',
    body: 'Deploys, preview links y produccion conectados a GitHub con trazabilidad.',
  },
]

const signals = [
  ['AI-ready', 'backend seguro'],
  ['0.7s', 'build cache target'],
  ['3 capas', 'web, datos, deploy'],
  ['2026', 'interfaz editorial'],
]

const launchSteps = [
  'Brief de negocio convertido en mapa de producto',
  'Direccion visual y componentes de alto nivel',
  'Base de datos, API y deploy continuo',
  'Prueba, medicion y siguiente iteracion',
]

type Brief = {
  company: string
  audience: string
  goal: string
}

const initialBrief: Brief = {
  company: 'Marca nueva de servicios premium',
  audience: 'Clientes que quieren lanzar rapido sin verse baratos',
  goal: 'Crear una web que explique, capture leads y parezca de alto nivel',
}

function App() {
  const [brief, setBrief] = useState(initialBrief)
  const [response, setResponse] = useState(
    'Describe el negocio y el motor de IA devuelve una estrategia de pagina, secciones y siguiente accion.',
  )
  const [status, setStatus] = useState<'idle' | 'thinking' | 'ready'>('idle')

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null
    return createClient(supabaseUrl, supabaseAnonKey)
  }, [])

  async function runStrategist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('thinking')
    setResponse('Analizando posicionamiento, conversion y arquitectura...')

    const aiResult = await fetch('/api/strategist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brief),
    })
      .then((res) => res.json())
      .catch(() => ({
        strategy:
          'Modo local: crea un hero con promesa concreta, una seccion de prueba, un sistema de paquetes y un formulario con una llamada clara.',
      }))

    const strategy = aiResult.strategy ?? aiResult.error ?? 'Estrategia generada.'
    setResponse(strategy)
    setStatus('ready')

    if (supabase) {
      await supabase.from('forge_requests').insert({
        company: brief.company,
        audience: brief.audience,
        goal: brief.goal,
        strategy,
      })
    }
  }

  return (
    <main>
      <section className="hero" id="top">
        <img className="hero-image" src={heroImage} alt="" />
        <div className="hero-shade" />
        <nav className="nav" aria-label="Principal">
          <a className="brand" href="#top">
            <span className="brand-icon">
              <Orbit size={20} aria-hidden="true" />
            </span>
            Codex Forge 2026
          </a>
          <div className="nav-links">
            <a href="#engine">Engine</a>
            <a href="#proof">Proof</a>
            <a href="#ai">AI Lab</a>
          </div>
        </nav>

        <div className="hero-copy">
          <div className="tag">
            <Sparkles size={16} aria-hidden="true" />
            Web launches with AI, data and taste
          </div>
          <h1>Un sistema web que parece caro porque piensa como producto.</h1>
          <p>
            Estrategia, interfaz, base de datos, GitHub, Vercel y una capa de IA
            lista para convertir briefs en paginas que no dan pena.
          </p>
          <div className="hero-actions">
            <a className="action primary" href="#ai">
              Probar IA
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="action secondary" href="#engine">
              Ver sistema
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Indicadores">
          {signals.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </aside>
      </section>

      <section className="section manifesto" id="engine">
        <div>
          <p className="kicker">Engine</p>
          <h2>La pagina ya no es folleto. Es una maquina de decision.</h2>
        </div>
        <p>
          Este proyecto esta armado como una plataforma pequena: frontend rapido,
          funcion serverless de IA, Supabase para memoria y deploy continuo.
        </p>
      </section>

      <section className="system-grid">
        {systems.map(({ icon: Icon, label, body }) => (
          <article key={label} className="system-card">
            <Icon size={26} aria-hidden="true" />
            <h3>{label}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="proof" id="proof">
        <div className="proof-copy">
          <p className="kicker">Proof stack</p>
          <h2>Codigo que se puede ensenar sin pedir perdon.</h2>
          <div className="proof-list">
            <span>
              <GitBranch size={18} aria-hidden="true" />
              GitHub source of truth
            </span>
            <span>
              <Gauge size={18} aria-hidden="true" />
              Performance budget
            </span>
            <span>
              <LockKeyhole size={18} aria-hidden="true" />
              Secrets only in backend
            </span>
          </div>
        </div>
        <div className="launch-console">
          <div className="console-top">
            <Cpu size={20} aria-hidden="true" />
            <span>Launch Sequence</span>
            <Zap size={18} aria-hidden="true" />
          </div>
          {launchSteps.map((step, index) => (
            <div className="console-row" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
              <CheckCircle2 size={18} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="ai-lab" id="ai">
        <div className="ai-copy">
          <p className="kicker">AI Lab</p>
          <h2>Brief entra. Estrategia sale.</h2>
          <p>
            La funcion serverless usa OpenAI cuando hay API key en Vercel. Sin
            key, mantiene un modo demo para que el producto siga vivo.
          </p>
        </div>

        <form className="ai-card" onSubmit={runStrategist}>
          <label>
            Negocio
            <input
              value={brief.company}
              onChange={(event) =>
                setBrief((current) => ({
                  ...current,
                  company: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Audiencia
            <input
              value={brief.audience}
              onChange={(event) =>
                setBrief((current) => ({
                  ...current,
                  audience: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Objetivo
            <textarea
              value={brief.goal}
              onChange={(event) =>
                setBrief((current) => ({ ...current, goal: event.target.value }))
              }
            />
          </label>
          <button className="action primary" type="submit">
            <Wand2 size={18} aria-hidden="true" />
            {status === 'thinking' ? 'Pensando...' : 'Generar estrategia'}
          </button>
        </form>

        <article className="ai-output" aria-live="polite">
          <div className="output-top">
            <BrainCircuit size={20} aria-hidden="true" />
            <span>{status === 'ready' ? 'Strategy Ready' : 'Strategy Engine'}</span>
            <Send size={17} aria-hidden="true" />
          </div>
          <p>{response}</p>
        </article>
      </section>
    </main>
  )
}

export default App
