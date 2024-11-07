import { useRef, useState } from "react";

import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import { replicateToken } from "@/constants/Keys";

export default function TextToImage() {
	const [prompt, setPrompt] = useState<string>("");
	const [imageUrl, setImageUrl] = useState("");

	const [inputEmpty, setInputEmpty] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	const router = useRouter();

	const onTextChange = (text: string) => {
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		debounceTimeout.current = setTimeout(() => {
			setPrompt(text);
		}, 500);
	};

	const onGenerateImage = async () => {
		setLoading(true);

		try {
			setInputEmpty(false);

			if (prompt === null || prompt === "") {
				setInputEmpty(true);
				return;
			}

			if (!replicateToken) {
				throw new Error("Missing API Key");
			}

			const response = await fetch(
				"https://api.replicate.com/v1/predictions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${replicateToken}`,
						Prefer: "wait",
					},
					body: JSON.stringify({
						version:
							"ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
						input: {
							prompt: prompt,
							scheduler: "K_EULER",
							num_outputs: 1,
						},
					}),
				},
			);

			const data = await response.json();

			router.push({
				pathname: "/viewImage",
				params: {
					prompt: prompt,
					imageUrl: data.output[0],
				},
			});
		} catch (error) {
			throw new Error("Error generating image");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<Text style={styles.textLabel}>Enter your prompt:</Text>

			<TextInput
				onChangeText={onTextChange}
				placeholder="Enter your prompt here"
				numberOfLines={105}
				multiline={true}
				textAlignVertical="top"
				style={[
					styles.textInput,
					inputEmpty && styles.textInputEmpty,
				]}
			/>

			<View style={[styles.button, loading && styles.buttonLoading]}>
				<TouchableOpacity
					onPress={onGenerateImage}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator color="#fff" size="small" />
					) : (
						<Text style={styles.buttonText}>Generate</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	textLabel: {
		marginTop: 20,
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#e6e6e6",
		padding: 10,
		borderRadius: 8,
		width: "100%",
		height: 100,
		marginTop: 10,
	},
	textInputEmpty: {
		borderColor: "red",
	},
	button: {
		backgroundColor: "#000",
		marginTop: 20,
		padding: 15,
		borderRadius: 25,
	},
	buttonLoading: {
		backgroundColor: "#778899",
	},
	buttonText: {
		color: "#fff",
		fontSize: 15,
		textAlign: "center",
		fontWeight: "bold",
	},
});
