import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { useOAuth } from "@clerk/clerk-expo";

export const useWarmUpBrowser = () => {
	React.useEffect(() => {
		void WebBrowser.warmUpAsync();
		return () => {
			void WebBrowser.coolDownAsync();
		};
	}, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginView() {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const onLogin = React.useCallback(async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow({
				redirectUrl: Linking.createURL("/(tabs)/home", {
					scheme: "myapp",
				}),
			});

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, []);

	return (
		<View>
			<Image
				source={require("@/assets/images/bg.jpg")}
				style={{
					width: "100%",
					height: 600,
				}}
			/>

			<View
				style={{
					padding: 25,
					marginTop: -40,
					backgroundColor: "#fff",
					height: 600,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
				}}
			>
				<Text style={styles.title}>Welcome to ImaginAI</Text>
				<Text style={styles.subtitle}>
					Create AI Art in Just a Few Clicks
				</Text>

				<View style={styles.buttonContinue}>
					<TouchableOpacity onPress={onLogin}>
						<Text
							style={{
								color: "#fff",
								fontSize: 15,
								textAlign: "center",
								fontWeight: "bold",
							}}
						>
							Continue
						</Text>
					</TouchableOpacity>
				</View>

				<Text
					style={{
						textAlign: "center",
						marginTop: 20,
						fontSize: 14,
						color: "#666",
					}}
				>
					By Continue, you agree to our terms and conditions.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
	},
	subtitle: {
		color: "#666",
		marginTop: 10,
		textAlign: "center",
	},
	buttonContinue: {
		backgroundColor: "#000",
		marginTop: 30,
		padding: 20,
		borderRadius: 25,
	},
});
