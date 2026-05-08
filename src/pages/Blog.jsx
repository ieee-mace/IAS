import { motion } from 'framer-motion'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
}

const posts = [
  {
    id: 1,
    title: "How IEEE IAS is Shaping the Future of Industrial Engineering",
    excerpt: "The Industry Applications Society has been at the forefront of bridging theory and practice in electrical engineering. Here's how student chapters are making a difference...",
    date: "2025-02-15",
    readTime: "5 min read",
    tag: "Industry",
  },
  {
    id: 2,
    title: "Our Journey at La Guerre 2.0: Lessons and Wins",
    excerpt: "Reflecting on IEEE IAS SBC MACE's participation in La Guerre 2.0 — the challenges, collaborations, and how we secured 3rd place...",
    date: "2024-11-20",
    readTime: "4 min read",
    tag: "Experience",
  },
]

const Blog = () => {
  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="pt-20 min-h-screen bg-brand-bg">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ LOG ]</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mt-1 mb-2 tracking-tight leading-[1.1]">
            Blog
          </h1>
          <p className="text-sm text-brand-textMuted mb-10 max-w-md">
            Insights, stories, and updates from IEEE IAS SBC MACE.
          </p>

          <div className="space-y-0 border-t border-brand-border">
            {posts.map((post, i) => (
              <article
                key={post.id}
                className="group py-6 border-b border-brand-border hover:bg-brand-surface transition-colors px-4 -mx-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-brand-border text-brand-textMuted tracking-wider uppercase">
                    {post.tag}
                  </span>
                  <span className="font-mono text-[10px] text-brand-textMuted tracking-wider">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-brand-textMuted/50 tracking-wider">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-heading text-lg font-bold text-brand-text mb-2 leading-tight group-hover:text-brand-bright transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-brand-textMuted leading-relaxed line-clamp-2">{post.excerpt}</p>
                <p className="mt-3 font-mono text-[11px] text-brand-textMuted group-hover:text-brand-bright transition-colors tracking-wider">
                  COMING SOON →
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 py-8 border border-dashed border-brand-border text-center">
            <p className="font-mono text-xs text-brand-textMuted tracking-wider">MORE POSTS COMING SOON</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Blog
