import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { DUMMY_CASE_STUDIES } from '@/lib/dummy-resources'

const CASESTUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  slug,
  date,
  description,
  "imageUrl": thumbnail.asset->url
}`

export const revalidate = 0

export default async function CaseStudiesPage() {
  let caseStudies = await client.fetch(CASESTUDIES_QUERY)
  
  if (!caseStudies || caseStudies.length === 0) {
    caseStudies = DUMMY_CASE_STUDIES
  }

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
      <header className="mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Proven</span> Autonomy
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          See how leading enterprises use Mithriv to automate security, compliance, and operational execution.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {caseStudies.length > 0 ? (
          caseStudies.map((study: any) => (
            <Link 
              href={`/case-studies/${study.slug.current}`}
              key={study._id}
              className="group flex flex-col bg-[#1a1b1e] border border-white/10 rounded-3xl overflow-hidden hover:border-[#8350e8]/50 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(131,80,232,0.15)]"
            >
              <div className="relative h-72 w-full bg-[#0a0a0c] overflow-hidden">
                {study.imageUrl ? (
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 bg-gradient-to-br from-[#1a1b1e] to-black">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b1e] to-transparent"></div>
                <div className="absolute bottom-6 left-8 right-8">
                  <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                    {study.title}
                  </h2>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-slate-400 mb-6 line-clamp-3 text-lg leading-relaxed">
                  {study.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    {study.date && new Date(study.date).getFullYear()}
                  </span>
                  <div className="flex items-center text-[#8350e8] font-semibold group-hover:text-[#9263ef]">
                    Read Full Study <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-500 border border-white/5 rounded-3xl bg-white/[0.02]">
            <p className="text-lg">Case studies are currently being curated.</p>
          </div>
        )}
      </div>
    </main>
  )
}
