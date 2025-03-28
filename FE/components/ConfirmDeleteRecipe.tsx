import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface IProp {
	isModalVisible: boolean;
	setModalVisible: any;
	handleConfirmDelete: () => void;
	handleCancelDelete: () => void;
}
export default function ConfirmDeleteRecipe({
	isModalVisible,
	setModalVisible,
	handleCancelDelete,
	handleConfirmDelete,
}: IProp) {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isModalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View className="flex-1 justify-center items-center bg-black/50">
				<View className="bg-white p-6 rounded-[20px] w-4/5">
					{/* Tiêu đề */}
					<Text className="text-xl font-bold text-center mb-4">
						Confirm Delete
					</Text>

					{/* Nội dung */}
					<Text className="text-base text-gray-600 text-center mb-6">
						Are you sure you want to delete this item? This action
						cannot be undone.
					</Text>

					{/* Nút hành động */}
					<View className="flex-row justify-between">
						<TouchableOpacity
							className="bg-gray-200 py-3 px-6 rounded-[10px] flex-1 mr-2"
							onPress={handleCancelDelete}
						>
							<Text className="text-center text-gray-700 font-medium">
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-red-500 py-3 px-6 rounded-[10px] flex-1 ml-2"
							onPress={handleConfirmDelete}
						>
							<Text className="text-center text-white font-medium">
								Delete
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
