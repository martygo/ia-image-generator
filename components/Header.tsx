import { View, Text, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
	const { user } = useUser();

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontSize: 30,
					color: "#000",
					fontWeight: "bold",
				}}
			>
				Imagin AI
			</Text>

			<Image
				source={{ uri: user?.imageUrl }}
				style={{
					width: 35,
					height: 35,
					borderRadius: 99,
					borderColor: "#666",
					borderWidth: 0.4,
				}}
			/>
		</View>
	);
}
