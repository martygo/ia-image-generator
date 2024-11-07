import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import { blurhash } from "@/constants/Image";

export default function ViewImage() {
	const [permissionResponse, requestPermission] =
		MediaLibrary.usePermissions();

	const navigation = useNavigation();
	const params = useLocalSearchParams();

	const onDownloadImage = async () => {
		try {
			if (permissionResponse?.status !== "granted") {
				const awaitPermission = await requestPermission();

				if (awaitPermission?.status !== "granted") {
					console.log("Permission Denied");
					return;
				}
			}

			const file = FileSystem.documentDirectory + "_image.jpg";
			const image = params.imageUrl as any;

			const { uri } = await FileSystem.downloadAsync(image, file);

			const assetSave = await MediaLibrary.createAssetAsync(uri);

			if (assetSave) {
				console.log("Image Saved Successfully");
			} else {
				throw new Error("Error while saving image");
			}
		} catch (error) {
			throw new Error("Error while downloading image");
		}
	};

	const onShareImage = async () => {};

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: "AI Generated Image",
		});
	}, []);

	return (
		<View
			style={{
				padding: 15,
			}}
		>
			<Image
				source={params?.imageUrl}
				placeholder={{ blurhash }}
				transition={1000}
				style={{
					width: "100%",
					height: 400,
					borderRadius: 15,
				}}
			/>

			<Text
				style={{
					fontSize: 15,
					marginVertical: 10,
					color: "#000",
					fontWeight: "bold",
				}}
			>
				PROMPT: {params?.prompt}
			</Text>

			<View
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 10,
					marginVertical: 20,
				}}
			>
				<TouchableOpacity
					onPress={onDownloadImage}
					style={{
						padding: 15,
						backgroundColor: "#000",
						borderRadius: 15,
						width: "50%",
					}}
				>
					<Text
						style={{
							color: "#fff",
							fontSize: 15,
							textAlign: "center",
						}}
					>
						Download
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={onShareImage}
					style={{
						padding: 15,
						backgroundColor: "orange",
						borderRadius: 15,
						width: "50%",
					}}
				>
					<Text
						style={{
							color: "#fff",
							fontSize: 15,
							textAlign: "center",
							fontWeight: "bold",
						}}
					>
						Share
					</Text>
				</TouchableOpacity>
			</View>

			<Text
				style={{
					color: "#000",
					fontSize: 15,
					fontWeight: "semibold",
				}}
			>
				NOTE: Image will available for 30 min.
			</Text>
		</View>
	);
}
