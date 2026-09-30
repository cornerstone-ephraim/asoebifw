type Method = { name: string; detail: string };

export function SubmissionMethods({ methods }: { methods: readonly Method[] }) {
  return (
    <div id="submission-methods" className="mt-12 scroll-mt-28">
      <h3 className="font-display text-3xl tracking-[-.04em]">
        How to share your collections
      </h3>
      <p className="mt-3 leading-7 text-asoebi-graphite">
        Choose one format. Include both collections in one accessible link.
      </p>
      <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
        {methods.map((method) => (
          <article
            key={method.name}
            className="border-t border-asoebi-purple-950/20 py-6"
          >
            <h4 className="font-display text-2xl tracking-[-.04em] text-asoebi-purple-950">
              {method.name}
            </h4>
            <p className="mt-2 text-sm leading-6 text-asoebi-graphite">
              {method.detail}
            </p>
          </article>
        ))}
      </div>
      <div className="border-t border-asoebi-purple-950/20 pt-5 text-sm leading-6 text-asoebi-graphite">
        <p>
          Clearly label both collections and keep your link accessible until
          judging ends. For PDFs, enable “Anyone with the link” access.
        </p>
        <p className="mt-2">Use sharp photography or stable, well-lit video.</p>
      </div>
    </div>
  );
}
