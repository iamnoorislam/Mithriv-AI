import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { DUMMY_NEWSLETTERS } from '@/lib/dummy-resources'

const NEWSLETTER_QUERY = `*[_type == "newsletter" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  slug,
  date,
  description,
  "imageUrl": thumbnail.asset->url
}`

export const revalidate = 0

export default async function NewsletterPage() {
  let newsletters = await client.fetch(NEWSLETTER_QUERY)
  
  if (!newsletters || newsletters.length === 0) {
    newsletters = DUMMY_NEWSLETTERS
  }

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-4xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
          The <span className="text-[#8350e8]">Intelligence</span> Feed
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Weekly dispatches on AI autonomy, security, and the evolving enterprise landscape.
        </p>
      </header>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {newsletters.length > 0 ? (
          newsletters.map((newsletter: any) => (
            <div key={newsletter._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1A1C1E] bg-[#0E0F11] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 group-hover:border-[#8350e8] group-hover:shadow-[0_0_15px_rgba(131,80,232,0.4)] transition-all">
                <div className="w-3 h-3 bg-[#8350e8] rounded-full"></div>
              </div>
              
              {/* Content Card */}
              <Link 
                href={`/newsletter/${newsletter.slug.current}`}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#1a1b1e] border border-[#1A1C1E] p-6 rounded-2xl hover:border-[#8350e8]/50 hover:bg-[#1a1b1e]/80 transition-all shadow-xl block"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#8350e8] transition-colors">{newsletter.title}</h3>
                  <time className="text-xs font-medium text-[#8350e8] bg-[#8350e8]/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {newsletter.date && new Date(newsletter.date).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </time>
                </div>
                <p className="text-sm text-slate-400">
                  {newsletter.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-[#8350e8]">
                  Read issue <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-500 border border-[#1A1C1E] rounded-2xl bg-white/[0.02] relative z-10">
            <p>No newsletters published yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}
