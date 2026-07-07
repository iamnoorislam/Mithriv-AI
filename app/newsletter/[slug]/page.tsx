import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DUMMY_NEWSLETTERS } from '@/lib/dummy-resources'

const NEWSLETTER_QUERY = `*[_type == "newsletter" && slug.current == $slug][0] {
  title,
  date,
  body,
  "imageUrl": thumbnail.asset->url
}`

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export default async function NewsletterDetailPage({ params }: Props) {
  const { slug } = await params
  
  let newsletter = await client.fetch(NEWSLETTER_QUERY, { slug })

  if (!newsletter) {
    newsletter = DUMMY_NEWSLETTERS.find(n => n.slug.current === slug)
  }

  if (!newsletter) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#131416] text-white pb-32 font-sans relative">
      <header className="relative w-full pt-40 pb-16 overflow-hidden bg-[#131416]">
        <div className="relative max-w-[800px] mx-auto px-6">
          
          <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-400 uppercase mb-8 flex items-center space-x-3">
            <Link href="/newsletter" className="hover:text-white transition-colors">DISPATCHES</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#FF9A9A]">
              <time dateTime={newsletter.date || new Date().toISOString()}>
                {new Date(newsletter.date || new Date()).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-12">
            {newsletter.title}
          </h1>

        </div>
      </header>

      {/* Featured Image */}
      {newsletter.imageUrl && (
        <div className="max-w-[1000px] mx-auto px-6 mb-16 relative z-10">
          <div className="w-full bg-[#1a1b1e] overflow-hidden aspect-[21/9] rounded-2xl border border-[#1A1C1E]">
            <img 
              src={newsletter.imageUrl} 
              alt={newsletter.title} 
              className="object-cover w-full h-full opacity-80"
            />
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none w-full font-serif text-slate-300 leading-relaxed">
          {newsletter.body ? (
            <PortableText value={newsletter.body} />
          ) : (
            <p>No content available for this newsletter dispatch.</p>
          )}
        </div>
      </div>
    </article>
  )
}
