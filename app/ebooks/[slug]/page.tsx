import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DUMMY_EBOOKS } from '@/lib/dummy-resources'

const EBOOK_QUERY = `*[_type == "ebook" && slug.current == $slug][0] {
  title,
  description,
  date,
  downloadUrl,
  "imageUrl": thumbnail.asset->url
}`

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params
  
  let ebook = await client.fetch(EBOOK_QUERY, { slug })

  if (!ebook) {
    ebook = DUMMY_EBOOKS.find(e => e.slug.current === slug)
  }

  if (!ebook) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#0C0D10] text-white pb-32 font-sans relative">
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-[#A7F3D0]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <header className="relative w-full pt-40 pb-20 overflow-hidden bg-[#0C0D10] border-b border-white/5">
        <div className="relative max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
          
          <div>
            <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-400 uppercase mb-6 flex items-center space-x-3">
              <Link href="/ebooks" className="hover:text-white transition-colors">EBOOKS</Link>
              <span className="opacity-30">/</span>
              <span className="text-[#A7F3D0]">PUBLICATION</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              {ebook.title}
            </h1>

            {ebook.description && (
              <p className="text-xl text-slate-400 font-light leading-snug mb-10">
                {ebook.description}
              </p>
            )}

            <div className="flex items-center gap-6">
              <a 
                href={ebook.downloadUrl || '#'} 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#8350e8] text-white rounded-xl font-medium text-lg hover:bg-[#9263ef] transition-colors shadow-[0_0_20px_rgba(131,80,232,0.3)]"
              >
                Download PDF
                <svg className="w-5 h-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <span className="text-slate-500 font-mono text-sm uppercase tracking-widest">Free Resource</span>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] w-full max-w-[350px] mx-auto bg-[#1a1b1e] rounded-xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {ebook.coverUrl || ebook.imageUrl ? (
                <img 
                  src={ebook.coverUrl || ebook.imageUrl} 
                  alt={ebook.title} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 bg-gradient-to-br from-[#1a1b1e] to-black">
                  No Cover
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-6 py-20 relative z-10 text-center">
        <h3 className="text-2xl font-bold mb-6">About this publication</h3>
        <p className="text-lg text-slate-400 font-light leading-relaxed">
          This exclusive guide is engineered for technology leaders architecting the next generation of autonomous infrastructure. It provides actionable blueprints, real-world case studies, and proprietary frameworks used by the most advanced enterprises in the world.
        </p>
      </div>
    </article>
  )
}
