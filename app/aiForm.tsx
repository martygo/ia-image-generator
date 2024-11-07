import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";

import TextToImage from "@/components/featured/TextToImage";
import TransformImage from "@/components/featured/UpscaleImage";

import { type DataType } from "@/components/FeaturedAI";

export default function AiForm() {
	const [aiModels, setAiModels] = useState<DataType>();

	const navigation = useNavigation();
	const params = useLocalSearchParams();

	useEffect(() => {
		setAiModels(params as DataType);

		navigation.setOptions({
			headerShown: true,
			headerTitle: params.title,
		});
	}, []);

	return (
		<View
			style={{
				padding: 15,
				backgroundColor: "#fff",
				height: "100%",
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
				}}
			>
				{aiModels?.title}
			</Text>

			{aiModels?.type === "textToImage" && <TextToImage />}
			{aiModels?.type === "upscaleImage" && <TransformImage />}
		</View>
	);
}
