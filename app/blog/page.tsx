import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { DUMMY_POSTS } from '@/lib/dummy-posts'

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  publishedAt,
  "excerpt": pt::text(body),
  "imageUrl": mainImage.asset->url,
  "authorName": author->name,
  "authorImageUrl": author->image.asset->url,
  "categories": categories[]->title
}`

export const revalidate = 0 // Disable caching to see posts immediately

export default async function BlogPage() {
  let posts = []
  try {
    posts = await client.fetch(POSTS_QUERY)
  } catch (error) {
    console.error("Failed to fetch posts from Sanity, using fallback dummy posts", error)
  }

  // Combine real posts and dummy posts to guarantee at least 3 beautiful cards are rendered
  const allPosts = posts && posts.length > 0
    ? [...posts, ...DUMMY_POSTS].slice(0, 3)
    : DUMMY_POSTS

  return (
    <main className="min-h-screen bg-[#131416] text-white pt-32 pb-24 md:pt-40 px-6 md:px-8 max-w-[1280px] mx-auto font-sans relative">

      {/* Dynamic Background Mesh Grid matching homepage style */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20 opacity-30"></div>

      {/* Two-Column Header Layout (Heading Left, Subheading Right) */}
      <header className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-20 border-b border-[#1A1C1E] pb-12">
        <div>
          <h1 className="text-[36px] md:text-[48px] font-semibold text-white tracking-[-0.03em] leading-[1.1] font-sans">
            Notes from the autonomous production frontier
          </h1>
        </div>
        <div className="pt-2 md:pt-4">
          <p className="text-[13px] md:text-[14px] text-slate-400 leading-relaxed font-mono font-light">
            Research, product thinking, and field notes from teams building systems that can understand, repair, and improve production.
          </p>
        </div>
      </header>

      {/* Grid of all posts - 3 Column Raw Design Grid (Identical Card Styles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {allPosts.map((post: any) => {
          const wordCount = post.excerpt ? post.excerpt.split(/\s+/).length : 50
          const readingTime = Math.max(2, Math.ceil(wordCount / 200)) + ' MIN READ'
          const postCategory = post.categories && post.categories.length > 0 ? post.categories[0] : 'Intelligence'

          return (
            <Link 
              href={`/blog/${post.slug.current}`} 
              key={post._id}
              className="group flex flex-col dashed-card-border rounded-none h-full hover:-translate-y-1"
            >
              {/* Image Top - completely edge-to-edge and border-radius free */}
              <div className="relative aspect-[16/9] w-full bg-[#161718] rounded-none overflow-hidden flex-shrink-0">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-white/[0.01] gap-2">
                    <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
                    </svg>
                    <span className="text-[10px] font-mono tracking-widest opacity-30">NO IMAGE</span>
                  </div>
                )}
              </div>

              {/* Content Panel - padded only for text elements */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category Tag + Date */}
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="text-[#8350e8] font-semibold uppercase tracking-wider">
                      {postCategory}
                    </span>
                    {post.publishedAt ? (
                      <time dateTime={post.publishedAt} className="text-slate-500 font-light">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </time>
                    ) : (
                      <span className="text-slate-500 font-light">04/16/2026</span>
                    )}
                  </div>

                  {/* Bold Title (20px) - Solid White */}
                  <h2 className="text-xl font-semibold text-white tracking-tight leading-snug transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt (14px) */}
                  {post.excerpt && (
                    <p className="text-[14px] text-slate-400 leading-relaxed line-clamp-2 mt-3 font-sans font-light">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer with Author and read time */}
                <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#1A1C1E]">
                  <div className="flex items-center gap-2.5">
                    {post.authorImageUrl ? (
                      <img
                        src={post.authorImageUrl}
                        alt={post.authorName || 'Author'}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-[#1A1C1E] flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {post.authorName ? post.authorName.charAt(0) : 'M'}
                      </div>
                    )}
                    <span className="text-xs text-slate-300 font-semibold transition-colors">
                      {post.authorName || 'Mithriv Team'}
                    </span>
                  </div>

                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest bg-white/[0.03] px-2 py-0.5 rounded-sm">
                    <span>{readingTime}</span>
                  </div>
                </div>

              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
