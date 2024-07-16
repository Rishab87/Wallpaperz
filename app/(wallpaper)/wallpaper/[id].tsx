import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View  , Text, Button , Image , Alert , TouchableOpacity} from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const Wallpaper = () => {

  const [wallpaper , setWallpaper] = useState<any>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();


  const {id}  = useLocalSearchParams();

  const fetchWallpaper = async()=>{
    try{

      const response = await fetch(`https://api.pexels.com/v1/photos/${id}` , {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': "vHGblEImlLfGsGN9FH3L68JqtAEoS7V2TPZoSlJ1lQd7qNMmq88U7h0x",
          },
      });

      const data = await response.json();            
      console.log(data);
      setWallpaper(data.src.portrait);

  } catch(error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchWallpaper();
  }
   , []);

   const saveFile = async () => {

    
    
    if (status?.granted === false) {
      requestPermission();
      return;
    }

    try {
      const { uri } = await FileSystem.downloadAsync(
        wallpaper,
        FileSystem.cacheDirectory + 'image.jpg'
      );
  
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Wallpaperz', asset! ,  false); 
  
      Alert.alert("Saved to gallery")
    } catch (error) {
      Alert.alert('An error occurred!');
      console.error('Error downloading or saving image:', error);
    }
  
    }
  
  return (
    <View>
       <Image source={{uri: wallpaper}} style={{width: '100%', height: '100%' ,  resizeMode: 'cover'}}/>
        <TouchableOpacity onPress={saveFile} style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          backgroundColor: 'black',
          elevation: 5,
        }}>
          <Text style={{ color: 'white' , fontWeight: 900 }}>Download</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Wallpaper