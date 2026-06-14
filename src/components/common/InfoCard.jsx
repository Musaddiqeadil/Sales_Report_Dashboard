const InfoCard = ({
  title,
  icon: Icon,
  headerColor = "bg-blue-600",
  children,
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-md">
      <div
        className={`${headerColor} flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 text-white font-semibold text-sm md:text-base`}
      >
        {Icon && <Icon size={18} />}
        <h3>{title}</h3>
      </div>

      <div className="p-2 md:p-4">
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
};

export default InfoCard;
