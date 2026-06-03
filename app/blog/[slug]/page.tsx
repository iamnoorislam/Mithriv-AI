export const dynamic = 'force-dynamic';
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DUMMY_POSTS } from '@/lib/dummy-posts'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  excerpt,
  publishedAt,
  body,
  "imageUrl": mainImage.asset->url,
  "authorName": author->name,
  "authorImageUrl": author->image.asset->url,
  "categories": categories[]->title
}`



// Helpers for Table of Contents
function extractText(block: any): string {
  if (block.children) {
    return block.children.map((child: any) => child.text).join('')
  }
  return ''
}

function generateId(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref.split('-')[1]}-${value.asset._ref.split('-')[2]}.${value.asset._ref.split('-')[3]}`}
          className="my-10 rounded-2xl w-full max-w-4xl mx-auto shadow-2xl border border-white/10"
        />
      )
    }
  },
  block: {
    h1: ({ children, value }: any) => <h1 id={generateId(extractText(value))} className="text-3xl md:text-4xl font-bold mt-16 mb-6 text-white font-sans scroll-mt-24">{children}</h1>,
    h2: ({ children, value }: any) => <h2 id={generateId(extractText(value))} className="text-2xl md:text-3xl font-bold mt-12 mb-5 text-white font-sans scroll-mt-24">{children}</h2>,
    h3: ({ children, value }: any) => <h3 id={generateId(extractText(value))} className="text-xl md:text-2xl font-bold mt-10 mb-4 text-white font-sans scroll-mt-24">{children}</h3>,
    normal: ({ children }: any) => <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 font-sans font-light">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#8350e8] pl-6 my-10 text-lg md:text-xl italic text-slate-400 font-sans bg-white/[0.02] py-4 pr-4 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#8350e8] hover:text-[#9c72f3] underline underline-offset-4 decoration-white/20 hover:decoration-[#8350e8]/50 transition-colors"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside text-base md:text-lg text-slate-300 mb-8 space-y-3 font-sans font-light">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside text-base md:text-lg text-slate-300 mb-8 space-y-3 font-sans font-light">{children}</ol>,
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post = null
  try {
    post = await client.fetch(POST_QUERY, { slug })
  } catch (error) {
    console.error("Failed to fetch post from Sanity, trying fallback", error)
  }

  if (!post) {
    const dummyPost = DUMMY_POSTS.find(p => p.slug.current === slug)
    if (dummyPost) {
      post = dummyPost
    } else {
      notFound()
    }
  }

  // Primary category extraction
  const primaryCategory = post.categories && post.categories.length > 0
    ? post.categories[0]
    : 'Security'

  // Extract headings for TOC
  const headings = post.body?.filter((b: any) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3')).map((b: any) => {
    const text = extractText(b)
    return { text, id: generateId(text), style: b.style }
  }) || []

  return (
    <article className="min-h-screen bg-[#0C0D10] text-white pb-24 font-sans relative">
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[5%] left-[10%] w-[350px] h-[350px] bg-[#8350e8]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-[#8350e8]/3 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Hero Header */}
      <header className="relative w-full pt-40 pb-10 md:pt-48 md:pb-12 overflow-hidden bg-[#0C0D10]">
        <div className="relative max-w-[1280px] mx-auto px-6 text-left">

          {/* Breadcrumb Navigation / Meta tag */}
          <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-400 uppercase mb-4 flex items-center space-x-3">
            <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#8350e8]">{primaryCategory}</span>
          </div>

          <div className="font-mono text-[14px] font-semibold tracking-widest text-slate-500 uppercase mb-8 flex items-center space-x-4">
            <time dateTime={post.publishedAt || new Date().toISOString()}>
              {new Date(post.publishedAt || new Date()).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
              })}
            </time>
            <span className="opacity-30">•</span>
            <span>{primaryCategory}</span>
          </div>

          <h1 className="text-[48px] font-medium text-white tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-snug max-w-3xl mb-4">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.imageUrl && (
        <div className="max-w-[1280px] mx-auto px-6 mb-16 relative z-10">
          <div className="w-full bg-[#1a1b1e] overflow-hidden aspect-[20/9] rounded-2xl">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-full h-full border border-white/10"
            />
          </div>
        </div>
      )}

      {/* Main 2-Column Body Content Container */}
      <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 md:gap-20">

        {/* Left Sidebar (Author & TOC) */}
        <aside className="md:sticky md:top-32 self-start hidden md:block">

          {/* Author Details */}
          {post.authorName && (
            <div className="flex items-center space-x-3 mb-16">
              {post.authorImageUrl ? (
                <img
                  src={post.authorImageUrl}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white text-sm font-bold border border-white/10">
                  {post.authorName.charAt(0)}
                </div>
              )}
              <div className="text-left font-sans">
                <p className="text-white font-medium text-sm leading-tight">{post.authorName}</p>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mt-1">3 MIN READ</p>
              </div>
            </div>
          )}

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div>
              <h4 className="font-mono text-[14px] tracking-widest text-slate-500 uppercase mb-6">Table of Contents</h4>
              <ul className="space-y-4 border-l border-white/10 pl-4">
                {headings.map((h: any) => (
                  <li key={h.id} className={h.style === 'h3' ? 'pl-3' : ''}>
                    <a href={`#${h.id}`} className="text-[14px] leading-relaxed text-slate-400 hover:text-white transition-colors line-clamp-2">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Content Area (PortableText) */}
        <div className="prose prose-invert prose-lg max-w-none w-full pb-32">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="text-slate-500 italic text-center py-12">No content available for this post.</p>
          )}
        </div>

      </div>
    </article>
  )
}
