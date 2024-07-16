import { Stack } from "expo-router"

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            title: "Wallpaperz",
        }}
        />
    </Stack>
  )
}

export default _layout