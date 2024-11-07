import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import FeaturedAI from "@/components/FeaturedAI";
import AiModels from "@/components/AiModels";

export default function Home() {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top"]}>
			<FlatList
				data={[1]}
				style={{
					paddingHorizontal: 15,
				}}
				renderItem={() => (
					<View>
						<Header />
						<Banner />
						<FeaturedAI />
						<AiModels type="style" />
						<AiModels type="avatar" />
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
