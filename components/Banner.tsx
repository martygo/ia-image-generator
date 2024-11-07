import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Banner() {
	return (
		<View
			style={{
				marginTop: 20,
			}}
		>
			<Image
				source={require("@/assets/images/banner.jpg")}
				style={{
					width: "100%",
					height: 140,
					borderRadius: 15,
					position: "relative",
				}}
			/>

			<View
				style={{
					position: "absolute",
					padding: 15,
				}}
			>
				<Text
					style={{
						color: "#fff",
						fontSize: 30,
						fontWeight: "bold",
					}}
				>
					Turn Words
				</Text>
				<Text
					style={{
						color: "yellow",
						fontSize: 30,
						fontWeight: "bold",
					}}
				>
					into a story
				</Text>
			</View>

			<TouchableOpacity
				style={{
					position: "absolute",
					padding: 8,
					bottom: 0,
					right: 0,
					margin: 15,
					borderRadius: 8,
					paddingHorizontal: 15,
					backgroundColor: "orange",
				}}
			>
				<Text
					style={{
						color: "#000",
						fontWeight: "bold",
					}}
				>
					Explore
				</Text>
			</TouchableOpacity>
		</View>
	);
}
