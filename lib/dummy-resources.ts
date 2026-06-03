export const DUMMY_CASE_STUDIES = [
  {
    _id: 'cs-1',
    title: 'Automating Global Logistics Security with Mithriv',
    slug: { current: 'automating-global-logistics' },
    date: '2026-03-15T12:00:00.000Z',
    description: 'How a Fortune 500 logistics provider eliminated 99.9% of manual security interventions across their global warehouse network using Mithriv’s Integration Fabric.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _id: 'cs-2',
    title: 'Financial Data Center Zero-Trust Implementation',
    slug: { current: 'financial-data-center-zero-trust' },
    date: '2026-02-28T12:00:00.000Z',
    description: 'Discover how Mithriv’s Intelligence Engine autonomously managed access control and threat detection for a Tier-4 financial data center, reducing response times from minutes to milliseconds.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop'
  }
];

export const DUMMY_EBOOKS = [
  {
    _id: 'eb-1',
    title: 'The Autonomous Infrastructure Playbook',
    slug: { current: 'autonomous-infrastructure-playbook' },
    publishedAt: '2026-04-10T12:00:00.000Z',
    description: 'A comprehensive guide for CIOs and CTOs on transitioning from reactive security monitoring to autonomous, self-healing digital and physical infrastructure.',
    coverUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
    downloadUrl: '#'
  },
  {
    _id: 'eb-2',
    title: 'State of Enterprise AI Agents 2026',
    slug: { current: 'state-of-enterprise-ai-agents' },
    publishedAt: '2026-01-15T12:00:00.000Z',
    description: 'An in-depth analysis of how AI execution agents are fundamentally reshaping enterprise security operations across global markets.',
    coverUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2064&auto=format&fit=crop',
    downloadUrl: '#'
  }
];

export const DUMMY_NEWSLETTERS = [
  {
    _id: 'nl-1',
    title: 'Dispatch #042: The End of Dashboards',
    slug: { current: 'dispatch-042-end-of-dashboards' },
    date: '2026-06-01T12:00:00.000Z',
    excerpt: 'Why we are moving past "single pane of glass" dashboards into an era of invisible, autonomous execution that only alerts you when human approval is strictly required.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: 'For the last decade, the enterprise software industry has been obsessed with the "single pane of glass." The idea was that if you could just get all your metrics, alerts, and camera feeds into one dashboard, you would finally have control. But as systems grew exponentially more complex, that glass cracked. It became a wall of noise. In this dispatch, we explore why dashboards are a symptom of a failed workflow, and why autonomous execution is the only scalable path forward.' }]
      }
    ]
  },
  {
    _id: 'nl-2',
    title: 'Dispatch #041: Agentic Orchestration in the Wild',
    slug: { current: 'dispatch-041-agentic-orchestration' },
    date: '2026-05-15T12:00:00.000Z',
    excerpt: 'A deep dive into how multiple specialized AI agents negotiate with each other to resolve conflicting priorities during a network anomaly.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ text: 'When a security system detects an anomaly, a standard response protocol kicks in. But what happens when the protocol contradicts a real-time operational requirement? For example, locking down a facility during a critical logistics transfer. In our latest field tests, we observed multiple autonomous agents—one optimizing for security, another for throughput—successfully negotiating a real-time compromise that satisfied both constraints without human intervention.' }]
      }
    ]
  }
];
