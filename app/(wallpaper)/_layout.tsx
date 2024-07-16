import { Stack } from 'expo-router';


export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="wallpaper" 
        options={
            {
                headerShown: false
            }
        }
      />

    </Stack>
  );
}
