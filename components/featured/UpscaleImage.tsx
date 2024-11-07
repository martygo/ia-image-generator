import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { AdvancedImage, upload } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

import { replicateToken } from "@/constants/Keys";

const cld = new Cloudinary({
	cloud: {
		cloudName: "dhjeu9fdq",
	},
	url: {
		secure: true,
	},
});

export default function UpscaleImage() {
	const [image, setImage] = useState<string | null>(null);

	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const onPickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const onGenerateImage = async (image: string) => {
		const generateImage = await fetch(
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
						"a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf",
					input: {
						image: image,
						style: "3D",
						prompt: "cyberpunk",
						prompt_strength: 4.5,
					},
				}),
			},
		);

		return await generateImage.json();
	};

	const onUpscaleImage = async () => {
		setLoading(true);

		try {
			if (image === null) {
				return;
			}

			if (!replicateToken) {
				throw new Error("Missing API Key");
			}

			await upload(cld, {
				file: image,
				options: {
					upload_preset: "replicate-upscale",
					unsigned: true,
				},
				callback: async (error: any, response: any) => {
					if (error) {
						throw new Error("Error uploading image");
					}

					const data = await onGenerateImage(response.secure_url);

					router.push({
						pathname: "/viewImage",
						params: {
							prompt: "cyberpunk",
							imageUrl: data.output,
						},
					});
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
			<Text style={styles.textLabel}>Upload your image:</Text>

			<TouchableOpacity
				onPress={onPickImage}
				style={{
					padding: 50,
					backgroundColor: "#e6e6e6",
					borderRadius: 15,
					alignItems: "center",
					width: "100%",
					marginTop: 10,
				}}
			>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{
							width: 300,
							height: 200,
						}}
					/>
				) : (
					<Image
						source={require("@/assets/images/ia-2.png")}
						style={{
							width: 70,
							height: 70,
						}}
					/>
				)}
			</TouchableOpacity>

			<View style={[styles.button, loading && styles.buttonLoading]}>
				<TouchableOpacity onPress={onUpscaleImage} disabled={loading}>
					{loading ? (
						<ActivityIndicator color="#fff" size="small" />
					) : (
						<Text style={styles.buttonText}>Upscale Image</Text>
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
	button: {
		marginTop: 20,
		padding: 15,
		borderRadius: 20,
		backgroundColor: "#000",
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
