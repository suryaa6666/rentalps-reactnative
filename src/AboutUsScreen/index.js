import { StyleSheet, Text, View, ActivityIndicator, LogBox, TouchableOpacity, Image, Linking } from 'react-native';
import { useFonts, Outfit_500Medium } from '@expo-google-fonts/dev';
import Ionicons from 'react-native-vector-icons/Ionicons';

LogBox.ignoreAllLogs();
export default function AboutUsScreen({ navigation }) {

    let [fontsLoaded] = useFonts({
        Outfit_500Medium
    });

    const openLink = (link) => {
        Linking.openURL(`${link}`);
    }

    if (!fontsLoaded) {
        return <ActivityIndicator style={styles.activityindicator} size='large' color='#2646530ff' />;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.blackheader}>
                    <Text adjustsFontSizeToFit style={styles.headertext}> Tentang Kami </Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardimagecontainer}>
                        <Image source={require('../../assets/surya.jpg')} style={styles.cardimage} />
                    </View>
                    <View style={styles.biotextcontainer}>
                        <Text adjustsFontSizeToFit style={[styles.biotext, { fontWeight: 'bold' }]}>Cintara Surya Elidanto</Text>
                        <Text adjustsFontSizeToFit style={styles.biotext}>NIM : H1D021006</Text>
                        <Text adjustsFontSizeToFit style={styles.biotext}>Hobi : Membaca, Menonton, Ngoding</Text>
                    </View>
                </View>
                <View style={styles.mediasocialcontainer}>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} onPress={() => { openLink('https://www.instagram.com/suryaelidanto1/') }}>
                        <Ionicons name={'logo-instagram'} size={30} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} onPress={() => openLink('https://www.facebook.com/cintara.elidanto/')}>
                        <Ionicons name={'logo-facebook'} size={30} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} onPress={() => openLink('https://api.whatsapp.com/send/?phone=6289514043621')}>
                        <Ionicons name={'logo-whatsapp'} size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardimagecontainer}>
                        <Image source={require('../../assets/rangga.jpg')} style={styles.cardimage} />
                    </View>
                    <View style={styles.biotextcontainer}>
                        <Text adjustsFontSizeToFit style={[styles.biotext, { fontWeight: 'bold' }]}>Rangga Dwi Mahendra</Text>
                        <Text adjustsFontSizeToFit style={styles.biotext}>NIM : H1D021034</Text>
                        <Text adjustsFontSizeToFit style={styles.biotext}>Hobi : Berlari, Futsal, dan Bermain Game</Text>
                    </View>
                </View>
                <View style={styles.mediasocialcontainer}>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} onPress={() => { openLink('https://www.instagram.com/ranggad.mah/') }}>
                        <Ionicons name={'logo-instagram'} size={30} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} onPress={() => openLink('https://api.whatsapp.com/send/?phone=6281288714753')}>
                        <Ionicons name={'logo-whatsapp'} size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 20
    },
    blackheader: {
        backgroundColor: '#264653',
        height: 145,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headertext: {
        color: '#fff',
        fontFamily: 'Outfit_500Medium',
        fontSize: 34
    },
    activityindicator: {
        padding: 30
    },
    card: {
        borderWidth: 0.6,
        borderColor: '#8E8383',
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    cardimagecontainer: {
        flex: 1,
    },
    cardimage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    biotextcontainer: {
        padding: 20,
        flex: 1,
        overflow: 'scroll',
    },
    biotext: {
        color: '#264653',
        fontFamily: 'Outfit_500Medium',
        fontSize: 20
    },
    mediasocialcontainer: {
        padding: 5,
        borderWidth: 0.6,
        borderColor: '#8E8383',
        borderRadius: 5,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2A9D8F'
    }
});
