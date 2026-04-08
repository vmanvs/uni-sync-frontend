interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h2 className="text-[22px] font-semibold text-text-heading">{children}</h2>
  );
}
