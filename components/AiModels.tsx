import { View, Text, FlatList, Image } from "react-native";

type AiModelsProps = {
	type: "style" | "avatar";
};

const data = [
	{
		key: "1",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-1.png"),
		type: "style",
	},
	{
		key: "2",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-3.png"),
		type: "style",
	},
	{
		key: "3",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-1.png"),
		type: "style",
	},
	{
		key: "4",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-1.png"),
		type: "style",
	},
	{
		key: "5",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-2.png"),
		type: "avatar",
	},
	{
		key: "6",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-4.png"),
		type: "avatar",
	},
	{
		key: "7",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-1.png"),
		type: "avatar",
	},
	{
		key: "8",
		title: "Woman Portrait",
		image: require("@/assets/images/girl-3.png"),
		type: "avatar",
	},
];

export default function AiModels({ type }: AiModelsProps) {
	const sortByType = data.filter((item) => item.type === type);

	return (
		<View>
			<Text
				style={{
					marginTop: 20,
					fontSize: 20,
					fontWeight: "bold",
				}}
			>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</Text>

			<FlatList
				data={sortByType}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={{
					marginTop: 14,
				}}
				renderItem={({ item }) => (
					<View>
						<Image
							source={item.image}
							style={{
								width: 140,
								height: 180,
								position: "relative",
							}}
						/>

						<Text
							style={{
								position: "absolute",
								bottom: 20,
								fontSize: 13,
								color: "#fff",
								fontWeight: "medium",
								textAlign: "center",
								width: "100%",
							}}
						>
							{item.title}
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.key}
			/>
		</View>
	);
}
