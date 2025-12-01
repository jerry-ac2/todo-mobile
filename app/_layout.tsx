import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C7E8F3",
        },
        headerTitleStyle: {
          color: "black",
        },
        headerTitleAlign: "center",
        headerTitle: "To - DO",
      }}
    />
  );
}
