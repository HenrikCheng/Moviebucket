import { featureInfo } from "../constants";

const FeatureContent = () => {
	return (
		<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
			{featureInfo.map(({ header, text }, index) => (
				<div
					key={header.toString()}
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>{header}</h2>
					<p className={`m-0 text-sm opacity-50`}>{text}</p>
				</div>
			))}
		</div>
	);
};

export default FeatureContent;
