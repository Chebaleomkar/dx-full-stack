interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-5xl max-sm:text-4xl font-bold tracking-wide">{title}</h2>
      <span className="text-[13px] max-sm:text-sm  text-muted-foreground">{description}</span>
    </div>
  );
};
