const PERSIAN = /[؀-ۿ]/;

/**
 * Section kicker. Latin labels get the wide-tracked uppercase treatment from
 * the design; Persian ones keep normal spacing, which that tracking mangles.
 */
export function Eyebrow({ text }: { text: string }) {
  return PERSIAN.test(text) ? (
    <span className="block text-rose text-sm">{text}</span>
  ) : (
    <span className="eyebrow-latin block">{text}</span>
  );
}
