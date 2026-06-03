import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DUMMY_CASE_STUDIES } from '@/lib/dummy-resources'

const CASESTUDY_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0] {
  title,
  description,
  date,
  body,
  "imageUrl": thumbnail.asset->url
}`

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  
  let study = await client.fetch(CASESTUDY_QUERY, { slug })

  if (!study) {
    study = DUMMY_CASE_STUDIES.find(s => s.slug.current === slug)
  }

  if (!study) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#0C0D10] text-white pb-32 font-sans relative">
      {/* Decorative Glow */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-[#8350e8]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Hero Header */}
      <header className="relative w-full pt-40 pb-16 overflow-hidden bg-[#0C0D10]">
        <div className="relative max-w-[1000px] mx-auto px-6 text-center">
          
          <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-400 uppercase mb-6 flex items-center justify-center space-x-3">
            <Link href="/case-studies" className="hover:text-white transition-colors">CASE STUDIES</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#8350e8]">PROVEN AUTONOMY</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
            {study.title}
          </h1>

          {study.description && (
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-snug max-w-3xl mx-auto mb-8">
              {study.description}
            </p>
          )}

          <div className="font-mono text-[14px] tracking-widest text-slate-500 uppercase">
            <time dateTime={study.date || new Date().toISOString()}>
              {new Date(study.date || new Date()).getFullYear()}
            </time>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {study.imageUrl && (
        <div className="max-w-[1280px] mx-auto px-6 mb-20 relative z-10">
          <div className="w-full bg-[#1a1b1e] overflow-hidden aspect-[21/9] rounded-3xl border border-white/10 shadow-2xl">
            <img 
              src={study.imageUrl} 
              alt={study.title} 
              className="object-cover w-full h-full opacity-90"
            />
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none w-full">
          {study.body ? (
            <PortableText value={study.body} />
          ) : (
            <div className="text-slate-400 leading-relaxed font-light space-y-6">
              <p>Mithriv deployed its proprietary Intelligence Engine into the client's existing architecture, mapping thousands of disjointed nodes into a single, cohesive Integration Fabric within 48 hours.</p>
              <p>Once active, the system didn't just monitor for anomalies—it began executing complex remediation protocols autonomously. When a severe threat vector was detected in a legacy sub-system, Mithriv correlated the data, identified the breach path, and isolated the network segment in 14 milliseconds.</p>
              <blockquote className="border-l-4 border-[#8350e8] pl-6 my-10 text-xl italic bg-white/[0.02] py-4 pr-4 rounded-r-xl">
                "We didn't just buy a security tool. We bought sleep. Mithriv handles the execution so our team can focus on strategy."
              </blockquote>
              <p>This is the power of conscious security. It's not about better alerts; it's about not needing the alerts in the first place because the system has already resolved the issue.</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
