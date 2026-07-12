import { useEffect } from 'react'
import { View, Image, StyleSheet, Text, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { useCurrentUserStore } from '@/stores/useCurrentUserStore'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import { uploadImageToS3, uploadImageToDb } from '@/utils/uploadImage'
import { handleError } from '@/utils/errorHandler'

const PROFILE_PIC_SIZE = 64

export default function UserInfo() {
    const { username, photo, uploaded, setUsername, setPhoto, setUploaded } = useCurrentUserStore((state) => ({
        username: state.username,
        photo: state.photo,
        uploaded: state.uploaded,
        setUsername: state.setUsername,
        setPhoto: state.setPhoto,
        setUploaded: state.setUploaded,
    }))

    useEffect(() => {
        async function loadUser() {
            try {
                const { username, pic } = await fetchCurrentUser()
                setUsername(username)
                if (pic) {
                    setPhoto(pic)
                    setUploaded(true)
                    if (__DEV__) console.log('photo: ', photo)
                }
            }
            catch (err) {
                if (__DEV__) console.error('Error loading user info: ', err)
            }
        }
        loadUser()
    }, [])

    const handleChoosePhoto = async () => {
        const prevPhoto = photo
        const prevUploadedState = uploaded

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7
            })
    
            if (result.canceled) return
    
            const localUri = result.assets[0].uri
            setPhoto(localUri)
            setUploaded(true)
    
            const picUrl = await uploadImageToS3(localUri)
            await uploadImageToDb(picUrl)
            setPhoto(picUrl)
        }
        catch (err) {
            setPhoto(prevPhoto)
            setUploaded(prevUploadedState)
            if (__DEV__) console.log('Failed to choose a photo: ', err)
            handleError(err, 'Failed to choose a photo. Please try again.')
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profilePic}
                    source={
                        uploaded && photo
                            ? { uri: photo }
                            : require('../../assets/img/placeholder-profile2.webp')
                    }
                />
                <Pressable style={styles.cameraBadge} onPress={handleChoosePhoto}>
                    <Icon source="camera" size={14} color="#fff" />
                </Pressable>
            </View>
            <Text style={styles.username}>{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a5fc7',
        borderRadius: 16,
        marginHorizontal: 15,
        marginTop: 114,
        padding: 16,
    },
    profileContainer: {
        position: 'relative',
    },
    profilePic: {
        width: PROFILE_PIC_SIZE,
        height: PROFILE_PIC_SIZE,
        borderRadius: PROFILE_PIC_SIZE / 2,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3a9fff',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1a5fc7',
    },
    username: {
        flex: 1,
        marginLeft: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
})
