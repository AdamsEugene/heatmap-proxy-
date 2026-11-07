import type { FC, SVGProps } from "react";
import type { IconType } from "react-icons";

type Props = SVGProps<SVGSVGElement> & {
  icon: IconType;
};

/** react-icons + strict JSX types: render Tabler glyphs as a typed SVG component. */
export function TablerIcon({ icon, ...props }: Props) {
  const Component = icon as FC<SVGProps<SVGSVGElement>>;

  return <Component {...props} />;
}
