import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DUMMY_PODCASTS } from '@/lib/dummy-podcasts'

const PODCAST_QUERY = `*[_type == "podcast" && slug.current == $slug][0] {
  title,
  description,
  "audioUrl": audioFile.asset->url,
  "videoUrl": videoFile.asset->url,
  duration,
  episodeNumber,
  guestName
}`

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PodcastDetailPage({ params }: Props) {
  const { slug } = await params;
  let podcast = null;
  try {
    podcast = await client.fetch(PODCAST_QUERY, { slug })
  } catch (error) {
    console.error("Failed to fetch podcast from Sanity, trying fallback", error)
  }

  if (!podcast) {
    podcast = DUMMY_PODCASTS.find(p => p.slug.current === slug)
  }

  if (!podcast) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#0C0D10] font-sans text-white pb-32">
      
      {/* Decorative Atmospheric Glow */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#8350e8]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Hero Header */}
      <header className="pt-40 pb-12 w-full relative border-b border-white/5 bg-[#0C0D10]">
        <div className="max-w-[1280px] mx-auto px-6 text-left">
          
          <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-400 uppercase mb-4 flex items-center space-x-3">
            <Link href="/podcast" className="hover:text-white transition-colors">PODCASTS</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#8350e8]">EPISODE {podcast.episodeNumber || '1'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-8 max-w-4xl">
            {podcast.title}
          </h1>
          
          <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-500 uppercase mb-8 flex items-center space-x-4">
             <span>{podcast.duration || '45 MINS'}</span>
             <span className="opacity-30">•</span>
             <span>INTERVIEW</span>
          </div>

        </div>
      </header>

      {/* Featured Video Container */}
      <div className="max-w-[1280px] mx-auto px-6 mb-16 mt-16 relative z-10">
        <div className="w-full bg-[#161718] rounded-2xl overflow-hidden aspect-[21/9] border border-white/10 shadow-2xl relative group">
          {podcast.videoUrl ? (
            podcast.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video 
                src={`${podcast.videoUrl}#t=0.1`}
                controls
                preload="metadata"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <img 
                src={podcast.videoUrl} 
                alt={podcast.title} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 bg-black/40">
              <span className="font-mono text-sm tracking-widest">VIDEO UNAVAILABLE</span>
            </div>
          )}

          {/* Play Button Overlay (only for image thumbnails) */}
          {(!podcast.videoUrl || !podcast.videoUrl.match(/\.(mp4|webm|ogg)$/i)) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-24 h-24 rounded-full bg-[#8350e8]/80 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl shadow-[#8350e8]/20">
                  <svg className="w-10 h-10 text-white translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Main 2-Column Body Content Container */}
      <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-20">
        
        {/* Left Sidebar (Guest Info & Audio Player) */}
        <aside className="md:sticky md:top-32 self-start flex flex-col gap-8">
          
          {/* Audio Player Card */}
          <div className="bg-[#121316] border border-white/10 rounded-2xl p-6 shadow-xl">
             <div className="flex items-center gap-4 mb-6">
               <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#8350e8] to-[#4b2796] flex items-center justify-center shadow-lg">
                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                 </svg>
               </div>
               <div>
                  <h4 className="font-mono text-[10px] tracking-widest text-[#8350e8] uppercase mb-1">Listen to Episode</h4>
                  <p className="text-sm text-slate-300 font-medium">{podcast.duration || '45:00'}</p>
               </div>
             </div>
             
             {podcast.audioUrl ? (
                <audio controls className="w-full h-10 outline-none rounded-full" style={{ backgroundColor: '#1a1b1e' }}>
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
             ) : (
                <div className="w-full h-10 bg-[#1a1b1e] rounded-full flex items-center px-4 text-xs text-slate-500 italic">
                  Audio file not provided.
                </div>
             )}
          </div>

          {/* Guest Details */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h4 className="font-mono text-[14px] tracking-widest text-slate-500 uppercase mb-6">Special Guest</h4>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white text-xl font-bold border border-white/10">
                {podcast.guestName ? podcast.guestName.charAt(0) : 'G'}
              </div>
              <div className="text-left font-sans">
                <p className="text-white font-medium text-base leading-tight mb-1">{podcast.guestName || 'Special Guest'}</p>
                <p className="text-slate-500 font-mono text-[11px] uppercase tracking-wider">INDUSTRY EXPERT</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area (Show Notes) */}
        <div className="prose prose-invert prose-lg max-w-none w-full">
          <h2 className="text-2xl md:text-3xl font-bold mt-0 mb-6 text-white font-sans">Show Notes</h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 font-sans font-light">
            {podcast.description}
          </p>
          
          <h3 className="text-xl md:text-2xl font-bold mt-12 mb-4 text-white font-sans">In this episode we cover:</h3>
          <ul className="list-disc list-inside text-base md:text-lg text-slate-300 mb-8 space-y-4 font-sans font-light border-l-4 border-[#8350e8] pl-6 bg-white/[0.02] py-6 rounded-r-xl">
            <li>The fundamental shift from generative AI models to autonomous execution workflows.</li>
            <li>How runtime context is critical for preventing hallucinations and failures in production.</li>
            <li>Strategies for orchestrating agent swarms across distributed enterprise architectures.</li>
            <li>Real-world post-mortems of system failures and how autonomous agents could have resolved them in seconds.</li>
          </ul>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-6 font-sans font-light italic mt-12">
            "We are no longer just asking AI to write code. We are asking it to run it, monitor it, and fix it. That requires a fundamentally new kind of platform." — {podcast.guestName || 'Our Guest'}
          </p>
        </div>

      </div>

    </article>
  )
}
