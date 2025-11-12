type SectionHeaderProps = {
  title: string;
  subtitle: string;
  extraComps?: React.ReactNode;
};
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  extraComps,
}: any) => {
  return (
    <header className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-3">
        <h1 className="font-normal text-xl md:text-2xl text-slate-50">
          {title}
        </h1>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
      {extraComps && extraComps}
    </header>
  );
};

export default SectionHeader;
