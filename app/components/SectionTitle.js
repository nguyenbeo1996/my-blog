export default function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} mb-12`}>
      <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-3 text-[#2C2C2C]">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base text-[#5A5A5A] max-w-xl leading-relaxed ${centered ? "mx-auto" : "md:mx-0 mx-auto"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
