import { client } from '@/sanity/lib/client'
import { DUMMY_EBOOKS } from '@/lib/dummy-resources'
import Link from 'next/link'

const EBOOKS_QUERY = `*[_type == "ebook" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  slug,
  date,
  description,
  pdfUrl,
  "imageUrl": thumbnail.asset->url
}`

export const revalidate = 0

export default async function EbooksPage() {
  let ebooks = await client.fetch(EBOOKS_QUERY)
  
  if (!ebooks || ebooks.length === 0) {
    ebooks = DUMMY_EBOOKS
  }

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
          Executive <span className="text-[#8350e8]">Playbooks</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Comprehensive guides and frameworks for implementing autonomous systems in your enterprise.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ebooks.length > 0 ? (
          ebooks.map((ebook: any) => (
            <div 
              key={ebook._id}
              className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-300 shadow-2xl"
            >
              <div className="relative aspect-[3/4] w-full bg-[#0a0a0c] p-8 flex items-center justify-center">
                {ebook.imageUrl ? (
                  <img
                    src={ebook.imageUrl}
                    alt={ebook.title}
                    className="object-cover w-full h-full rounded-md shadow-2xl group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-500"
                  />
                ) : (
                  <div className="w-[80%] h-[90%] bg-gradient-to-br from-[#1a1b1e] to-[#0E0F11] border border-white/10 rounded-md flex items-center justify-center text-slate-600 shadow-2xl group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-500">
                    <span className="text-sm font-medium tracking-widest uppercase">No Cover</span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                  {ebook.title}
                </h2>
                <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed">
                  {ebook.description}
                </p>
                <div className="mt-auto">
                  {ebook.pdfUrl ? (
                    <a 
                      href={ebook.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#8350e8] hover:bg-[#9263ef] text-white rounded-full font-medium transition-colors shadow-[0_0_20px_rgba(131,80,232,0.3)]"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <button disabled className="inline-flex items-center justify-center w-full px-6 py-3 bg-white/5 text-slate-500 rounded-full font-medium cursor-not-allowed">
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 border border-white/5 rounded-2xl bg-white/[0.02]">
            <p>No ebooks available right now.</p>
          </div>
        )}
      </div>
    </main>
  )
}
