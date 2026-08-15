import React from 'react';
import { MetaTags } from '../components/seo/MetaTags';
import { Mail, GitPullRequest, MessageSquare, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'GradeForge Support & Contact',
    url: 'https://gradeforge.poorvithmp.com/contact',
    description: 'Get in touch for questions, university scale requests, and feedback about GradeForge.',
    author: {
      '@type': 'Person',
      name: 'Poorvith M P',
      url: 'https://poorvithmp.com',
    },
  };

  return (
    <>
      <MetaTags
        title="Support & Feedback — GradeForge"
        description="Get in touch, suggest university grading schemes, report bugs, or give feedback on GradeForge."
        canonicalPath="/contact"
        schema={schema}
      />

      <main className="w-[min(1100px,90vw)] mx-auto py-8 sm:py-12">
        <section className="max-w-3xl mb-12">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-gpblue mb-1">
            Support & Feedback
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink tracking-tight mb-6">
            Get in touch.
          </h1>
          <p className="text-gpmuted text-base sm:text-lg leading-relaxed">
            Have a question, feedback, or want to see your university's official grading scheme included as a built-in preset? Reach out anytime.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mb-12">
          <div className="p-6 border border-gpline bg-paper space-y-3">
            <div className="flex items-center gap-2 text-gpblue font-bold text-base font-serif">
              <GitPullRequest className="w-5 h-5" /> GitHub Issues & PRs
            </div>
            <p className="text-xs sm:text-sm text-gpmuted leading-relaxed m-0">
              Found a bug or want to propose a new official preset? Open an issue or pull request on GitHub.
            </p>
            <a
              href="https://github.com/prvthmpcypher/gradeforge/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gpblue hover:underline pt-2"
            >
              Open GitHub Issues <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-6 border border-gpline bg-paper space-y-3">
            <div className="flex items-center gap-2 text-gpblue font-bold text-base font-serif">
              <Mail className="w-5 h-5" /> Direct Contact
            </div>
            <p className="text-xs sm:text-sm text-gpmuted leading-relaxed m-0">
              For general inquiries, reach out through my personal website or contact email.
            </p>
            <a
              href="https://poorvithmp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gpblue hover:underline pt-2"
            >
              Visit poorvithmp.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        <section className="p-6 border border-gpline bg-gpwash/40 max-w-3xl">
          <div className="flex items-center gap-2 text-ink font-serif font-bold text-base mb-1.5">
            <MessageSquare className="w-4 h-4 text-gpblue" /> Requesting a University Preset
          </div>
          <p className="text-xs text-gpmuted leading-relaxed m-0">
            When requesting a preset, please provide the university name, grading scale (e.g. 10-point CBCS), letter grades, and their exact official grade points.
          </p>
        </section>
      </main>
    </>
  );
};
