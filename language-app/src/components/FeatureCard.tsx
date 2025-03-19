 export const FeatureCard = ({title, description, icon}: {
    title: string;
    description:string;
    icon: string;
 }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
        <div className="text-4xl mb-4 text-primary-600">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
 );