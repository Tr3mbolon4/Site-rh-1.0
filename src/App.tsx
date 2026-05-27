import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  Filter,
  LockKeyhole,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'

type Status =
  | 'Interessado'
  | 'Em análise'
  | 'Entrevista'
  | 'Agendado'
  | 'Aprovável'
  | 'Aprovado'
  | 'Reprovado'
  | 'Banco de talentos'
  | 'Contratado'

type Job = {
  id: number
  title: string
  sector: string
  city: string
  location: string
  contract: string
  quantity: number
  salary: string
  benefits: string
  schedule: string
  modality: string
  weeklyHours: string
  complementaryInfo: string
  acceptedCities: string
  description: string
  required: string[]
  desired: string[]
  customQuestions: string[]
  owner: string
  status: 'Aberta' | 'Pausada' | 'Encerrada' | 'Arquivada'
  openedAt: string
  closesAt: string
}

type FormerQuestion = {
  id: number
  text: string
  type: 'Sim/Não' | 'Nota 1 a 5' | 'Nota 1 a 10' | 'Texto curto' | 'Texto longo' | 'Múltipla escolha'
  required: boolean
  options?: string[]
}

type FormerRelease = {
  id: number
  name: string
  cpf: string
  sector: string
  role: string
  dismissalDate: string
  dismissalReason: string
  validUntil: string
  status: 'liberado' | 'respondido' | 'expirado' | 'bloqueado'
  releasedAt: string
  answeredAt?: string
}

type FormerResponse = {
  id: number
  cpf: string
  answeredAt: string
  ip: string
  answers: Record<string, string>
}

type ProfessionalExperience = {
  id: number
  company: string
  role: string
  startDate: string
  endDate: string
  current: string
  activities: string
  exitReason: string
}

type AcademicFormation = {
  id: number
  type: string
  course: string
  institution: string
  startDate: string
  endDate: string
  inProgress: string
}

type CertificationCourse = {
  id: number
  name: string
  institution: string
  workload: string
  completionDate: string
  validity: string
}

type LanguageRecord = {
  id: number
  language: string
  reading: string
  writing: string
  speaking: string
}

type SkillRecord = {
  id: number
  name: string
}

type CandidateHistory = {
  id: number
  date: string
  time: string
  user: string
  from: Status | 'Cadastro'
  to: Status
  observation: string
  reason?: string
  interview?: InterviewSchedule
}

type InterviewSchedule = {
  date: string
  time: string
  type: 'Presencial' | 'Online'
  location: string
  meetingLink: string
  interviewer: string
  notes: string
  status: 'Agendada' | 'Realizada' | 'Cancelada'
}

type CandidateRejection = {
  date: string
  reason: string
  notes: string
  responsible: string
}

type Candidate = {
  id: number
  name: string
  cpf: string
  city: string
  phone: string
  whatsapp: string
  email: string
  genderIdentity?: string
  birthDate?: string
  linkedin?: string
  address?: string
  rg?: string
  education: string
  experience: string
  formations?: AcademicFormation[]
  courses?: CertificationCourse[]
  experiences?: ProfessionalExperience[]
  languages?: LanguageRecord[]
  skills?: SkillRecord[]
  resumeFile?: string
  photoFile?: string
  customAnswers?: Record<string, string>
  desiredSalary: string
  jobId?: number
  status: Status
  score: number
  tags: string[]
  notes: string
  appliedAt: string
  approvedAt?: string
  approvalResponsible?: string
  history?: CandidateHistory[]
  interview?: InterviewSchedule
  rejection?: CandidateRejection
}

const statuses: Status[] = [
  'Interessado',
  'Em análise',
  'Entrevista',
  'Agendado',
  'Aprovável',
  'Aprovado',
  'Reprovado',
  'Banco de talentos',
  'Contratado',
]

const funnelStatuses: Status[] = [
  'Interessado',
  'Em análise',
  'Entrevista',
  'Agendado',
  'Aprovável',
  'Aprovado',
  'Contratado',
]

const initialJobs: Job[] = [
  {
    id: 1,
    title: 'Analista de RH',
    sector: 'Recursos Humanos',
    city: 'Caxias do Sul',
    location: 'Matriz CIPOLATTI',
    contract: 'CLT',
    quantity: 1,
    salary: 'R$ 3.500 a R$ 4.500',
    benefits: 'Vale alimentação, plano de saúde, seguro de vida',
    schedule: 'Segunda a sexta, 08h às 18h',
    modality: 'Presencial',
    weeklyHours: '44 horas semanais',
    complementaryInfo: 'Atuação próxima aos gestores, com indicadores e rotinas de recrutamento.',
    acceptedCities: 'Caxias do Sul, Farroupilha, Flores da Cunha',
    description:
      'Conduzir recrutamento e seleção, entrevistas, integração, indicadores e apoio aos gestores.',
    required: ['Experiência em R&S', 'Ensino superior em andamento', 'Pacote Office'],
    desired: ['Conhecimento em indicadores', 'Vivência com vagas operacionais'],
    customQuestions: ['Possui experiência na função?', 'Aceita trabalhar presencial?', 'Reside próximo ao local da vaga?'],
    owner: 'Marina Alves',
    status: 'Aberta',
    openedAt: '2026-05-20',
    closesAt: '2026-06-20',
  },
  {
    id: 2,
    title: 'Motorista Entregador',
    sector: 'Logística',
    city: 'Bento Gonçalves',
    location: 'Centro de distribuição',
    contract: 'CLT',
    quantity: 3,
    salary: 'R$ 2.700 + variáveis',
    benefits: 'Vale refeição, ajuda de custo, premiação',
    schedule: 'Escala comercial com disponibilidade para viagens curtas',
    modality: 'Presencial e externo',
    weeklyHours: '44 horas semanais',
    complementaryInfo: 'Necessário zelo pelo veículo, documentação em dia e disponibilidade para rotas regionais.',
    acceptedCities: 'Bento Gonçalves, Garibaldi, Carlos Barbosa',
    description:
      'Realizar entregas, conferência de materiais, zelo pelo veículo e atendimento ao cliente.',
    required: ['CNH C ou D', 'Experiência comprovada', 'Disponibilidade para viagens'],
    desired: ['Curso MOPP', 'Conhecimento de rotas na Serra Gaúcha'],
    customQuestions: ['Possui CNH?', 'Possui disponibilidade de horário?', 'Possui experiência na função?'],
    owner: 'Renato Costa',
    status: 'Aberta',
    openedAt: '2026-05-18',
    closesAt: '2026-06-10',
  },
  {
    id: 3,
    title: 'Assistente Administrativo',
    sector: 'Administrativo',
    city: 'Farroupilha',
    location: 'Filial Farroupilha',
    contract: 'CLT',
    quantity: 2,
    salary: 'R$ 2.200 a R$ 2.800',
    benefits: 'Vale transporte, vale alimentação, convênio farmácia',
    schedule: 'Segunda a sexta, horário comercial',
    modality: 'Presencial',
    weeklyHours: '44 horas semanais',
    complementaryInfo: 'Rotina administrativa com atendimento, planilhas e apoio ao ERP interno.',
    acceptedCities: 'Farroupilha, Caxias do Sul',
    description:
      'Atuar com atendimento, controles em planilhas, lançamentos em ERP e suporte aos setores.',
    required: ['Excel intermediário', 'Boa comunicação', 'Ensino médio completo'],
    desired: ['Conhecimento em ERP', 'Experiência com atendimento'],
    customQuestions: ['Possui conhecimento em Excel?', 'Aceita trabalhar presencial?', 'Reside próximo ao local da vaga?'],
    owner: 'Patrícia Lima',
    status: 'Aberta',
    openedAt: '2026-05-22',
    closesAt: '2026-06-30',
  },
]

const initialCandidates: Candidate[] = [
  {
    id: 101,
    name: 'Camila Rodrigues',
    cpf: '123.456.789-10',
    city: 'Caxias do Sul',
    phone: '(54) 99910-0011',
    whatsapp: '5554999100011',
    email: 'camila@email.com',
    education: 'Superior em Psicologia',
    experience: '4 anos em recrutamento e seleção',
    desiredSalary: 'R$ 4.200',
    jobId: 1,
    status: 'Entrevista',
    score: 92,
    tags: ['RH', 'Entrevistas', 'Excel'],
    notes: 'Excelente experiência com vagas operacionais. Chamar para entrevista final.',
    appliedAt: '2026-05-25',
    address: 'Rua Sinimbu, 1200 - Centro - Caxias do Sul/RS',
    genderIdentity: 'Feminino',
    birthDate: '1992-04-12',
    linkedin: 'linkedin.com/in/camilarodrigues',
    resumeFile: 'curriculo-camila.pdf',
    photoFile: 'foto-camila.jpg',
    formations: [{ id: 1, type: 'Graduação', course: 'Psicologia', institution: 'UCS', startDate: '2011-02-01', endDate: '2016-12-15', inProgress: 'Não' }],
    experiences: [{ id: 1, company: 'Grupo Serra', role: 'Analista de RH', startDate: '2021-03-01', endDate: '2026-04-30', current: 'Não', activities: 'Recrutamento, entrevistas, triagem e indicadores.', exitReason: 'Nova oportunidade' }],
    courses: [{ id: 1, name: 'Entrevista por competências', institution: 'ABRH', workload: '20h', completionDate: '2025-10-10', validity: '' }],
    languages: [{ id: 1, language: 'Inglês', reading: 'Intermediário', writing: 'Intermediário', speaking: 'Básico' }],
    skills: [{ id: 1, name: 'Excel' }, { id: 2, name: 'Entrevistas' }],
    customAnswers: { 'Possui experiência na função?': 'Sim', 'Aceita trabalhar presencial?': 'Sim', 'Reside próximo ao local da vaga?': 'Sim' },
    interview: { date: '2026-05-27', time: '14:30', type: 'Online', location: '', meetingLink: 'https://meet.example.com/cipolatti-rh', interviewer: 'Marina Alves', notes: 'Entrevista comportamental', status: 'Agendada' },
    history: [
      { id: 1, date: '2026-05-25', time: '09:20', user: 'Portal público', from: 'Cadastro', to: 'Interessado', observation: 'Candidatura recebida pelo site.' },
      { id: 2, date: '2026-05-26', time: '15:10', user: 'RH', from: 'Interessado', to: 'Entrevista', observation: 'Perfil aderente para entrevista.', interview: { date: '2026-05-27', time: '14:30', type: 'Online', location: '', meetingLink: 'https://meet.example.com/cipolatti-rh', interviewer: 'Marina Alves', notes: 'Entrevista comportamental', status: 'Agendada' } },
    ],
  },
  {
    id: 102,
    name: 'João Martins',
    cpf: '321.654.987-22',
    city: 'Bento Gonçalves',
    phone: '(54) 99840-2020',
    whatsapp: '5554998402020',
    email: 'joao@email.com',
    education: 'Ensino médio completo',
    experience: '7 anos como motorista de entregas',
    desiredSalary: 'R$ 3.000',
    jobId: 2,
    status: 'Aprovável',
    score: 88,
    tags: ['Motorista', 'CNH D', 'Viagens'],
    notes: 'Bom perfil. Possui CNH D e disponibilidade imediata.',
    appliedAt: '2026-05-24',
    approvedAt: '2026-05-26',
    approvalResponsible: 'Renato Costa',
    address: 'Av. Planalto, 88 - Centro - Bento Gonçalves/RS',
    resumeFile: 'curriculo-joao.pdf',
    formations: [{ id: 1, type: 'Ensino Médio', course: 'Ensino Médio', institution: 'Escola Estadual Bento', startDate: '2006-02-01', endDate: '2008-12-15', inProgress: 'Não' }],
    experiences: [{ id: 1, company: 'Transportes Vale', role: 'Motorista Entregador', startDate: '2019-01-10', endDate: '2026-03-15', current: 'Não', activities: 'Entregas regionais, conferência e relacionamento com clientes.', exitReason: 'Encerramento de contrato' }],
    courses: [{ id: 1, name: 'Direção defensiva', institution: 'SEST SENAT', workload: '16h', completionDate: '2025-02-11', validity: '2027-02-11' }],
    languages: [{ id: 1, language: 'Português', reading: 'Nativo', writing: 'Nativo', speaking: 'Nativo' }],
    skills: [{ id: 1, name: 'CNH D' }, { id: 2, name: 'Rotas regionais' }],
    customAnswers: { 'Possui CNH?': 'Sim', 'Possui disponibilidade de horário?': 'Sim', 'Possui experiência na função?': 'Sim' },
    history: [
      { id: 1, date: '2026-05-24', time: '11:05', user: 'Portal público', from: 'Cadastro', to: 'Interessado', observation: 'Candidatura recebida pelo site.' },
      { id: 2, date: '2026-05-26', time: '16:00', user: 'RH', from: 'Interessado', to: 'Aprovável', observation: 'Documentação e experiência compatíveis.' },
    ],
  },
  {
    id: 103,
    name: 'Letícia Vargas',
    cpf: '444.222.111-77',
    city: 'Farroupilha',
    phone: '(54) 99777-1010',
    whatsapp: '5554997771010',
    email: 'leticia@email.com',
    education: 'Técnico em Administração',
    experience: '2 anos em atendimento e rotinas administrativas',
    desiredSalary: 'R$ 2.600',
    jobId: 3,
    status: 'Em análise',
    score: 81,
    tags: ['Administrativo', 'Excel', 'ERP'],
    notes: 'Boa comunicação e conhecimento em ERP.',
    appliedAt: '2026-05-26',
    address: 'Rua Independência, 55 - Farroupilha/RS',
    resumeFile: 'curriculo-leticia.docx',
    formations: [{ id: 1, type: 'Técnico', course: 'Administração', institution: 'SENAC', startDate: '2023-02-01', endDate: '2024-12-10', inProgress: 'Não' }],
    experiences: [{ id: 1, company: 'Loja Central', role: 'Assistente Administrativo', startDate: '2024-01-08', endDate: '2026-04-20', current: 'Não', activities: 'Atendimento, planilhas e ERP.', exitReason: 'Busca de crescimento' }],
    courses: [{ id: 1, name: 'Excel Avançado', institution: 'SENAC', workload: '40h', completionDate: '2025-09-12', validity: '' }],
    languages: [{ id: 1, language: 'Inglês', reading: 'Básico', writing: 'Básico', speaking: 'Básico' }],
    skills: [{ id: 1, name: 'Excel' }, { id: 2, name: 'Totvs' }],
    customAnswers: { 'Possui conhecimento em Excel?': 'Sim', 'Aceita trabalhar presencial?': 'Sim', 'Reside próximo ao local da vaga?': 'Sim' },
    history: [
      { id: 1, date: '2026-05-26', time: '13:40', user: 'Portal público', from: 'Cadastro', to: 'Interessado', observation: 'Candidatura recebida pelo site.' },
      { id: 2, date: '2026-05-26', time: '17:15', user: 'RH', from: 'Interessado', to: 'Em análise', observation: 'Perfil enviado para análise do RH.' },
    ],
  },
  {
    id: 104,
    name: 'Rafael Souza',
    cpf: '999.888.777-66',
    city: 'Caxias do Sul',
    phone: '(54) 99660-9090',
    whatsapp: '5554996609090',
    email: 'rafael@email.com',
    education: 'Superior em andamento',
    experience: 'Banco de talentos para TI e manutenção',
    desiredSalary: 'R$ 3.800',
    status: 'Banco de talentos',
    score: 76,
    tags: ['TI', 'Manutenção'],
    notes: 'Cadastro espontâneo. Associar quando abrir vaga técnica.',
    appliedAt: '2026-05-21',
    address: 'Caxias do Sul/RS',
    formations: [{ id: 1, type: 'Graduação', course: 'Análise e Desenvolvimento de Sistemas', institution: 'IFRS', startDate: '2024-02-01', endDate: '', inProgress: 'Sim' }],
    experiences: [{ id: 1, company: 'Freelancer', role: 'Técnico de suporte', startDate: '2023-04-01', endDate: '', current: 'Sim', activities: 'Suporte, manutenção e pequenas automações.', exitReason: '' }],
    courses: [{ id: 1, name: 'Power BI', institution: 'Curso Livre', workload: '30h', completionDate: '2025-05-20', validity: '' }],
    languages: [{ id: 1, language: 'Inglês', reading: 'Intermediário', writing: 'Básico', speaking: 'Básico' }],
    skills: [{ id: 1, name: 'Power BI' }, { id: 2, name: 'Manutenção' }],
    customAnswers: {},
    history: [
      { id: 1, date: '2026-05-21', time: '10:12', user: 'Portal público', from: 'Cadastro', to: 'Interessado', observation: 'Cadastro espontâneo recebido.' },
      { id: 2, date: '2026-05-22', time: '09:30', user: 'RH', from: 'Interessado', to: 'Banco de talentos', observation: 'Mantido para futuras vagas técnicas.' },
    ],
  },
]

const permissions = [
  {
    profile: 'Administrador geral',
    access: 'Acesso total, usuários, perfis, empresa, vagas, candidatos, relatórios, avaliações e desligamentos.',
  },
  {
    profile: 'RH',
    access:
      'Cadastra e edita vagas, altera status, agenda entrevistas, gerencia banco de talentos, libera CPF de desligado e exporta aprovados.',
  },
  {
    profile: 'Gestor de setor',
    access:
      'Visualiza candidatos do setor, comenta, sugere aprovação ou reprovação e solicita entrevista.',
  },
  {
    profile: 'Diretoria',
    access: 'Visualiza indicadores, relatórios e candidatos, com alterações apenas quando autorizado.',
  },
  {
    profile: 'Consulta/leitura',
    access: 'Apenas visualização autorizada, sem edição, exportação ou mudança de status.',
  },
]

const initialFormerQuestions: FormerQuestion[] = [
  { id: 1, text: 'Como você avalia sua experiência na empresa?', type: 'Nota 1 a 10', required: true },
  { id: 2, text: 'Como você avalia sua liderança direta?', type: 'Nota 1 a 5', required: true },
  { id: 3, text: 'Você voltaria a trabalhar na empresa?', type: 'Sim/Não', required: true },
  { id: 4, text: 'Qual foi o principal motivo da sua saída?', type: 'Múltipla escolha', required: true, options: ['Nova oportunidade', 'Liderança', 'Benefícios', 'Ambiente', 'Mudança pessoal'] },
  { id: 5, text: 'O que a empresa poderia melhorar?', type: 'Texto longo', required: true },
  { id: 6, text: 'Deixe uma sugestão ou comentário final.', type: 'Texto longo', required: false },
]

const initialFormerReleases: FormerRelease[] = [
  {
    id: 1,
    name: 'Ana Paula Silveira',
    cpf: '111.222.333-44',
    sector: 'Produção',
    role: 'Operadora',
    dismissalDate: '2026-05-10',
    dismissalReason: 'Nova oportunidade',
    validUntil: '2026-06-30',
    status: 'liberado',
    releasedAt: '2026-05-26 10:20',
  },
  {
    id: 2,
    name: 'Carlos Eduardo Lima',
    cpf: '555.666.777-88',
    sector: 'Logística',
    role: 'Motorista',
    dismissalDate: '2026-04-28',
    dismissalReason: 'Mudança de cidade',
    validUntil: '2026-05-20',
    status: 'expirado',
    releasedAt: '2026-05-01 09:00',
  },
]

function App() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('Todas')
  const [sector, setSector] = useState('Todos')
  const [selectedJob, setSelectedJob] = useState<Job>(initialJobs[0])
  const [publicView, setPublicView] = useState<'home' | 'details' | 'application'>('home')
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [applicationSent, setApplicationSent] = useState(false)
  const [applicationStep, setApplicationStep] = useState(0)
  const [formerQuestions, setFormerQuestions] = useState<FormerQuestion[]>(initialFormerQuestions)
  const [formerReleases, setFormerReleases] = useState<FormerRelease[]>(initialFormerReleases)
  const [formerResponses, setFormerResponses] = useState<FormerResponse[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [pendingInterview, setPendingInterview] = useState<{ candidateId: number; status: Status } | null>(null)
  const [pendingRejection, setPendingRejection] = useState<{ candidateId: number; status: Status } | null>(null)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const adminRoutes = ['/painel-rh', '/admin', '/login-rh', '/rh']
  const isAdminRoute = adminRoutes.includes(currentPath) || window.location.hash === '#rh-login'
  const isEvaluationRoute = currentPath === '/faca-sua-avaliacao'
  const isAboutRoute = currentPath === '/sobre-a-cipolatti'
  const isJobsRoute = currentPath === '/vagas'
  const [adminAuthorized, setAdminAuthorized] = useState(false)

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesText = `${job.title} ${job.description} ${job.required.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesCity = city === 'Todas' || job.city === city
      const matchesSector = sector === 'Todos' || job.sector === sector
      return job.status === 'Aberta' && matchesText && matchesCity && matchesSector
    })
  }, [jobs, query, city, sector])

  const dashboard = {
    openJobs: jobs.filter((job) => job.status === 'Aberta').length,
    totalCandidates: candidates.length,
    todayApplications: candidates.filter((candidate) => candidate.appliedAt === '2026-05-26').length,
    interviews: candidates.filter((candidate) => ['Entrevista', 'Agendado'].includes(candidate.status)).length,
    approved: candidates.filter((candidate) => candidate.status === 'Aprovado').length,
    hired: candidates.filter((candidate) => candidate.status === 'Contratado').length,
    talentPool: candidates.filter((candidate) => candidate.status === 'Banco de talentos').length,
  }

  const valueItems: Array<[string, string, LucideIcon]> = [
    ['Gestão completa', 'Vagas, candidatos, entrevistas e admissões em um só lugar.', Users],
    ['Fluxo inteligente', 'Perguntas e pontuação mudam conforme a vaga.', Sparkles],
    ['Segurança LGPD', 'Consentimento, logs, perfis e auditoria desde a base.', ShieldCheck],
    ['Indicadores internos', 'Dados estratégicos e visão gerencial ficam protegidos no acesso do RH.', BarChart3],
  ]

  const applyCandidateStatus = (
    candidateId: number,
    status: Status,
    observation: string,
    options?: { reason?: string; interview?: InterviewSchedule },
  ) => {
    const now = new Date()
    const date = now.toLocaleDateString('pt-BR')
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setCandidates((current) =>
      current.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              status,
              approvedAt: ['Aprovado', 'Aprovável', 'Contratado'].includes(status)
                ? candidate.approvedAt ?? date
                : candidate.approvedAt,
              approvalResponsible: ['Aprovado', 'Aprovável', 'Contratado'].includes(status)
                ? candidate.approvalResponsible ?? 'RH'
                : candidate.approvalResponsible,
              interview: options?.interview ?? candidate.interview,
              rejection: status === 'Reprovado'
                ? { date, reason: options?.reason ?? 'Não informado', notes: observation, responsible: 'RH' }
                : candidate.rejection,
              history: [
                ...(candidate.history ?? []),
                {
                  id: Date.now(),
                  date,
                  time,
                  user: 'RH',
                  from: candidate.status,
                  to: status,
                  observation,
                  reason: options?.reason,
                  interview: options?.interview,
                },
              ],
            }
          : candidate,
      ),
    )
  }

  const requestCandidateStatus = (candidateId: number, status: Status) => {
    if (status === 'Entrevista' || status === 'Agendado') {
      setPendingInterview({ candidateId, status })
      return
    }
    if (status === 'Reprovado') {
      setPendingRejection({ candidateId, status })
      return
    }
    applyCandidateStatus(candidateId, status, 'Status atualizado pelo painel RH.')
  }

  const exportCandidatesExcel = async (items: Candidate[], filename = 'cipolatti-candidatos.xlsx') => {
    const rows = items.map((candidate) => {
      const job = jobs.find((item) => item.id === candidate.jobId)
      return [
        candidate.name,
        candidate.cpf,
        candidate.phone,
        candidate.whatsapp,
        candidate.email,
        candidate.address ?? '',
        candidate.city,
        candidate.education,
        candidate.experience,
        job?.title ?? 'Banco de talentos',
        job?.sector ?? '',
        candidate.status,
        candidate.score.toString(),
        candidate.appliedAt,
        candidate.approvedAt ?? '',
        candidate.rejection?.reason ?? '',
        candidate.notes,
      ]
    })

    const buffer = await createXlsx([
      ['Nome', 'CPF', 'Telefone', 'WhatsApp', 'E-mail', 'Endereço', 'Cidade', 'Escolaridade', 'Experiência', 'Vaga', 'Setor', 'Status', 'Aderência', 'Data candidatura', 'Data aprovação', 'Motivo reprovação', 'Observações RH'],
      ...rows,
    ])
    downloadXlsx(buffer, filename)
  }

  const duplicateJob = (job: Job) => {
    const copy = {
      ...job,
      id: Date.now(),
      title: `${job.title} (cópia)`,
      status: 'Pausada' as const,
      openedAt: '2026-05-26',
    }
    setJobs((current) => [copy, ...current])
  }

  const addJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newJob: Job = {
      id: Date.now(),
      title: String(form.get('title')),
      sector: String(form.get('sector')),
      city: String(form.get('city')),
      location: 'A definir',
      contract: String(form.get('contract')),
      quantity: Number(form.get('quantity')),
      salary: String(form.get('salary')),
      benefits: String(form.get('benefits')),
      schedule: 'Horário comercial',
      modality: String(form.get('modality')),
      weeklyHours: String(form.get('weeklyHours')),
      complementaryInfo: String(form.get('complementaryInfo')),
      acceptedCities: String(form.get('acceptedCities')),
      description: String(form.get('description')),
      required: String(form.get('required')).split(',').map((item) => item.trim()),
      desired: ['Disponibilidade', 'Boa comunicação'],
      customQuestions: String(form.get('customQuestions')).split(',').map((item) => item.trim()).filter(Boolean),
      owner: String(form.get('owner')),
      status: 'Aberta',
      openedAt: '2026-05-26',
      closesAt: String(form.get('closesAt')),
    }
    setJobs((current) => [newJob, ...current])
    event.currentTarget.reset()
  }

  const addCandidate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const getText = (key: string, fallback = '') => {
      const value = form.get(key)
      return typeof value === 'string' && value.trim() ? value : fallback
    }
    const getFileName = (key: string) => {
      const value = form.get(key)
      return value instanceof File && value.name ? value.name : ''
    }
    const parseList = <T,>(key: string): T[] => {
      try {
        const raw = getText(key, '[]')
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    const customAnswers = selectedJob.customQuestions.reduce<Record<string, string>>((answers, question) => {
      answers[question] = getText(`question-${question}`, 'Não informado')
      return answers
    }, {})
    const now = new Date()
    const newCandidate: Candidate = {
      id: Date.now(),
      name: getText('name', 'Candidato em revisão'),
      cpf: getText('cpf', 'Não informado'),
      city: getText('candidateCity', selectedJob.city),
      phone: getText('phone', 'Não informado'),
      whatsapp: getText('whatsapp', '5500000000000'),
      email: getText('email', 'nao-informado@cipolatti.local'),
      genderIdentity: getText('genderIdentity'),
      birthDate: getText('birthDate'),
      linkedin: getText('linkedin'),
      address: getText('fullAddress') || `${getText('street')} ${getText('number')} - ${getText('neighborhood')} - ${getText('candidateCity')}/${getText('state')}`,
      education: getText('education', 'Formação a revisar'),
      experience: getText('experience', 'Experiência a revisar'),
      formations: parseList<AcademicFormation>('formationsJson'),
      courses: parseList<CertificationCourse>('coursesJson'),
      experiences: parseList<ProfessionalExperience>('experiencesJson'),
      languages: parseList<LanguageRecord>('languagesJson'),
      skills: parseList<SkillRecord>('skillsJson'),
      resumeFile: getFileName('resumeFile') || 'Currículo automático gerado pelo sistema',
      photoFile: getFileName('photoFile'),
      customAnswers,
      desiredSalary: getText('desiredSalary', 'A combinar'),
      jobId: selectedJob.id,
      status: 'Interessado',
      score: Math.min(98, 62 + selectedJob.required.length * 8),
      tags: [selectedJob.sector, selectedJob.title],
      notes: 'Candidatura recebida pelo portal público. Consentimento LGPD registrado.',
      appliedAt: now.toISOString().slice(0, 10),
      history: [
        {
          id: Date.now(),
          date: now.toLocaleDateString('pt-BR'),
          time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          user: 'Portal público',
          from: 'Cadastro',
          to: 'Interessado',
          observation: 'Candidatura recebida pelo site.',
        },
      ],
    }
    setCandidates((current) => [newCandidate, ...current])
    setApplicationSent(true)
    setApplicationStep(0)
    setPublicView('home')
    event.currentTarget.reset()
  }

  const openJobDetails = (job: Job) => {
    setSelectedJob(job)
    setPublicView('details')
    setApplicationSent(false)
    window.setTimeout(() => document.querySelector('#vaga-detalhes')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  const openApplication = () => {
    setPublicView('application')
    setApplicationStep(0)
    window.setTimeout(() => document.querySelector('#formulario-candidato')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  const exportApproved = async () => {
    const rows = candidates
      .filter((candidate) => ['Aprovado', 'Contratado', 'Aprovável'].includes(candidate.status))
      .map((candidate) => {
        const job = jobs.find((item) => item.id === candidate.jobId)
        return [
          candidate.name,
          candidate.cpf,
          '',
          candidate.phone,
          candidate.whatsapp,
          candidate.email,
          '',
          candidate.city,
          candidate.education,
          candidate.experience,
          job?.title ?? 'Banco de talentos',
          candidate.appliedAt,
          candidate.approvedAt ?? '',
          candidate.notes,
          job?.owner ?? 'RH',
        ]
      })

    const buffer = await createXlsx([
      [
        'Nome',
        'CPF',
        'RG',
        'Telefone',
        'WhatsApp',
        'E-mail',
        'Endereço',
        'Cidade',
        'Escolaridade',
        'Experiência',
        'Vaga',
        'Data candidatura',
        'Data aprovação',
        'Observações RH',
        'Responsável aprovação',
      ],
      ...rows,
    ])
    downloadXlsx(buffer, 'cipolatti-aprovados.xlsx')
  }

  const submitFormerEvaluation = (cpf: string, answers: Record<string, string>) => {
    const answeredAt = new Date().toLocaleString('pt-BR')
    setFormerResponses((current) => [
      ...current,
      { id: Date.now(), cpf, answeredAt, ip: 'Registrado pelo servidor em produção', answers },
    ])
    setFormerReleases((current) =>
      current.map((release) =>
        normalizeCpf(release.cpf) === normalizeCpf(cpf)
          ? { ...release, status: 'respondido', answeredAt }
          : release,
      ),
    )
  }

  if (isAdminRoute) {
    return (
      <main>
        <AdminAccessHeader />
        {adminAuthorized ? (
          <section className="admin" id="admin">
            <div className="admin-top">
              <div>
                <span className="eyebrow">Painel Administrativo RH</span>
                <h2>Controle completo do recrutamento</h2>
              </div>
              <button className="export-button" onClick={exportApproved}>
                <Download size={18} /> Exportar Aprovados para Excel
              </button>
            </div>

            <nav className="tabs">
              {['Dashboard', 'Vagas', 'Candidatos', 'Funil', 'Entrevistas', 'Aprovados', 'Reprovados', 'Avaliações', 'Desligamentos', 'Avaliações de Ex-Colaboradores', 'Permissões'].map((tab) => (
                <button className={activeTab === tab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </nav>

            {activeTab === 'Dashboard' && <Dashboard dashboard={dashboard} candidates={candidates} />}
            {activeTab === 'Vagas' && <JobsAdmin jobs={jobs} setJobs={setJobs} addJob={addJob} duplicateJob={duplicateJob} />}
            {activeTab === 'Candidatos' && (
              <CandidatesTable
                candidates={candidates}
                jobs={jobs}
                moveCandidate={requestCandidateStatus}
                onViewCandidate={setSelectedCandidate}
                onExportCandidates={exportCandidatesExcel}
              />
            )}
            {activeTab === 'Funil' && <Kanban candidates={candidates} jobs={jobs} moveCandidate={requestCandidateStatus} />}
            {activeTab === 'Entrevistas' && (
              <Interviews
                candidates={candidates}
                jobs={jobs}
                onViewCandidate={setSelectedCandidate}
                moveCandidate={requestCandidateStatus}
              />
            )}
            {activeTab === 'Aprovados' && (
              <ApprovedCandidates
                candidates={candidates}
                jobs={jobs}
                onViewCandidate={setSelectedCandidate}
                onExportCandidates={exportCandidatesExcel}
              />
            )}
            {activeTab === 'Reprovados' && (
              <RejectedCandidates
                candidates={candidates}
                jobs={jobs}
                onViewCandidate={setSelectedCandidate}
              />
            )}
            {activeTab === 'Avaliações' && <FormsModule />}
            {activeTab === 'Desligamentos' && <DismissalModule />}
            {activeTab === 'Avaliações de Ex-Colaboradores' && (
              <FormerEmployeesEvaluation
                questions={formerQuestions}
                setQuestions={setFormerQuestions}
                releases={formerReleases}
                setReleases={setFormerReleases}
                responses={formerResponses}
              />
            )}
            {activeTab === 'Permissões' && <Permissions />}
            {selectedCandidate && (
              <CandidateDetailModal
                candidate={selectedCandidate}
                job={jobs.find((job) => job.id === selectedCandidate.jobId)}
                onClose={() => setSelectedCandidate(null)}
              />
            )}
            {pendingInterview && (
              <InterviewScheduleModal
                candidate={candidates.find((candidate) => candidate.id === pendingInterview.candidateId)}
                status={pendingInterview.status}
                onCancel={() => setPendingInterview(null)}
                onSave={(schedule) => {
                  applyCandidateStatus(pendingInterview.candidateId, pendingInterview.status, 'Entrevista agendada pelo painel RH.', { interview: schedule })
                  setPendingInterview(null)
                }}
              />
            )}
            {pendingRejection && (
              <RejectionModal
                candidate={candidates.find((candidate) => candidate.id === pendingRejection.candidateId)}
                onCancel={() => setPendingRejection(null)}
                onSave={(reason, notes) => {
                  applyCandidateStatus(pendingRejection.candidateId, 'Reprovado', notes, { reason })
                  setPendingRejection(null)
                }}
              />
            )}
          </section>
        ) : (
          <AdminLogin onLogin={() => setAdminAuthorized(true)} />
        )}
      </main>
    )
  }

  if (isEvaluationRoute) {
    return (
      <main>
        <Header />
        <PublicFormerEvaluation
          questions={formerQuestions}
          releases={formerReleases}
          onSubmitEvaluation={submitFormerEvaluation}
        />
        <SiteFooter />
      </main>
    )
  }

  if (isAboutRoute) {
    return (
      <main>
        <Header />
        <AboutCipolattiPage />
        <SiteFooter />
      </main>
    )
  }

  if (isJobsRoute) {
    return (
      <main>
        <Header />
        <PublicJobsSection
          jobs={jobs}
          filteredJobs={filteredJobs}
          query={query}
          city={city}
          sector={sector}
          setQuery={setQuery}
          setCity={setCity}
          setSector={setSector}
          openJobDetails={openJobDetails}
        />
        {publicView === 'details' && (
          <section className="job-detail details-only" id="vaga-detalhes">
            <JobDetailCard selectedJob={selectedJob} onApply={openApplication} />
          </section>
        )}
        {publicView === 'application' && (
          <section className="job-detail application-only" id="formulario-candidato">
            <JobDetailSummary selectedJob={selectedJob} />
            <ApplicationWizard
              selectedJob={selectedJob}
              applicationSent={applicationSent}
              applicationStep={applicationStep}
              setApplicationStep={setApplicationStep}
              addCandidate={addCandidate}
            />
          </section>
        )}
        <SiteFooter />
      </main>
    )
  }

  return (
    <main>
      <Header />
      <Hero />
      <section className="values-shell" id="sobre">
        {valueItems.map(([title, text, ValueIcon]) => {
          return (
            <article className="value-card" key={String(title)}>
              <ValueIcon size={34} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          )
        })}
      </section>

      <PublicJobsSection
        jobs={jobs}
        filteredJobs={filteredJobs}
        query={query}
        city={city}
        sector={sector}
        setQuery={setQuery}
        setCity={setCity}
        setSector={setSector}
        openJobDetails={openJobDetails}
      />

      {publicView === 'details' && (
        <section className="job-detail details-only" id="vaga-detalhes">
          <JobDetailCard selectedJob={selectedJob} onApply={openApplication} />
        </section>
      )}

      {publicView === 'application' && (
        <section className="job-detail application-only" id="formulario-candidato">
          <JobDetailSummary selectedJob={selectedJob} />
          <ApplicationWizard
            selectedJob={selectedJob}
            applicationSent={applicationSent}
            applicationStep={applicationStep}
            setApplicationStep={setApplicationStep}
            addCandidate={addCandidate}
          />
        </section>
      )}

      <SiteFooter />
    </main>
  )
}

async function createXlsx(rows: string[][]) {
  const { zipSync, strToU8 } = await import('fflate')
  const files: Record<string, Uint8Array> = {
    '[Content_Types].xml': strToU8(`<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`),
    '_rels/.rels': strToU8(`<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`),
    'xl/workbook.xml': strToU8(`<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Aprovados" sheetId="1" r:id="rId1"/></sheets>
</workbook>`),
    'xl/_rels/workbook.xml.rels': strToU8(`<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`),
    'xl/worksheets/sheet1.xml': strToU8(buildSheetXml(rows)),
  }
  return zipSync(files)
}

function downloadXlsx(buffer: Uint8Array, filename: string) {
  const blobBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer
  const url = URL.createObjectURL(
    new Blob([blobBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
  )
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function buildSheetXml(rows: string[][]) {
  const sheetRows = rows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, columnIndex) => {
          const ref = `${columnName(columnIndex + 1)}${rowIndex + 1}`
          return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`
        })
        .join('')
      return `<row r="${rowIndex + 1}">${cells}</row>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetData>${sheetRows}</sheetData>
</worksheet>`
}

function columnName(index: number) {
  let name = ''
  while (index > 0) {
    const remainder = (index - 1) % 26
    name = String.fromCharCode(65 + remainder) + name
    index = Math.floor((index - 1) / 26)
  }
  return name
}

function escapeXml(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function normalizeCpf(cpf: string) {
  return cpf.replace(/\D/g, '')
}

function isReleaseExpired(release: FormerRelease) {
  return release.validUntil ? new Date(`${release.validUntil}T23:59:59`) < new Date() : false
}

function JobDetailCard({ selectedJob, onApply }: { selectedJob: Job; onApply: () => void }) {
  const shareText = encodeURIComponent(`Confira esta vaga da CIPOLATTI: ${selectedJob.title}`)

  return (
    <article className="job-detail-card">
      <div className="job-detail-hero">
        <span className="eyebrow">Detalhes da vaga</span>
        <h2>{selectedJob.title}</h2>
        <a href={`https://wa.me/?text=${shareText}`} target="_blank">
          <MessageCircle size={18} /> Compartilhe esta vaga
        </a>
      </div>

      <div className="job-info-grid">
        <InfoBlock label="Localidade e modalidade" value={`${selectedJob.city} · ${selectedJob.modality}`} />
        <InfoBlock label="Carga horária semanal" value={selectedJob.weeklyHours} />
        <InfoBlock label="Regime de contratação" value={selectedJob.contract} />
        <InfoBlock label="Número de vagas em aberto" value={`${selectedJob.quantity} vaga(s)`} />
      </div>

      <section>
        <h3>Descrição da vaga</h3>
        <p>{selectedJob.description}</p>
      </section>
      <section>
        <h3>Benefícios</h3>
        <p>{selectedJob.benefits}</p>
      </section>
      <section>
        <h3>Informações complementares</h3>
        <p>{selectedJob.complementaryInfo}</p>
      </section>
      <section>
        <h3>Cidades aceitas para residência</h3>
        <p>{selectedJob.acceptedCities}</p>
      </section>
      <section>
        <h3>Requisitos obrigatórios</h3>
        <ul>{selectedJob.required.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section>
        <h3>Perguntas inteligentes sugeridas</h3>
        <SmartQuestions sector={selectedJob.sector} />
      </section>
      <button className="apply-button" onClick={onApply}>Candidatar-se</button>
    </article>
  )
}

function JobDetailSummary({ selectedJob }: { selectedJob: Job }) {
  return (
    <article className="job-detail-card summary-card">
      <span className="eyebrow">Candidatura vinculada à vaga</span>
      <h2>{selectedJob.title}</h2>
      <div className="detail-list">
        <span>{selectedJob.city}</span>
        <span>{selectedJob.modality}</span>
        <span>{selectedJob.contract}</span>
      </div>
      <p>{selectedJob.description}</p>
    </article>
  )
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-block">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}

function PublicJobsSection({
  jobs,
  filteredJobs,
  query,
  city,
  sector,
  setQuery,
  setCity,
  setSector,
  openJobDetails,
}: {
  jobs: Job[]
  filteredJobs: Job[]
  query: string
  city: string
  sector: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setCity: React.Dispatch<React.SetStateAction<string>>
  setSector: React.Dispatch<React.SetStateAction<string>>
  openJobDetails: (job: Job) => void
}) {
  return (
    <section className="public-jobs" id="vagas">
      <div className="section-heading">
        <span>Portal do candidato</span>
        <h2>Vagas disponíveis</h2>
      </div>
      <div className="job-search">
        <label>
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por cargo ou palavra-chave"
          />
        </label>
        <select value={city} onChange={(event) => setCity(event.target.value)}>
          <option>Todas</option>
          {[...new Set(jobs.map((job) => job.city))].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sector} onChange={(event) => setSector(event.target.value)}>
          <option>Todos</option>
          {[...new Set(jobs.map((job) => job.sector))].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button>Buscar vagas</button>
      </div>
      <div className="job-grid">
        {filteredJobs.map((job) => (
          <button
            className="job-card"
            key={job.id}
            onClick={() => openJobDetails(job)}
          >
            <span className="round-icon"><BriefcaseBusiness size={22} /></span>
            <strong>{job.title}</strong>
            <small>{job.sector}</small>
            <p>{job.city}</p>
            <b>Ver detalhes</b>
          </button>
        ))}
      </div>
    </section>
  )
}

function AboutCipolattiPage() {
  const works = [
    'Decoração natalina para shoppings e centros comerciais',
    'Árvores monumentais, arcos luminosos e cenários instagramáveis',
    'Projetos personalizados para cidades, empresas e eventos',
    'Montagem, operação, manutenção e retirada com equipe especializada',
  ]

  return (
    <section className="about-page">
      <div className="about-hero">
        <div>
          <span className="eyebrow">Sobre a Cipolatti</span>
          <h1>Experiência em decoração natalina que transforma espaços em memória.</h1>
          <p>
            A CIPOLATTI cria projetos natalinos que encantam, conectam pessoas e valorizam ambientes.
            Unimos criatividade, execução técnica e cuidado nos detalhes para entregar experiências
            marcantes em shoppings, empresas, cidades e eventos.
          </p>
          <a href="/vagas">Ver vagas disponíveis</a>
        </div>
        <img src="/hero-natal-cipolatti.png" alt="Decoração natalina assinada pela CIPOLATTI" />
      </div>

      <div className="about-section">
        <span className="eyebrow">História</span>
        <h2>História da CIPOLATTI</h2>
        <p>
          Ao longo dos anos, a CIPOLATTI se consolidou como referência em decoração natalina,
          desenvolvendo ambientes que unem beleza, segurança, inovação e impacto visual. Cada
          projeto nasce para contar uma história e criar momentos inesquecíveis para o público.
        </p>
      </div>

      <div className="about-gallery">
        <img src="/hero-natal-cipolatti.png" alt="Arco natalino iluminado" />
        <img src="/icone-cipo.png" alt="Símbolo natalino CIPOLATTI" />
        <img src="/hero-natal-cipolatti.png" alt="Árvores e luzes natalinas" />
      </div>

      <div className="about-grid">
        {[
          ['Missão', 'Criar soluções em decoração que transformam ambientes e geram experiências inesquecíveis.'],
          ['Visão', 'Ser referência nacional em decoração natalina pela excelência, inovação e sustentabilidade.'],
          ['Valores', 'Encantamento, responsabilidade, segurança, criatividade, parceria e respeito às pessoas.'],
        ].map(([title, text]) => (
          <article className="about-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="about-section split">
        <div>
          <span className="eyebrow">Diferenciais</span>
          <h2>Do conceito à entrega, uma operação completa</h2>
          <p>
            A empresa combina planejamento, design, fabricação, logística e montagem para entregar
            projetos com alto padrão visual e segurança operacional.
          </p>
        </div>
        <ul>
          {works.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  )
}

function ApplicationWizard({
  selectedJob,
  applicationSent,
  applicationStep,
  setApplicationStep,
  addCandidate,
}: {
  selectedJob: Job
  applicationSent: boolean
  applicationStep: number
  setApplicationStep: React.Dispatch<React.SetStateAction<number>>
  addCandidate: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const steps = ['Informações básicas', 'Endereço', 'Formação', 'Experiências', 'Idiomas', 'Habilidades', 'Revisão']
  const [experiences, setExperiences] = useDraftList<ProfessionalExperience>('cipolatti-experiences', [emptyExperience()])
  const [formations, setFormations] = useDraftList<AcademicFormation>('cipolatti-formations', [emptyFormation()])
  const [courses, setCourses] = useDraftList<CertificationCourse>('cipolatti-courses', [emptyCourse()])
  const [languages, setLanguages] = useDraftList<LanguageRecord>('cipolatti-languages', [emptyLanguage()])
  const [skills, setSkills] = useDraftList<SkillRecord>('cipolatti-skills', [emptySkill()])

  const orderedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      const dateA = a.current === 'Sim' ? '9999-12-31' : a.endDate || a.startDate
      const dateB = b.current === 'Sim' ? '9999-12-31' : b.endDate || b.startDate
      return dateB.localeCompare(dateA)
    })
  }, [experiences])

  const educationSummary = [...formations, ...courses]
    .map((item) => 'course' in item ? `${item.type}: ${item.course} - ${item.institution}` : `${item.name} - ${item.institution}`)
    .filter((item) => item.trim() !== ':  -' && item.trim() !== '-')
    .join(' | ')

  const experienceSummary = orderedExperiences
    .map((item) => `${item.company} - ${item.role} (${item.startDate} a ${item.current === 'Sim' ? 'atual' : item.endDate})`)
    .filter((item) => !item.startsWith(' -'))
    .join(' | ')

  return (
    <form className="application-form wizard-form" onSubmit={addCandidate}>
      <h3>Área do Candidato</h3>
      <div className="wizard-steps">
        {steps.map((step, index) => (
          <button
            type="button"
            className={applicationStep === index ? 'active' : ''}
            key={step}
            onClick={() => setApplicationStep(index)}
          >
            {index + 1}. {step}
          </button>
        ))}
      </div>

      {applicationStep === 0 && (
        <div className="form-grid">
          <input name="name" placeholder="Nome completo" required />
          <select name="genderIdentity" required>
            <option value="">Identidade de gênero</option>
            <option>Feminino</option>
            <option>Masculino</option>
            <option>Não informar</option>
            <option>Outro</option>
          </select>
          <input name="birthDate" type="date" placeholder="Data de nascimento" required />
          <input name="phone" placeholder="Telefone com DDD" required />
          <input name="whatsapp" placeholder="WhatsApp" required />
          <input name="email" type="email" placeholder="E-mail" required />
          <input name="cpf" placeholder="CPF" required />
          <input name="desiredSalary" placeholder="Pretensão salarial" />
          <input name="linkedin" placeholder="LinkedIn" />
          <label className="file-field">Foto do perfil<input name="photoFile" type="file" accept="image/*" /></label>
          <label className="file-field">Currículo<input name="resumeFile" type="file" accept=".pdf,.doc,.docx" /></label>
        </div>
      )}

      {applicationStep === 1 && (
        <div className="form-grid">
          <input name="cep" placeholder="CEP" />
          <input name="street" placeholder="Rua" />
          <input name="number" placeholder="Número" />
          <input name="neighborhood" placeholder="Bairro" />
          <input name="candidateCity" placeholder="Cidade" required />
          <input name="state" placeholder="Estado" />
          <textarea name="fullAddress" placeholder="Endereço completo" />
        </div>
      )}

      {applicationStep === 2 && (
        <div className="dynamic-step">
          <DynamicFormationList formations={formations} setFormations={setFormations} />
          <DynamicCourseList courses={courses} setCourses={setCourses} />
        </div>
      )}

      {applicationStep === 3 && (
        <DynamicExperienceList experiences={orderedExperiences} setExperiences={setExperiences} />
      )}

      {applicationStep === 4 && (
        <DynamicLanguageList languages={languages} setLanguages={setLanguages} />
      )}

      {applicationStep === 5 && (
        <div className="form-grid one-column">
          <DynamicSkillList skills={skills} setSkills={setSkills} />
          <h4>Perguntas personalizadas da vaga</h4>
          <div className="custom-question-list">
            {selectedJob.customQuestions.map((question) => (
              <label key={question}>
                {question}
                <select name={`question-${question}`}>
                  <option>Sim</option>
                  <option>Não</option>
                </select>
              </label>
            ))}
          </div>
        </div>
      )}

      {applicationStep === 6 && (
        <div className="review-box">
          <h4>Revisão final antes de enviar</h4>
          <p>Confira seus dados, currículo, endereço, formação, experiências, idiomas, habilidades e respostas personalizadas da vaga.</p>
          <div className="review-summary">
            <strong>Formações cadastradas: {formations.length}</strong>
            <strong>Cursos/certificações: {courses.length}</strong>
            <strong>Experiências profissionais: {experiences.length}</strong>
            <strong>Idiomas: {languages.length}</strong>
            <strong>Habilidades: {skills.length}</strong>
          </div>
          <input type="hidden" name="education" value={educationSummary || 'Formação a revisar'} />
          <input type="hidden" name="experience" value={experienceSummary || 'Experiência a revisar'} />
          <input type="hidden" name="languages" value={languages.map((item) => item.language).join(', ')} />
          <input type="hidden" name="skills" value={skills.map((item) => item.name).join(', ')} />
          <input type="hidden" name="formationsJson" value={JSON.stringify(formations)} />
          <input type="hidden" name="coursesJson" value={JSON.stringify(courses)} />
          <input type="hidden" name="experiencesJson" value={JSON.stringify(experiences)} />
          <input type="hidden" name="languagesJson" value={JSON.stringify(languages)} />
          <input type="hidden" name="skillsJson" value={JSON.stringify(skills)} />
          <label className="check-line">
            <input type="checkbox" required /> Aceito o tratamento dos meus dados conforme a LGPD e a política de privacidade.
          </label>
          <button type="submit">Enviar candidatura</button>
          {applicationSent && <p className="success">Candidatura registrada. Se não houver currículo, o sistema gera um modelo padronizado com os dados preenchidos.</p>}
        </div>
      )}

      <div className="wizard-actions">
        <button type="button" disabled={applicationStep === 0} onClick={() => setApplicationStep((step) => Math.max(0, step - 1))}>
          Voltar
        </button>
        <button type="button" disabled={applicationStep === steps.length - 1} onClick={() => setApplicationStep((step) => Math.min(steps.length - 1, step + 1))}>
          Próxima etapa
        </button>
      </div>
    </form>
  )
}

function PublicFormerEvaluation({
  questions,
  releases,
  onSubmitEvaluation,
}: {
  questions: FormerQuestion[]
  releases: FormerRelease[]
  onSubmitEvaluation: (cpf: string, answers: Record<string, string>) => void
}) {
  const [cpf, setCpf] = useState('')
  const [checkedCpf, setCheckedCpf] = useState('')
  const [message, setMessage] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const release = releases.find((item) => normalizeCpf(item.cpf) === normalizeCpf(checkedCpf))
  const canAnswer = release?.status === 'liberado' && !isReleaseExpired(release)

  const validateCpf = () => {
    const found = releases.find((item) => normalizeCpf(item.cpf) === normalizeCpf(cpf))
    setCheckedCpf(cpf)
    setAnswers({})

    if (!found) {
      setMessage('CPF não autorizado para avaliação.')
      return
    }
    if (found.status === 'respondido') {
      setMessage('Avaliação já respondida.')
      return
    }
    if (found.status === 'bloqueado') {
      setMessage('CPF não autorizado para avaliação.')
      return
    }
    if (found.status === 'expirado' || isReleaseExpired(found)) {
      setMessage('Prazo para avaliação expirado.')
      return
    }
    setMessage('')
  }

  const submitEvaluation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canAnswer || !release) {
      return
    }
    onSubmitEvaluation(release.cpf, answers)
    setMessage('Avaliação enviada com sucesso. Obrigado pela participação.')
  }

  return (
    <section className="public-evaluation-page">
      <div className="evaluation-banner">
        <img src="/hero-natal-cipolatti.png" alt="Decoração natalina Cipolatti" />
      </div>
      <div className="evaluation-gate-card">
        <span className="eyebrow">Ex-colaboradores</span>
        <h1>Faça sua Avaliação</h1>
        <p>Esta área é exclusiva para ex-colaboradores autorizados pelo RH avaliarem a experiência que tiveram na empresa.</p>
        <a className="back-home-link" href="/">Voltar para Home</a>
      </div>
      <div className="cpf-gate">
        <input value={cpf} onChange={(event) => setCpf(event.target.value)} placeholder="Informe seu CPF" />
        <button type="button" onClick={validateCpf}>Entrar para avaliar</button>
      </div>
      {message && <div className={message.includes('sucesso') ? 'access-result allowed' : 'access-result denied'}>{message}</div>}
      {canAnswer && (
        <form className="former-public-form public-form" onSubmit={submitEvaluation}>
          <div className="former-release-summary">
            <strong>{release.name}</strong>
            <span>{release.sector} · {release.role} · validade até {release.validUntil}</span>
          </div>
          <div className="former-answer-grid">
            {questions.map((question) => (
              <label key={question.id}>
                {question.text}{question.required ? ' *' : ''}
                <FormerQuestionInput
                  question={question}
                  value={answers[String(question.id)] ?? ''}
                  onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))}
                />
              </label>
            ))}
          </div>
          <button className="export-button" type="submit">Enviar avaliação</button>
        </form>
      )}
    </section>
  )
}

function FormerQuestionInput({
  question,
  value,
  onChange,
}: {
  question: FormerQuestion
  value: string
  onChange: (value: string) => void
}) {
  if (question.type === 'Sim/Não') {
    return <select required={question.required} value={value} onChange={(event) => onChange(event.target.value)}><option value="">Selecione</option><option>Sim</option><option>Não</option></select>
  }
  if (question.type === 'Nota 1 a 5') {
    return <input required={question.required} type="number" min="1" max="5" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Nota de 1 a 5" />
  }
  if (question.type === 'Nota 1 a 10') {
    return <input required={question.required} type="number" min="1" max="10" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Nota de 1 a 10" />
  }
  if (question.type === 'Múltipla escolha') {
    return (
      <select required={question.required} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Selecione</option>
        {(question.options ?? []).map((option) => <option key={option}>{option}</option>)}
      </select>
    )
  }
  if (question.type === 'Texto longo') {
    return <textarea required={question.required} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Resposta longa" />
  }
  return <input required={question.required} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Resposta curta" />
}

function useDraftList<T>(key: string, initialValue: T[]) {
  const [items, setItems] = useState<T[]>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) as T[] : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items))
  }, [items, key])

  return [items, setItems] as const
}

function emptyExperience(): ProfessionalExperience {
  return { id: Date.now(), company: '', role: '', startDate: '', endDate: '', current: 'Não', activities: '', exitReason: '' }
}

function emptyFormation(): AcademicFormation {
  return { id: Date.now(), type: 'Ensino Médio', course: '', institution: '', startDate: '', endDate: '', inProgress: 'Não' }
}

function emptyCourse(): CertificationCourse {
  return { id: Date.now(), name: '', institution: '', workload: '', completionDate: '', validity: '' }
}

function emptyLanguage(): LanguageRecord {
  return { id: Date.now(), language: '', reading: 'Básico', writing: 'Básico', speaking: 'Básico' }
}

function emptySkill(): SkillRecord {
  return { id: Date.now(), name: '' }
}

function DynamicExperienceList({
  experiences,
  setExperiences,
}: {
  experiences: ProfessionalExperience[]
  setExperiences: React.Dispatch<React.SetStateAction<ProfessionalExperience[]>>
}) {
  const update = (id: number, patch: Partial<ProfessionalExperience>) => {
    setExperiences((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }

  return (
    <section className="dynamic-list">
      <div className="dynamic-title">
        <h4>Experiências profissionais</h4>
        <button type="button" onClick={() => setExperiences((current) => [...current, { ...emptyExperience(), id: Date.now() }])}>
          + Adicionar Experiência
        </button>
      </div>
      {experiences.map((experience, index) => (
        <article className="dynamic-record" key={experience.id}>
          <div className="record-head">
            <strong>Experiência {index + 1}</strong>
            <div>
              <button type="button">Editar</button>
              <button type="button" onClick={() => setExperiences((current) => current.filter((item) => item.id !== experience.id))}>Remover</button>
            </div>
          </div>
          <div className="form-grid">
            <input value={experience.company} onChange={(event) => update(experience.id, { company: event.target.value })} placeholder="Empresa" />
            <input value={experience.role} onChange={(event) => update(experience.id, { role: event.target.value })} placeholder="Cargo" />
            <input value={experience.startDate} onChange={(event) => update(experience.id, { startDate: event.target.value })} type="date" />
            <input value={experience.endDate} onChange={(event) => update(experience.id, { endDate: event.target.value })} type="date" disabled={experience.current === 'Sim'} />
            <select value={experience.current} onChange={(event) => update(experience.id, { current: event.target.value })}>
              <option>Não</option>
              <option>Sim</option>
            </select>
            <input value={experience.exitReason} onChange={(event) => update(experience.id, { exitReason: event.target.value })} placeholder="Motivo da saída (opcional)" />
            <textarea value={experience.activities} onChange={(event) => update(experience.id, { activities: event.target.value })} placeholder="Principais atividades desenvolvidas" />
          </div>
        </article>
      ))}
    </section>
  )
}

function DynamicFormationList({
  formations,
  setFormations,
}: {
  formations: AcademicFormation[]
  setFormations: React.Dispatch<React.SetStateAction<AcademicFormation[]>>
}) {
  const update = (id: number, patch: Partial<AcademicFormation>) => {
    setFormations((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }

  return (
    <section className="dynamic-list">
      <div className="dynamic-title">
        <h4>Formação acadêmica</h4>
        <button type="button" onClick={() => setFormations((current) => [...current, { ...emptyFormation(), id: Date.now() }])}>
          + Adicionar Formação
        </button>
      </div>
      {formations.map((formation, index) => (
        <article className="dynamic-record" key={formation.id}>
          <div className="record-head">
            <strong>Formação {index + 1}</strong>
            <div>
              <button type="button">Editar</button>
              <button type="button" onClick={() => setFormations((current) => current.filter((item) => item.id !== formation.id))}>Remover</button>
            </div>
          </div>
          <div className="form-grid">
            <select value={formation.type} onChange={(event) => update(formation.id, { type: event.target.value })}>
              {['Ensino Fundamental', 'Ensino Médio', 'Técnico', 'Graduação', 'Pós-graduação', 'MBA', 'Mestrado', 'Doutorado', 'Curso Livre'].map((option) => <option key={option}>{option}</option>)}
            </select>
            <input value={formation.course} onChange={(event) => update(formation.id, { course: event.target.value })} placeholder="Nome do curso" />
            <input value={formation.institution} onChange={(event) => update(formation.id, { institution: event.target.value })} placeholder="Instituição" />
            <input value={formation.startDate} onChange={(event) => update(formation.id, { startDate: event.target.value })} type="date" />
            <input value={formation.endDate} onChange={(event) => update(formation.id, { endDate: event.target.value })} type="date" disabled={formation.inProgress === 'Sim'} />
            <select value={formation.inProgress} onChange={(event) => update(formation.id, { inProgress: event.target.value })}>
              <option>Não</option>
              <option>Sim</option>
            </select>
            <label className="file-field">Certificado opcional<input type="file" /></label>
          </div>
        </article>
      ))}
    </section>
  )
}

function DynamicCourseList({
  courses,
  setCourses,
}: {
  courses: CertificationCourse[]
  setCourses: React.Dispatch<React.SetStateAction<CertificationCourse[]>>
}) {
  const update = (id: number, patch: Partial<CertificationCourse>) => {
    setCourses((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }

  return (
    <section className="dynamic-list">
      <div className="dynamic-title">
        <h4>Cursos e certificações</h4>
        <button type="button" onClick={() => setCourses((current) => [...current, { ...emptyCourse(), id: Date.now() }])}>
          + Adicionar Curso/Certificação
        </button>
      </div>
      {courses.map((course) => (
        <article className="dynamic-record" key={course.id}>
          <div className="record-head">
            <strong>{course.name || 'Novo curso/certificação'}</strong>
            <div>
              <button type="button">Editar</button>
              <button type="button" onClick={() => setCourses((current) => current.filter((item) => item.id !== course.id))}>Remover</button>
            </div>
          </div>
          <div className="form-grid">
            <input value={course.name} onChange={(event) => update(course.id, { name: event.target.value })} placeholder="Nome do curso. Ex: NR10, Excel Avançado, AutoCAD" />
            <input value={course.institution} onChange={(event) => update(course.id, { institution: event.target.value })} placeholder="Instituição" />
            <input value={course.workload} onChange={(event) => update(course.id, { workload: event.target.value })} placeholder="Carga horária" />
            <input value={course.completionDate} onChange={(event) => update(course.id, { completionDate: event.target.value })} type="date" />
            <input value={course.validity} onChange={(event) => update(course.id, { validity: event.target.value })} placeholder="Validade (se houver)" />
            <label className="file-field">Upload do certificado<input type="file" /></label>
          </div>
        </article>
      ))}
    </section>
  )
}

function DynamicLanguageList({
  languages,
  setLanguages,
}: {
  languages: LanguageRecord[]
  setLanguages: React.Dispatch<React.SetStateAction<LanguageRecord[]>>
}) {
  const update = (id: number, patch: Partial<LanguageRecord>) => {
    setLanguages((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }
  const levels = ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo']

  return (
    <section className="dynamic-list">
      <div className="dynamic-title">
        <h4>Idiomas</h4>
        <button type="button" onClick={() => setLanguages((current) => [...current, { ...emptyLanguage(), id: Date.now() }])}>
          + Adicionar Idioma
        </button>
      </div>
      {languages.map((language) => (
        <article className="dynamic-record" key={language.id}>
          <div className="record-head">
            <strong>{language.language || 'Novo idioma'}</strong>
            <div>
              <button type="button">Editar</button>
              <button type="button" onClick={() => setLanguages((current) => current.filter((item) => item.id !== language.id))}>Remover</button>
            </div>
          </div>
          <div className="form-grid">
            <input value={language.language} onChange={(event) => update(language.id, { language: event.target.value })} placeholder="Idioma" />
            <select value={language.reading} onChange={(event) => update(language.id, { reading: event.target.value })}>{levels.map((level) => <option key={level}>{level}</option>)}</select>
            <select value={language.writing} onChange={(event) => update(language.id, { writing: event.target.value })}>{levels.map((level) => <option key={level}>{level}</option>)}</select>
            <select value={language.speaking} onChange={(event) => update(language.id, { speaking: event.target.value })}>{levels.map((level) => <option key={level}>{level}</option>)}</select>
          </div>
        </article>
      ))}
    </section>
  )
}

function DynamicSkillList({
  skills,
  setSkills,
}: {
  skills: SkillRecord[]
  setSkills: React.Dispatch<React.SetStateAction<SkillRecord[]>>
}) {
  const update = (id: number, patch: Partial<SkillRecord>) => {
    setSkills((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }

  return (
    <section className="dynamic-list">
      <div className="dynamic-title">
        <h4>Habilidades</h4>
        <button type="button" onClick={() => setSkills((current) => [...current, { ...emptySkill(), id: Date.now() }])}>
          + Adicionar Habilidade
        </button>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-record" key={skill.id}>
            <input value={skill.name} onChange={(event) => update(skill.id, { name: event.target.value })} placeholder="Excel, Power BI, SAP, Liderança..." />
            <button type="button">Editar</button>
            <button type="button" onClick={() => setSkills((current) => current.filter((item) => item.id !== skill.id))}>Remover</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={menuOpen ? 'site-header menu-open' : 'site-header'}>
      <a className="brand" href="/">
        <img src="/icone-cipo.png" alt="CIPOLATTI" />
        <span>
          CIPOLATTI
          <small>Recursos Humanos</small>
        </span>
      </a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menu">
        <span />
        <span />
        <span />
      </button>
      <nav>
        <a href="/">Home</a>
        <a href="/sobre-a-cipolatti">Sobre a Cipolatti</a>
        <a href="/vagas">Vagas</a>
        <a href="/faca-sua-avaliacao">Faça sua avaliação</a>
      </nav>
      <a className="candidate-area" href="/vagas"><UserCheck size={17} /> Área do Candidato</a>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer>
      <img src="/icone-cipo.png" alt="Ícone CIPOLATTI" />
      <span>CIPOLATTI RH</span>
      <a href="/">Home</a>
      <a href="/sobre-a-cipolatti">Sobre a Cipolatti</a>
      <a href="/vagas">Vagas</a>
      <a href="/vagas">Área do Candidato</a>
      <a href="/faca-sua-avaliacao">Faça sua avaliação</a>
    </footer>
  )
}

function AdminAccessHeader() {
  return (
    <header className="site-header admin-access-header">
      <a className="brand" href="/">
        <img src="/icone-cipo.png" alt="CIPOLATTI" />
        <span>
          CIPOLATTI
          <small>Painel restrito</small>
        </span>
      </a>
      <a className="candidate-area" href="/">Voltar ao site público</a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <span><Sparkles size={18} /> Transformamos espaços em experiências</span>
        <h1>
          Transformamos momentos em <em>memórias</em> inesquecíveis.
        </h1>
        <p>
          Na Cipolatti, o Natal ganha vida em cada detalhe. Faça parte de uma equipe
          que transforma ambientes em experiências que emocionam.
        </p>
        <div className="hero-actions">
          <a href="#vagas">Ver vagas abertas</a>
          <a href="#sobre">Conheça a Cipolatti</a>
        </div>
      </div>
      <div className="hero-art">
        <img
          src="/hero-natal-cipolatti.png"
          alt="Decoração natalina em shopping com árvores, luzes e arcos"
        />
        <Star className="star-a" size={58} />
      </div>
    </section>
  )
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState('')

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const user = String(form.get('user')).trim().toLowerCase()
    const password = String(form.get('password')).trim()

    const authorizedUsers = [
      ['admin', 'admin2026'],
      ['rh', 'cipolatti2026'],
    ]

    if (authorizedUsers.some(([login, pass]) => login === user && pass === password)) {
      setError('')
      onLogin()
      return
    }

    setError('Acesso negado. Use um login autorizado do RH.')
  }

  return (
    <section className="admin-login" id="rh-login">
      <form onSubmit={submitLogin}>
        <span className="eyebrow">Acesso restrito</span>
        <h2>Login do Painel RH</h2>
        <p>O painel administrativo fica oculto para usuários públicos e só abre com credenciais autorizadas.</p>
        <input name="user" placeholder="Usuário" autoComplete="username" required />
        <input name="password" type="password" placeholder="Senha" autoComplete="current-password" required />
        <button type="submit">Entrar no Painel RH</button>
        {error && <strong>{error}</strong>}
      </form>
    </section>
  )
}

function SmartQuestions({ sector }: { sector: string }) {
  const questions =
    sector === 'Logística'
      ? ['Categoria CNH', 'Tempo de habilitação', 'Experiência como motorista']
      : sector === 'Administrativo'
        ? ['Conhecimento em Excel', 'Conhecimento em ERP', 'Atendimento ao cliente']
        : ['Experiência na função', 'Disponibilidade de horário', 'Certificações específicas']

  return (
    <div className="question-list">
      {questions.map((question) => (
        <span key={question}>{question}</span>
      ))}
    </div>
  )
}

function Dashboard({ dashboard, candidates }: { dashboard: Record<string, number>; candidates: Candidate[] }) {
  const cards: Array<[string, number, LucideIcon]> = [
    ['Vagas abertas', dashboard.openJobs, BriefcaseBusiness],
    ['Candidatos', dashboard.totalCandidates, Users],
    ['Recebidos hoje', dashboard.todayApplications, FileText],
    ['Entrevistas', dashboard.interviews, CalendarClock],
    ['Aprovados', dashboard.approved, CheckCircle2],
    ['Contratados', dashboard.hired, UserCheck],
    ['Banco talentos', dashboard.talentPool, Star],
  ]
  return (
    <div className="dashboard-grid">
      {cards.map(([label, value, Icon]) => (
        <article className="metric-card" key={String(label)}>
          <Icon size={24} />
          <small>{label}</small>
          <strong>{String(value).padStart(2, '0')}</strong>
        </article>
      ))}
      <article className="chart-card">
        <h3>Indicadores por status</h3>
        {statuses.map((status) => {
          const count = candidates.filter((candidate) => candidate.status === status).length
          return (
            <div className="bar-row" key={status}>
              <span>{status}</span>
              <div><i style={{ width: `${Math.max(8, count * 22)}%` }} /></div>
              <b>{count}</b>
            </div>
          )
        })}
      </article>
    </div>
  )
}

function JobsAdmin({
  jobs,
  setJobs,
  addJob,
  duplicateJob,
}: {
  jobs: Job[]
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>
  addJob: (event: React.FormEvent<HTMLFormElement>) => void
  duplicateJob: (job: Job) => void
}) {
  return (
    <div className="admin-split">
      <form className="panel-form" onSubmit={addJob}>
        <h3>Cadastrar vaga</h3>
        <input name="title" placeholder="Título da vaga" required />
        <input name="sector" placeholder="Setor" required />
        <input name="city" placeholder="Cidade" required />
        <input name="contract" placeholder="Tipo de contrato" required />
        <input name="quantity" type="number" placeholder="Quantidade" required />
        <input name="salary" placeholder="Faixa salarial" required />
        <input name="modality" placeholder="Localidade e modalidade" required />
        <input name="weeklyHours" placeholder="Carga horária semanal" required />
        <input name="acceptedCities" placeholder="Cidades aceitas para residência" required />
        <input name="owner" placeholder="Responsável pela vaga" required />
        <input name="closesAt" type="date" required />
        <textarea name="description" placeholder="Descrição completa da função" required />
        <textarea name="benefits" placeholder="Benefícios" required />
        <textarea name="complementaryInfo" placeholder="Informações complementares" required />
        <textarea name="required" placeholder="Requisitos obrigatórios separados por vírgula" required />
        <textarea name="customQuestions" placeholder="Perguntas personalizadas Sim/Não separadas por vírgula. Ex: Possui CNH?, Aceita trabalhar presencial?" />
        <button type="submit">Cadastrar vaga</button>
      </form>
      <div className="table-card">
        <h3>Gerenciar vagas</h3>
        {jobs.map((job) => (
          <article className="job-admin-row" key={job.id}>
            <div>
              <strong>{job.title}</strong>
              <span>{job.sector} · {job.city} · {job.status}</span>
              <details className="job-edit-details">
                <summary>Editar textos da vaga</summary>
                <input value={job.title} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, title: event.target.value } : item))} />
                <textarea value={job.description} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, description: event.target.value } : item))} />
                <textarea value={job.benefits} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, benefits: event.target.value } : item))} />
                <textarea value={job.complementaryInfo} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, complementaryInfo: event.target.value } : item))} />
                <input value={job.weeklyHours} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, weeklyHours: event.target.value } : item))} />
                <input value={job.contract} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, contract: event.target.value } : item))} />
                <input value={job.modality} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, modality: event.target.value } : item))} />
                <input value={job.acceptedCities} onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, acceptedCities: event.target.value } : item))} />
                <input value={job.quantity} type="number" onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, quantity: Number(event.target.value) } : item))} />
                <textarea
                  value={job.customQuestions.join(', ')}
                  onChange={(event) => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, customQuestions: event.target.value.split(',').map((question) => question.trim()).filter(Boolean) } : item))}
                />
              </details>
            </div>
            <div>
              {(['Aberta', 'Pausada', 'Encerrada', 'Arquivada'] as Job['status'][]).map((status) => (
                <button key={status} onClick={() => setJobs((current) => current.map((item) => item.id === job.id ? { ...item, status } : item))}>
                  {status}
                </button>
              ))}
              <button onClick={() => duplicateJob(job)}>Duplicar</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CandidatesTable({
  candidates,
  jobs,
  moveCandidate,
  onViewCandidate,
  onExportCandidates,
}: {
  candidates: Candidate[]
  jobs: Job[]
  moveCandidate: (candidateId: number, status: Status) => void
  onViewCandidate: (candidate: Candidate) => void
  onExportCandidates: (candidates: Candidate[], filename?: string) => void
}) {
  const [filters, setFilters] = useState({
    name: '',
    cpf: '',
    jobId: 'Todos',
    status: 'Todos',
    date: '',
    startDate: '',
    endDate: '',
    recentOnly: false,
    sector: 'Todos',
    city: '',
    order: 'recentes',
  })

  const filteredCandidates = useMemo(() => {
    const recentLimit = new Date()
    recentLimit.setDate(recentLimit.getDate() - 7)

    return candidates
      .filter((candidate) => {
        const job = jobs.find((item) => item.id === candidate.jobId)
        const applied = new Date(candidate.appliedAt)
        const matchesName = candidate.name.toLowerCase().includes(filters.name.toLowerCase())
        const matchesCpf = candidate.cpf.replace(/\D/g, '').includes(filters.cpf.replace(/\D/g, ''))
        const matchesJob = filters.jobId === 'Todos' || candidate.jobId === Number(filters.jobId)
        const matchesStatus = filters.status === 'Todos' || candidate.status === filters.status
        const matchesDate = !filters.date || candidate.appliedAt === filters.date
        const matchesStart = !filters.startDate || candidate.appliedAt >= filters.startDate
        const matchesEnd = !filters.endDate || candidate.appliedAt <= filters.endDate
        const matchesRecent = !filters.recentOnly || applied >= recentLimit
        const matchesSector = filters.sector === 'Todos' || job?.sector === filters.sector
        const matchesCity = candidate.city.toLowerCase().includes(filters.city.toLowerCase())
        return matchesName && matchesCpf && matchesJob && matchesStatus && matchesDate && matchesStart && matchesEnd && matchesRecent && matchesSector && matchesCity
      })
      .sort((a, b) => {
        if (filters.order === 'antigos') return a.appliedAt.localeCompare(b.appliedAt)
        if (filters.order === 'az') return a.name.localeCompare(b.name)
        if (filters.order === 'za') return b.name.localeCompare(a.name)
        return b.appliedAt.localeCompare(a.appliedAt)
      })
  }, [candidates, filters, jobs])

  const sectors = Array.from(new Set(jobs.map((job) => job.sector)))

  return (
    <div className="table-card">
      <div className="table-title">
        <h3>Filtros avançados e candidatos</h3>
        <button className="export-button small" onClick={() => onExportCandidates(filteredCandidates)}>
          <Download size={16} /> Exportar Excel
        </button>
      </div>
      <div className="candidate-filters">
        <input placeholder="Buscar por nome" value={filters.name} onChange={(event) => setFilters({ ...filters, name: event.target.value })} />
        <input placeholder="Buscar por CPF" value={filters.cpf} onChange={(event) => setFilters({ ...filters, cpf: event.target.value })} />
        <select value={filters.jobId} onChange={(event) => setFilters({ ...filters, jobId: event.target.value })}>
          <option>Todos</option>
          {jobs.map((job) => <option value={job.id} key={job.id}>{job.title}</option>)}
        </select>
        <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
          <option>Todos</option>
          {statuses.map((status) => <option key={status}>{status}</option>)}
        </select>
        <input type="date" value={filters.date} onChange={(event) => setFilters({ ...filters, date: event.target.value })} title="Data da candidatura" />
        <input type="date" value={filters.startDate} onChange={(event) => setFilters({ ...filters, startDate: event.target.value })} title="Início do período" />
        <input type="date" value={filters.endDate} onChange={(event) => setFilters({ ...filters, endDate: event.target.value })} title="Fim do período" />
        <select value={filters.sector} onChange={(event) => setFilters({ ...filters, sector: event.target.value })}>
          <option>Todos</option>
          {sectors.map((sector) => <option key={sector}>{sector}</option>)}
        </select>
        <input placeholder="Filtrar por cidade" value={filters.city} onChange={(event) => setFilters({ ...filters, city: event.target.value })} />
        <select value={filters.order} onChange={(event) => setFilters({ ...filters, order: event.target.value })}>
          <option value="recentes">Mais recentes primeiro</option>
          <option value="antigos">Mais antigos primeiro</option>
          <option value="az">Nome A-Z</option>
          <option value="za">Nome Z-A</option>
        </select>
        <label className="check-line compact">
          <input type="checkbox" checked={filters.recentOnly} onChange={(event) => setFilters({ ...filters, recentOnly: event.target.checked })} />
          Candidatos recentes
        </label>
      </div>
      <div className="candidate-list">
        {filteredCandidates.map((candidate) => {
          const job = jobs.find((item) => item.id === candidate.jobId)
          return (
            <article className="candidate-row" key={candidate.id}>
              <div>
                <strong>{candidate.name}</strong>
                <span>{candidate.cpf} · {candidate.city} · {job?.title ?? 'Banco de talentos'}</span>
                <p>{candidate.notes}</p>
              </div>
              <b>{candidate.score}% aderência</b>
              <select value={candidate.status} onChange={(event) => moveCandidate(candidate.id, event.target.value as Status)}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
              <div className="candidate-actions">
                <button type="button" onClick={() => onViewCandidate(candidate)}>Visualizar</button>
                <button type="button" onClick={() => generateCandidatePdf(candidate, job)}>Gerar PDF</button>
                <a href={`https://wa.me/${candidate.whatsapp}?text=Olá ${candidate.name}, aqui é o RH da CIPOLATTI.`} target="_blank">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Kanban({
  candidates,
  jobs,
  moveCandidate,
}: {
  candidates: Candidate[]
  jobs: Job[]
  moveCandidate: (candidateId: number, status: Status) => void
}) {
  return (
    <div className="kanban">
      {funnelStatuses.map((status) => (
        <section
          className="kanban-column"
          key={status}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => moveCandidate(Number(event.dataTransfer.getData('candidateId')), status)}
        >
          <h3>{status}</h3>
          {candidates.filter((candidate) => candidate.status === status).map((candidate) => (
            <article className="kanban-card" key={candidate.id} draggable onDragStart={(event) => event.dataTransfer.setData('candidateId', String(candidate.id))}>
              <strong>{candidate.name}</strong>
              <span>{jobs.find((job) => job.id === candidate.jobId)?.title ?? 'Banco de talentos'}</span>
              <b>{candidate.score}%</b>
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}

function Interviews({
  candidates,
  jobs,
  onViewCandidate,
  moveCandidate,
}: {
  candidates: Candidate[]
  jobs: Job[]
  onViewCandidate: (candidate: Candidate) => void
  moveCandidate: (candidateId: number, status: Status) => void
}) {
  const [filter, setFilter] = useState('proximas')
  const [jobId, setJobId] = useState('Todos')
  const [date, setDate] = useState('')
  const [interviewer, setInterviewer] = useState('')
  const today = new Date().toISOString().slice(0, 10)
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = tomorrowDate.toISOString().slice(0, 10)
  const weekLimit = new Date()
  weekLimit.setDate(weekLimit.getDate() + 7)
  const week = weekLimit.toISOString().slice(0, 10)
  const scheduled = candidates.filter((candidate) => candidate.interview)
  const filtered = scheduled.filter((candidate) => {
    const interview = candidate.interview
    const matchesJob = jobId === 'Todos' || candidate.jobId === Number(jobId)
    const matchesDate = !date || interview?.date === date
    const matchesInterviewer = !interviewer || interview?.interviewer.toLowerCase().includes(interviewer.toLowerCase())
    const matchesQuick =
      filter === 'hoje' ? interview?.date === today :
      filter === 'amanha' ? interview?.date === tomorrow :
      filter === 'semana' ? Boolean(interview && interview.date >= today && interview.date <= week) :
      filter === 'realizadas' ? interview?.status === 'Realizada' :
      Boolean(interview && interview.date >= today && interview.status !== 'Realizada')
    return matchesJob && matchesDate && matchesInterviewer && matchesQuick
  })

  return (
    <div className="table-card">
      <div className="table-title">
        <h3>Entrevistas agendadas</h3>
        <span><CalendarClock size={16} /> Agenda vinculada ao candidato</span>
      </div>
      <div className="candidate-filters">
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="hoje">Hoje</option>
          <option value="amanha">Amanhã</option>
          <option value="semana">Esta semana</option>
          <option value="proximas">Próximas entrevistas</option>
          <option value="realizadas">Entrevistas realizadas</option>
        </select>
        <select value={jobId} onChange={(event) => setJobId(event.target.value)}>
          <option>Todos</option>
          {jobs.map((job) => <option value={job.id} key={job.id}>{job.title}</option>)}
        </select>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <input placeholder="Entrevistador" value={interviewer} onChange={(event) => setInterviewer(event.target.value)} />
      </div>
      <div className="admin-card-grid">
        {filtered.map((candidate) => {
          const job = jobs.find((item) => item.id === candidate.jobId)
          const interview = candidate.interview as InterviewSchedule
          return (
            <article className="module-card interview-card" key={candidate.id}>
              <CalendarClock size={26} />
              <small>{interview.date} às {interview.time}</small>
              <h3>{candidate.name}</h3>
              <p>{job?.title ?? 'Banco de talentos'} · {interview.type}</p>
              <span>{interview.type === 'Online' ? interview.meetingLink : interview.location} · {interview.interviewer}</span>
              <b>{interview.status}</b>
              <div className="card-actions">
                <button onClick={() => onViewCandidate(candidate)}>Visualizar candidato</button>
                <select value={candidate.status} onChange={(event) => moveCandidate(candidate.id, event.target.value as Status)}>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>
            </article>
          )
        })}
        {!filtered.length && <p className="empty-state">Nenhuma entrevista encontrada para os filtros selecionados.</p>}
      </div>
    </div>
  )
}

function ApprovedCandidates({
  candidates,
  jobs,
  onViewCandidate,
  onExportCandidates,
}: {
  candidates: Candidate[]
  jobs: Job[]
  onViewCandidate: (candidate: Candidate) => void
  onExportCandidates: (candidates: Candidate[], filename?: string) => void
}) {
  const [jobId, setJobId] = useState('Todos')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('Todos')
  const approvedStatuses: Status[] = ['Aprovado', 'Aprovável', 'Contratado']
  const filtered = candidates
    .filter((candidate) => approvedStatuses.includes(candidate.status))
    .filter((candidate) => (jobId === 'Todos' || candidate.jobId === Number(jobId)))
    .filter((candidate) => (!date || candidate.approvedAt === date))
    .filter((candidate) => (status === 'Todos' || candidate.status === status))
    .sort((a, b) => (b.approvedAt ?? b.appliedAt).localeCompare(a.approvedAt ?? a.appliedAt))

  return (
    <div className="table-card">
      <div className="table-title">
        <h3>Aprovados</h3>
        <button className="export-button small" onClick={() => onExportCandidates(filtered, 'cipolatti-aprovados-filtrados.xlsx')}>
          <Download size={16} /> Exportar Excel
        </button>
      </div>
      <div className="candidate-filters">
        <select value={jobId} onChange={(event) => setJobId(event.target.value)}>
          <option>Todos</option>
          {jobs.map((job) => <option value={job.id} key={job.id}>{job.title}</option>)}
        </select>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>Todos</option>
          {approvedStatuses.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="admin-card-grid">
        {filtered.map((candidate) => {
          const job = jobs.find((item) => item.id === candidate.jobId)
          return (
            <article className="module-card approval-card" key={candidate.id}>
              <UserCheck size={26} />
              <small>{candidate.status} · {candidate.approvedAt ?? candidate.appliedAt}</small>
              <h3>{candidate.name}</h3>
              <p>{job?.title ?? 'Banco de talentos'}</p>
              <span>{candidate.phone} · {candidate.email}</span>
              <b>Responsável: {candidate.approvalResponsible ?? job?.owner ?? 'RH'}</b>
              <div className="card-actions">
                <button onClick={() => onViewCandidate(candidate)}>Visualizar dados completos</button>
                <button onClick={() => generateCandidatePdf(candidate, job)}>Gerar PDF</button>
                <button onClick={() => onExportCandidates([candidate], `cipolatti-${candidate.name}.xlsx`)}>Exportar Excel</button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function RejectedCandidates({
  candidates,
  jobs,
  onViewCandidate,
}: {
  candidates: Candidate[]
  jobs: Job[]
  onViewCandidate: (candidate: Candidate) => void
}) {
  const [jobId, setJobId] = useState('Todos')
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')
  const filtered = candidates
    .filter((candidate) => candidate.status === 'Reprovado')
    .filter((candidate) => (jobId === 'Todos' || candidate.jobId === Number(jobId)))
    .filter((candidate) => (!date || candidate.rejection?.date === date))
    .filter((candidate) => (!reason || candidate.rejection?.reason.toLowerCase().includes(reason.toLowerCase())))
    .sort((a, b) => (b.rejection?.date ?? b.appliedAt).localeCompare(a.rejection?.date ?? a.appliedAt))

  return (
    <div className="table-card">
      <div className="table-title">
        <h3>Reprovados</h3>
        <span><Filter size={16} /> Por vaga, data, motivo e mais recentes</span>
      </div>
      <div className="candidate-filters">
        <select value={jobId} onChange={(event) => setJobId(event.target.value)}>
          <option>Todos</option>
          {jobs.map((job) => <option value={job.id} key={job.id}>{job.title}</option>)}
        </select>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <input placeholder="Motivo da reprovação" value={reason} onChange={(event) => setReason(event.target.value)} />
      </div>
      <div className="admin-card-grid">
        {filtered.map((candidate) => {
          const job = jobs.find((item) => item.id === candidate.jobId)
          return (
            <article className="module-card rejection-card" key={candidate.id}>
              <FileText size={26} />
              <small>{candidate.rejection?.date ?? candidate.appliedAt}</small>
              <h3>{candidate.name}</h3>
              <p>{job?.title ?? 'Banco de talentos'}</p>
              <span>{candidate.rejection?.reason ?? 'Motivo não informado'} · {candidate.rejection?.responsible ?? 'RH'}</span>
              <b>{candidate.rejection?.notes ?? candidate.notes}</b>
              <div className="card-actions">
                <button onClick={() => onViewCandidate(candidate)}>Visualizar dados completos</button>
                <button onClick={() => generateCandidatePdf(candidate, job)}>Gerar PDF</button>
              </div>
            </article>
          )
        })}
        {!filtered.length && <p className="empty-state">Nenhum candidato reprovado encontrado.</p>}
      </div>
    </div>
  )
}

function CandidateDetailModal({
  candidate,
  job,
  onClose,
}: {
  candidate: Candidate
  job?: Job
  onClose: () => void
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="candidate-modal">
        <div className="modal-header">
          <div>
            <span className="eyebrow">Dados completos do candidato</span>
            <h2>{candidate.name}</h2>
          </div>
          <button onClick={onClose}>Fechar</button>
        </div>
        <div className="modal-actions">
          <button className="export-button" onClick={() => generateCandidatePdf(candidate, job)}>
            <FileText size={18} /> Gerar PDF
          </button>
          <a href={`https://wa.me/${candidate.whatsapp}?text=Olá ${candidate.name}, aqui é o RH da CIPOLATTI.`} target="_blank">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
        <div className="candidate-detail-grid">
          <DetailBlock title="Dados pessoais" items={[
            ['Nome', candidate.name],
            ['CPF', candidate.cpf],
            ['RG', candidate.rg ?? 'Não informado'],
            ['Identidade de gênero', candidate.genderIdentity ?? 'Não informado'],
            ['Data de nascimento', candidate.birthDate ?? 'Não informado'],
            ['Telefone', candidate.phone],
            ['WhatsApp', candidate.whatsapp],
            ['E-mail', candidate.email],
            ['LinkedIn', candidate.linkedin ?? 'Não informado'],
            ['Foto', candidate.photoFile ?? 'Não enviada'],
          ]} />
          <DetailBlock title="Endereço" items={[
            ['Endereço completo', candidate.address ?? 'Não informado'],
            ['Cidade', candidate.city],
          ]} />
          <DetailBlock title="Vaga e status" items={[
            ['Vaga escolhida', job?.title ?? 'Banco de talentos'],
            ['Setor', job?.sector ?? 'Não vinculado'],
            ['Status atual', candidate.status],
            ['Aderência', `${candidate.score}%`],
            ['Data candidatura', candidate.appliedAt],
            ['Pretensão salarial', candidate.desiredSalary],
          ]} />
          <DetailBlock title="Arquivos" items={[
            ['Currículo anexado', candidate.resumeFile ?? 'Currículo automático gerado'],
            ['Foto', candidate.photoFile ?? 'Não enviada'],
          ]} />
        </div>
        <RecordSection title="Formação acadêmica" records={formatFormations(candidate)} />
        <RecordSection title="Experiências profissionais" records={formatExperiences(candidate)} />
        <RecordSection title="Cursos e certificações" records={formatCourses(candidate)} />
        <RecordSection title="Idiomas" records={formatLanguages(candidate)} />
        <RecordSection title="Habilidades" records={formatSkills(candidate)} />
        <RecordSection title="Perguntas personalizadas da vaga" records={formatCustomAnswers(candidate)} />
        <RecordSection title="Observações internas do RH" records={[candidate.notes]} />
        <RecordSection title="Histórico de movimentação" records={formatHistory(candidate)} />
      </section>
    </div>
  )
}

function DetailBlock({ title, items }: { title: string; items: Array<[string, string]> }) {
  return (
    <article className="detail-block">
      <h3>{title}</h3>
      {items.map(([label, value]) => (
        <p key={label}><strong>{label}:</strong> {value || 'Não informado'}</p>
      ))}
    </article>
  )
}

function RecordSection({ title, records }: { title: string; records: string[] }) {
  return (
    <section className="record-section">
      <h3>{title}</h3>
      {records.length ? records.map((record, index) => <p key={`${title}-${index}`}>{record}</p>) : <p>Não informado.</p>}
    </section>
  )
}

function InterviewScheduleModal({
  candidate,
  status,
  onCancel,
  onSave,
}: {
  candidate?: Candidate
  status: Status
  onCancel: () => void
  onSave: (schedule: InterviewSchedule) => void
}) {
  const existing = candidate?.interview
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onSave({
      date: String(form.get('date')),
      time: String(form.get('time')),
      type: String(form.get('type')) as InterviewSchedule['type'],
      location: String(form.get('location')),
      meetingLink: String(form.get('meetingLink')),
      interviewer: String(form.get('interviewer')),
      notes: String(form.get('notes')),
      status: 'Agendada',
    })
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="candidate-modal compact-modal" onSubmit={submit}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">Agendamento de entrevista</span>
            <h2>{candidate?.name ?? 'Candidato'} · {status}</h2>
          </div>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
        <div className="form-grid">
          <input name="date" type="date" defaultValue={existing?.date} required />
          <input name="time" type="time" defaultValue={existing?.time} required />
          <select name="type" defaultValue={existing?.type ?? 'Presencial'}>
            <option>Presencial</option>
            <option>Online</option>
          </select>
          <input name="location" placeholder="Local da entrevista" defaultValue={existing?.location} />
          <input name="meetingLink" placeholder="Link da reunião, se online" defaultValue={existing?.meetingLink} />
          <input name="interviewer" placeholder="Entrevistador responsável" defaultValue={existing?.interviewer} required />
          <textarea name="notes" placeholder="Observações" defaultValue={existing?.notes} />
        </div>
        <button type="submit">Salvar agendamento</button>
      </form>
    </div>
  )
}

function RejectionModal({
  candidate,
  onCancel,
  onSave,
}: {
  candidate?: Candidate
  onCancel: () => void
  onSave: (reason: string, notes: string) => void
}) {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onSave(String(form.get('reason')), String(form.get('notes')))
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="candidate-modal compact-modal" onSubmit={submit}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">Reprovação obrigatória</span>
            <h2>{candidate?.name ?? 'Candidato'}</h2>
          </div>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
        <input name="reason" placeholder="Motivo da reprovação" required />
        <textarea name="notes" placeholder="Observação interna" required />
        <button type="submit">Salvar reprovação</button>
      </form>
    </div>
  )
}

function generateCandidatePdf(candidate: Candidate, job?: Job) {
  const popup = window.open('', '_blank')
  if (!popup) return
  const sections = [
    ['Dados pessoais', [`Nome: ${candidate.name}`, `CPF: ${candidate.cpf}`, `Telefone: ${candidate.phone}`, `WhatsApp: ${candidate.whatsapp}`, `E-mail: ${candidate.email}`, `Endereço: ${candidate.address ?? ''}`]],
    ['Vaga', [`Vaga aplicada: ${job?.title ?? 'Banco de talentos'}`, `Status: ${candidate.status}`, `Data candidatura: ${candidate.appliedAt}`]],
    ['Formação', formatFormations(candidate)],
    ['Experiências', formatExperiences(candidate)],
    ['Cursos', formatCourses(candidate)],
    ['Idiomas', formatLanguages(candidate)],
    ['Habilidades', formatSkills(candidate)],
    ['Perguntas da vaga', formatCustomAnswers(candidate)],
    ['Observações internas', [candidate.notes]],
    ['Histórico de status', formatHistory(candidate)],
  ]
  popup.document.write(`
    <html>
      <head>
        <title>Ficha do candidato - ${escapeHtml(candidate.name)}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #123b2a; padding: 32px; }
          h1 { color: #073c2b; }
          h2 { border-bottom: 1px solid #d7c18f; padding-bottom: 6px; }
          p { line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1>Ficha do candidato - ${escapeHtml(candidate.name)}</h1>
        ${sections.map(([title, records]) => `
          <section>
            <h2>${escapeHtml(String(title))}</h2>
            ${(records as string[]).map((record) => `<p>${escapeHtml(record)}</p>`).join('')}
          </section>
        `).join('')}
        <script>window.print()</script>
      </body>
    </html>
  `)
  popup.document.close()
}

function formatFormations(candidate: Candidate) {
  const records = candidate.formations?.map((item) => `${item.type} · ${item.course} · ${item.institution} · ${item.startDate} a ${item.inProgress === 'Sim' ? 'em andamento' : item.endDate}`)
  return records?.length ? records : [candidate.education]
}

function formatExperiences(candidate: Candidate) {
  const records = candidate.experiences?.map((item) => `${item.company} · ${item.role} · ${item.startDate} a ${item.current === 'Sim' ? 'atual' : item.endDate} · ${item.activities}${item.exitReason ? ` · Motivo da saída: ${item.exitReason}` : ''}`)
  return records?.length ? records : [candidate.experience]
}

function formatCourses(candidate: Candidate) {
  return candidate.courses?.map((item) => `${item.name} · ${item.institution} · ${item.workload} · Conclusão: ${item.completionDate}${item.validity ? ` · Validade: ${item.validity}` : ''}`) ?? []
}

function formatLanguages(candidate: Candidate) {
  return candidate.languages?.map((item) => `${item.language} · Leitura: ${item.reading} · Escrita: ${item.writing} · Conversação: ${item.speaking}`) ?? []
}

function formatSkills(candidate: Candidate) {
  return candidate.skills?.map((item) => item.name) ?? candidate.tags
}

function formatCustomAnswers(candidate: Candidate) {
  return Object.entries(candidate.customAnswers ?? {}).map(([question, answer]) => `${question}: ${answer}`)
}

function formatHistory(candidate: Candidate) {
  return (candidate.history ?? []).map((item) => {
    const interview = item.interview ? ` · Entrevista: ${item.interview.date} ${item.interview.time} ${item.interview.type}` : ''
    const reason = item.reason ? ` · Motivo: ${item.reason}` : ''
    return `${item.date} ${item.time} · ${item.user} · ${item.from} → ${item.to} · ${item.observation}${reason}${interview}`
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function FormsModule() {
  return (
    <div className="module-grid">
      {['Avaliação do processo seletivo', 'Integração', 'Pesquisa interna', 'Treinamento', 'Satisfação'].map((title) => (
        <article className="module-card" key={title}>
          <ClipboardCheck size={26} />
          <h3>{title}</h3>
          <p>Múltipla escolha, resposta curta, resposta longa, nota 1 a 5, nota 1 a 10 e sim/não.</p>
          <span>Perguntas obrigatórias, vínculo por vaga ou setor e respostas registradas.</span>
        </article>
      ))}
    </div>
  )
}

function DismissalModule() {
  const monthlyDismissals = [
    ['Jan', 6],
    ['Fev', 4],
    ['Mar', 8],
    ['Abr', 5],
    ['Mai', 11],
  ]
  const reasons = [
    ['Nova oportunidade', 34],
    ['Liderança', 24],
    ['Salário/benefícios', 18],
    ['Ambiente', 14],
    ['Mudança de cidade', 10],
  ]
  const sectorComparison = [
    ['Produção', 38],
    ['Logística', 24],
    ['Administrativo', 18],
    ['Comercial', 12],
    ['RH', 8],
  ]
  const improvementRanking = [
    'Comunicação da liderança',
    'Plano de carreira',
    'Benefícios',
    'Treinamento inicial',
    'Clima por setor',
  ]

  return (
    <>
      <div className="dismissal">
        <form className="panel-form">
          <h3>Liberação por CPF</h3>
          <input placeholder="CPF autorizado" />
          <input type="date" />
          <select><option>Pesquisa de desligamento</option></select>
          <button type="button">Registrar liberação</button>
        </form>
        <article className="table-card">
          <h3>Formulário de desligamento</h3>
          <p>Motivo do desligamento, liderança, empresa, ambiente, benefícios, RH, sugestões e comentários adicionais.</p>
          <p>Registro de data, hora, CPF, IP e usuário responsável pela liberação.</p>
          <div className="access-result denied"><LockKeyhole size={18} /> CPF não autorizado exibe acesso negado.</div>
          <div className="access-result allowed"><ShieldCheck size={18} /> CPF autorizado libera o formulário.</div>
        </article>
      </div>

      <section className="dismissal-analytics">
        <div className="table-title">
          <div>
            <h3>Gráficos de avaliação dos colaboradores desligados</h3>
            <p>Indicadores para RH e diretoria acompanharem causas, setores, lideranças e pontos recorrentes de melhoria.</p>
          </div>
          <div className="export-group">
            <button><Download size={16} /> Excel</button>
            <button><Download size={16} /> CSV</button>
            <button><Download size={16} /> PDF</button>
          </div>
        </div>

        <div className="dismissal-filters">
          <select><option>Período: últimos 6 meses</option></select>
          <select><option>Todos os setores</option></select>
          <select><option>Todos os cargos</option></select>
          <select><option>Tipo de desligamento</option></select>
          <select><option>Motivo do desligamento</option></select>
          <select><option>Gestor responsável</option></select>
        </div>

        <div className="satisfaction-cards">
          {[
            ['Liderança', '3,8'],
            ['Empresa', '4,2'],
            ['Ambiente', '3,9'],
            ['Benefícios', '3,5'],
            ['RH', '4,4'],
            ['Respostas positivas', '68%'],
          ].map(([label, value]) => (
            <article className="satisfaction-card" key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>Indicador geral</span>
            </article>
          ))}
        </div>

        <div className="analytics-grid">
          <article className="analytics-card">
            <h4>Quantidade de desligamentos por mês</h4>
            <div className="line-chart">
              {monthlyDismissals.map(([month, value]) => (
                <span key={month} style={{ height: `${Number(value) * 9}%` }} data-label={month} />
              ))}
            </div>
          </article>

          <article className="analytics-card">
            <h4>Motivos mais comuns</h4>
            {reasons.map(([label, value]) => (
              <div className="mini-bar" key={label}>
                <span>{label}</span>
                <div><i style={{ width: `${value}%` }} /></div>
                <b>{value}%</b>
              </div>
            ))}
          </article>

          <article className="analytics-card">
            <h4>Positivas, neutras e negativas</h4>
            <div className="pie-chart" />
            <div className="legend">
              <span>Positivas 68%</span>
              <span>Neutras 21%</span>
              <span>Negativas 11%</span>
            </div>
          </article>

          <article className="analytics-card">
            <h4>Comparativo por setor</h4>
            {sectorComparison.map(([label, value]) => (
              <div className="mini-bar" key={label}>
                <span>{label}</span>
                <div><i style={{ width: `${value}%` }} /></div>
                <b>{value}%</b>
              </div>
            ))}
          </article>

          <article className="analytics-card">
            <h4>Ranking de pontos de melhoria</h4>
            <ol className="improvement-list">
              {improvementRanking.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </article>

          <article className="analytics-card">
            <h4>Comparativo por período</h4>
            <p>Último trimestre teve aumento de 12% em desligamentos voluntários, concentrado em Produção e Logística.</p>
            <p>Gestores com maior reincidência aparecem no filtro para análise da diretoria.</p>
          </article>
        </div>
      </section>
    </>
  )
}

function FormerEmployeesEvaluation({
  questions,
  setQuestions,
  releases,
  setReleases,
  responses,
}: {
  questions: FormerQuestion[]
  setQuestions: React.Dispatch<React.SetStateAction<FormerQuestion[]>>
  releases: FormerRelease[]
  setReleases: React.Dispatch<React.SetStateAction<FormerRelease[]>>
  responses: FormerResponse[]
}) {
  const addQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const options = String(form.get('options') ?? '').split(',').map((item) => item.trim()).filter(Boolean)
    setQuestions((current) => [
      ...current,
      {
        id: Date.now(),
        text: String(form.get('question')),
        type: String(form.get('type')) as FormerQuestion['type'],
        required: form.get('required') === 'on',
        options,
      },
    ])
    event.currentTarget.reset()
  }

  const updateQuestion = (id: number, patch: Partial<FormerQuestion>) => {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, ...patch } : question))
  }

  const addRelease = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setReleases((current) => [
      {
        id: Date.now(),
        name: String(form.get('name')),
        cpf: String(form.get('cpf')),
        sector: String(form.get('sector')),
        role: String(form.get('role')),
        dismissalDate: String(form.get('dismissalDate')),
        dismissalReason: String(form.get('dismissalReason')),
        validUntil: String(form.get('validUntil')),
        status: 'liberado',
        releasedAt: new Date().toLocaleString('pt-BR'),
      },
      ...current,
    ])
    event.currentTarget.reset()
  }

  const updateReleaseStatus = (id: number, status: FormerRelease['status']) => {
    setReleases((current) => current.map((release) => release.id === id ? { ...release, status } : release))
  }

  const answered = releases.filter((release) => release.status === 'respondido').length
  const pending = releases.filter((release) => release.status === 'liberado').length
  const expired = releases.filter((release) => release.status === 'expirado' || isReleaseExpired(release)).length

  return (
    <div className="former-evaluation">
      <div className="admin-split">
        <form className="panel-form" onSubmit={addQuestion}>
          <h3>Perguntas da avaliação</h3>
          <input name="question" placeholder="Criar pergunta" required />
          <select name="type" defaultValue="Sim/Não">
            <option>Sim/Não</option>
            <option>Nota 1 a 5</option>
            <option>Nota 1 a 10</option>
            <option>Texto curto</option>
            <option>Texto longo</option>
            <option>Múltipla escolha</option>
          </select>
          <input name="options" placeholder="Opções para múltipla escolha, separadas por vírgula" />
          <label className="check-line"><input name="required" type="checkbox" /> Pergunta obrigatória</label>
          <button type="submit">Adicionar pergunta</button>
        </form>

        <article className="table-card">
          <h3>Perguntas editáveis, removíveis e ordenáveis</h3>
          {questions.map((question) => (
            <div className="former-question-row" key={question.id}>
              <input value={question.text} onChange={(event) => updateQuestion(question.id, { text: event.target.value })} />
              <select value={question.type} onChange={(event) => updateQuestion(question.id, { type: event.target.value as FormerQuestion['type'] })}>
                <option>Sim/Não</option>
                <option>Nota 1 a 5</option>
                <option>Nota 1 a 10</option>
                <option>Texto curto</option>
                <option>Texto longo</option>
                <option>Múltipla escolha</option>
              </select>
              <label><input type="checkbox" checked={question.required} onChange={(event) => updateQuestion(question.id, { required: event.target.checked })} /> Obrigatória</label>
              <button onClick={() => setQuestions((current) => {
                const index = current.findIndex((item) => item.id === question.id)
                if (index <= 0) return current
                const copy = [...current]
                const previous = copy[index - 1]
                copy[index - 1] = copy[index]
                copy[index] = previous
                return copy
              })}>Subir</button>
              <button onClick={() => setQuestions((current) => current.filter((item) => item.id !== question.id))}>Remover</button>
            </div>
          ))}
        </article>
      </div>

      <form className="panel-form release-form" onSubmit={addRelease}>
        <h3>Liberação de avaliação para ex-colaborador</h3>
        <div className="form-grid">
          <input name="name" placeholder="Nome do ex-colaborador" required />
          <input name="cpf" placeholder="CPF" required />
          <input name="sector" placeholder="Setor" required />
          <input name="role" placeholder="Cargo" required />
          <input name="dismissalDate" type="date" required />
          <input name="dismissalReason" placeholder="Motivo do desligamento" required />
          <input name="validUntil" type="date" required />
        </div>
        <button type="submit">Liberar novo ex-colaborador</button>
      </form>

      <article className="table-card">
        <h3>Lista de CPFs liberados</h3>
        {releases.map((release) => {
          const response = responses.find((item) => normalizeCpf(item.cpf) === normalizeCpf(release.cpf))
          return (
            <div className="release-row" key={release.id}>
              <div>
                <strong>{release.name}</strong>
                <span>{release.cpf} · {release.sector} · {release.role}</span>
                <small>Desligamento: {release.dismissalDate} · Motivo: {release.dismissalReason}</small>
                <small>Liberação: {release.releasedAt} · Resposta: {release.answeredAt ?? 'pendente'} · Validade: {release.validUntil}</small>
              </div>
              <b>{isReleaseExpired(release) && release.status === 'liberado' ? 'expirado' : release.status}</b>
              <div>
                <button onClick={() => updateReleaseStatus(release.id, 'liberado')}>Reenviar/liberar novamente</button>
                <button onClick={() => updateReleaseStatus(release.id, 'bloqueado')}>Bloquear CPF</button>
              </div>
              <details>
                <summary>Visualizar respostas</summary>
                {response ? Object.entries(response.answers).map(([questionId, answer]) => (
                  <p key={questionId}><strong>{questions.find((question) => String(question.id) === questionId)?.text}:</strong> {answer}</p>
                )) : <p>Nenhuma resposta registrada.</p>}
              </details>
            </div>
          )
        })}
      </article>

      <section className="dismissal-analytics">
        <div className="table-title">
          <div>
            <h3>Indicadores das avaliações de ex-colaboradores</h3>
            <p>Visão para Administrador, RH e Diretoria sobre experiência, motivos, setores, gestores e oportunidades de melhoria.</p>
          </div>
          <div className="export-group">
            <button><Download size={16} /> Excel</button>
            <button><Download size={16} /> CSV</button>
            <button><Download size={16} /> PDF</button>
          </div>
        </div>
        <div className="dismissal-filters">
          <select><option>Período</option></select>
          <select><option>Setor</option></select>
          <select><option>Cargo</option></select>
          <select><option>Motivo do desligamento</option></select>
          <select><option>Gestor responsável</option></select>
        </div>
        <div className="satisfaction-cards">
          {[
            ['Média geral', '8,4'],
            ['Respondidas', String(answered)],
            ['Pendentes', String(pending)],
            ['Expiradas', String(expired)],
            ['Positivas', '64%'],
            ['Negativas', '13%'],
          ].map(([label, value]) => (
            <article className="satisfaction-card" key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>Avaliação</span>
            </article>
          ))}
        </div>
        <div className="analytics-grid">
          <article className="analytics-card">
            <h4>Avaliação por setor</h4>
            {[
              ['Produção', 72],
              ['Logística', 81],
              ['Administrativo', 88],
              ['Comercial', 79],
            ].map(([label, value]) => (
              <div className="mini-bar" key={label}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}%</b></div>
            ))}
          </article>
          <article className="analytics-card">
            <h4>Motivos mais citados</h4>
            {['Crescimento externo', 'Liderança', 'Benefícios', 'Rotina', 'Distância'].map((item, index) => (
              <div className="mini-bar" key={item}><span>{item}</span><div><i style={{ width: `${70 - index * 10}%` }} /></div><b>{70 - index * 10}%</b></div>
            ))}
          </article>
          <article className="analytics-card">
            <h4>Positivas, neutras e negativas</h4>
            <div className="pie-chart" />
            <div className="legend"><span>Positivas 64%</span><span>Neutras 23%</span><span>Negativas 13%</span></div>
          </article>
          <article className="analytics-card">
            <h4>Pontos positivos</h4>
            <ol className="improvement-list"><li>Equipe acolhedora</li><li>Aprendizado</li><li>Marca forte</li><li>Organização</li></ol>
          </article>
          <article className="analytics-card">
            <h4>Pontos negativos</h4>
            <ol className="improvement-list"><li>Comunicação</li><li>Plano de carreira</li><li>Benefícios</li><li>Carga em picos</li></ol>
          </article>
          <article className="analytics-card">
            <h4>Sugestões e comparativo por mês</h4>
            <div className="line-chart">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai'].map((month, index) => <span key={month} style={{ height: `${45 + index * 9}%` }} data-label={month} />)}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

function Permissions() {
  return (
    <div className="permissions">
      {permissions.map((permission) => (
        <article className="permission-card" key={permission.profile}>
          <h3>{permission.profile}</h3>
          <p>{permission.access}</p>
        </article>
      ))}
    </div>
  )
}

export default App
