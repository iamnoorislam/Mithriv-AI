import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { DUMMY_PODCASTS } from '@/lib/dummy-podcasts'

const PODCASTS_QUERY = `*[_type == "podcast" && defined(slug.current)] | order(episodeNumber desc) {
  _id,
  title,
  slug,
  description,
  "audioUrl": audioFile.asset->url,
  "videoUrl": videoFile.asset->url,
  "imageUrl": thumbnail.asset->url,
  duration,
  episodeNumber,
  guestName
}`

export const revalidate = 0

export default async function PodcastPage() {
  let podcasts = []
  try {
    podcasts = await client.fetch(PODCASTS_QUERY)
  } catch (error) {
    console.error("Failed to fetch podcasts from Sanity", error)
  }

  // Combine real podcasts and dummy podcasts to guarantee we have content
  const allPodcasts = podcasts && podcasts.length > 0
    ? [...podcasts, ...DUMMY_PODCASTS]
    : DUMMY_PODCASTS

  // Deduplicate by slug in case Sanity and dummy have same slugs
  const uniquePodcasts = Array.from(new Map(allPodcasts.map(p => [p.slug.current, p])).values())

  return (
    <main className="min-h-screen bg-[#131416] text-white pt-32 pb-24 md:pt-40 px-6 md:px-8 max-w-[1280px] mx-auto font-sans relative">

      {/* Dynamic Background Mesh Grid matching homepage style */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20 opacity-30"></div>

      {/* Hero Header */}
      <header className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-20 border-b border-[#1A1C1E] pb-12">
        <div>
          <h1 className="text-[36px] md:text-[48px] font-semibold text-white tracking-[-0.03em] leading-[1.1] font-sans">
            The Autonomous Execution Podcast
          </h1>
        </div>
        <div className="pt-2 md:pt-4">
          <p className="text-[13px] md:text-[14px] text-slate-400 leading-relaxed font-mono font-light">
            Listen to industry leaders discuss the shift from generative AI to autonomous execution, swarm intelligence, and runtime context.
          </p>
        </div>
      </header>

      {/* Podcast Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {uniquePodcasts.map((podcast: any) => (
          <Link 
            href={`/podcast/${podcast.slug.current}`} 
            key={podcast._id || podcast.slug.current}
            className="group flex flex-col dashed-card-border rounded-none h-full hover:-translate-y-1"
          >
            {/* Thumbnail Image or Fallback Video Image */}
            <div className="relative aspect-[16/9] w-full bg-[#161718] overflow-hidden flex-shrink-0">
              {podcast.imageUrl ? (
                <img
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                />
              ) : podcast.videoUrl && podcast.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                <video 
                  src={`${podcast.videoUrl}#t=0.1`}
                  className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                  muted 
                  playsInline
                  preload="metadata"
                />
              ) : podcast.videoUrl ? (
                <img
                  src={podcast.videoUrl}
                  alt={podcast.title}
                  className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-white/[0.01]">
                  <span className="text-[10px] font-mono tracking-widest opacity-30">NO VIDEO</span>
                </div>
              )}
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-black/50 border border-[#1A1C1E] flex items-center justify-center backdrop-blur-sm group-hover:bg-[#8350e8]/80 group-hover:border-[#8350e8] transition-all">
                  <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Panel */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                  <span className="text-[#8350e8] font-semibold uppercase tracking-wider">
                    Episode {podcast.episodeNumber || '1'}
                  </span>
                  <span className="text-slate-500 font-light">
                    {podcast.duration || '45 mins'}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-white tracking-tight leading-snug transition-colors duration-300 line-clamp-2">
                  {podcast.title}
                </h2>

                <p className="text-[14px] text-slate-400 leading-relaxed line-clamp-3 mt-3 font-sans font-light">
                  {podcast.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#1A1C1E]">
                <span className="text-xs text-slate-300 font-semibold">
                  With {podcast.guestName || 'Special Guest'}
                </span>
                <span className="font-mono text-[9px] text-[#8350e8] uppercase tracking-widest bg-[#8350e8]/10 px-2 py-0.5 rounded-sm group-hover:bg-[#8350e8] group-hover:text-white transition-colors">
                  Listen Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
