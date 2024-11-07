import { useRouter } from "expo-router";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";

export type DataType = {
	key: string;
	title: string;
	image: any;
	type: string;
};

const data: DataType[] = [
	{
		key: "1",
		title: "Text to Image",
		image: require("@/assets/images/ia-1.png"),
		type: "textToImage",
	},
	{
		key: "2",
		title: "Upscale Image",
		image: require("@/assets/images/ia-2.png"),
		type: "upscaleImage",
	},
	{
		key: "3",
		title: "Remove BG",
		image: require("@/assets/images/ia-4.png"),
		type: "removeBg",
	},
	{
		key: "4",
		title: "Mockup/Fine Tune",
		image: require("@/assets/images/ia-3.png"),
		type: "mockupFineTune",
	},
];

export default function FeaturedAI() {
	const router = useRouter();

	function onClickAiModel(item: DataType) {
		router.push({
			pathname: "/aiForm",
			params: { type: item.type, title: item.title },
		});
	}

	return (
		<View
			style={{
				marginTop: 20,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
				}}
			>
				Featured
			</Text>

			<FlatList
				data={data}
				numColumns={4}
				horizontal={false}
				scrollEnabled={false}
				style={{
					marginTop: 10,
				}}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => onClickAiModel(item)}
						style={{
							flex: 1,
							alignItems: "center",
						}}
					>
						<View
							style={{
								padding: 8,
								borderRadius: 8,
								backgroundColor: "#e6e6e6",
							}}
						>
							<Image
								source={item.image}
								style={{
									width: 40,
									height: 40,
								}}
							/>
						</View>

						<Text
							style={{
								fontSize: 12,
								textAlign: "center",
								color: "#000",
								marginTop: 4,
							}}
						>
							{item.title}
						</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.key}
			/>
		</View>
	);
}
