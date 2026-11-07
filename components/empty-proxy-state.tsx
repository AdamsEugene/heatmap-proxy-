type Props = {
  title?: string;
  description?: string;
};

export function EmptyProxyState({
  title = "No origins loaded",
  description = "We could not load the list from the API. Check your connection and NEXT_PUBLIC_BASE_URL, or try again shortly.",
}: Props) {
  return (
    <div
      className="rounded-[var(--radius-card)] border border-dashed border-border bg-card px-6 py-14 text-center"
      role="status"
    >
      <p className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
