function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-300">

      <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl group-hover:bg-indigo-600 group-hover:text-white duration-300">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mt-8">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-7">
        {desc}
      </p>

    </div>
  );
}

export default FeatureCard;