import { Stack } from 'expo-router';


export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" 
        options={
            {
                headerShown: false
            }
        }
      />

    </Stack>
  );
}
