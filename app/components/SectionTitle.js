export default function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} mb-12`}>
      <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-3 text-[#2C2C2C] dark:text-[#F3F4F6] transition-colors duration-300">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base text-[#5A5A5A] dark:text-[#A0A09C] max-w-xl leading-relaxed transition-colors duration-300 ${centered ? "mx-auto" : "md:mx-0 mx-auto"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
