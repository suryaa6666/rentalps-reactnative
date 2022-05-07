import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, LogBox } from 'react-native';
import { useFonts, Outfit_500Medium } from '@expo-google-fonts/dev';
import { Picker } from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import "intl";
import "intl/locale-data/jsonp/en";
import validator from 'validator';


LogBox.ignoreAllLogs();
export default function AddTransactionScreen({ navigation }) {

    const [selectedPlaystationId, setSelectedPlaystationId] = useState();
    const [selectedPlaystationPrice, setSelectedPlaystationPrice] = useState();
    const [playstation, setPlaystation] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [hours, setHours] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [handphoneNumber, setHandphoneNumber] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const getPlaystation = async () => {
        const playstation = await axios.get(`https://rentalps-basisdata2projekan.herokuapp.com/getrentals/0IQuCDT6u2N6oqQDMEom2f4ryEVtgaXl`);
        console.log(playstation);
        setPlaystation(playstation);
        setSelectedPlaystationId(playstation.data[0]["id_ps"]);
        setSelectedPlaystationPrice(playstation.data[0]["rate_perjam"]);
    }

    const fetchPost = async () => {
        const post = await axios({
            method: 'post',
            url: 'https://rentalps-basisdata2projekan.herokuapp.com/getrentals/0IQuCDT6u2N6oqQDMEom2f4ryEVtgaXl',
            data: {
                nama: validator.trim(name),
                usia: age,
                no_hp: handphoneNumber,
                jam: hours,
                harga: totalPrice,
                id_ps: selectedPlaystationId,
                waktu: Date.now()
            }
        })
    }

    const clearInput = () => {
        setName('');
        setAge('');
        setHandphoneNumber('');
        setHours('');
        setTotalPrice(0);
    }

    const addTransaction = () => {
        try {
            fetchPost();
            clearInput();
        } catch (err) {
            console.log(err);
            return <Text> Error with message : {err} </Text>
        }
    }

    const addValidation = () => {

        let stillError;
        let err = [];

        if (validator.isEmpty(validator.trim(`${name}`))) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Nama tidak boleh kosong!' });
            setName('');
        }

        if (validator.isEmpty(`${age}`)) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Umur tidak boleh kosong!' });
            setAge('');
        } else if (!validator.isNumeric(`${age}`)) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Umur harus berupa angka!' });
            setAge('');
        }

        if (validator.isEmpty(`${handphoneNumber}`)) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Nomor handphone tidak boleh kosong!' });
            setHandphoneNumber('');
        } else if (!validator.isNumeric(`${handphoneNumber}`)) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Nomor handphone harus berupa angka!' });
            setHandphoneNumber('');
        }

        if (validator.isEmpty(`${hours}`)) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Jam main tidak boleh kosong!' });
            setHours('');
        } else if (!validator.isNumeric(`${hours}`)) {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Jam main harus berupa angka!' });
            setHours('');
        }

        if (!validator.isNumeric(`${selectedPlaystationPrice}`) || validator.isEmpty(`${selectedPlaystationPrice}`)) {
            setShowAlert(false);
            stillError = true;
            err.push('Pilih satu jenis playstation!');
        }

        if (!validator.isNumeric(`${totalPrice}`) || totalPrice == 0 || totalPrice == '0') {
            setShowAlert(false);
            stillError = true;
            err.push({ 'err': 'Cek kembali, harga total tidak boleh 0!' });
        }

        if (stillError) {
            setErrorMessage(err);
            setShowError(true);
        } else {
            setShowAlert(true);
        }
    }

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
    }

    useEffect(() => {
        getPlaystation();
    }, [])

    let [fontsLoaded] = useFonts({
        Outfit_500Medium
    });

    if (!fontsLoaded) {
        return <ActivityIndicator style={styles.activityindicator} size='large' color='#0000ff' />;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.blackheader}>
                    <Text style={styles.headertext}> Tambah Transaksi </Text>
                </View>
                <View style={styles.textinputcontainer}>
                    <TextInput value={name} placeholder='Nama...' style={styles.textinput} maxLength={50} onChangeText={(text) => {
                        setName(text);
                    }} />
                    <TextInput value={age} placeholder='Usia...' style={styles.textinput} maxLength={3} keyboardType='numeric' onChangeText={(text) => {
                        setAge(text);
                    }} />
                    <TextInput value={handphoneNumber} placeholder='No. Hp...' style={styles.textinput} maxLength={15} keyboardType='numeric' onChangeText={(text) => {
                        setHandphoneNumber(text);
                    }} />
                    <TextInput value={hours} placeholder='Jam main...' style={styles.textinput} maxLength={7} keyboardType='numeric' onChangeText={(text) => {
                        setHours(text);
                        if (selectedPlaystationPrice) setTotalPrice(parseInt(text * selectedPlaystationPrice));
                    }
                    }></TextInput>
                    <Picker
                        style={styles.textinput}
                        selectedValue={selectedPlaystationPrice}
                        onValueChange={(itemValue) => {
                            setSelectedPlaystationPrice(itemValue);
                            playstation?.data.map((item) => {
                                if (item["rate_perjam"] == itemValue) {
                                    setSelectedPlaystationId(item["id_ps"]);
                                }
                            })
                            if (hours) setTotalPrice(parseInt(itemValue * hours));
                        }
                        }>
                        {
                            playstation?.data.map((item, itemIndex) => {
                                return <Picker.Item label={item["jenis_ps"]} value={item["rate_perjam"]} key={itemIndex} />;
                            })
                        }
                    </Picker>
                    <TextInput value={formatRupiah(totalPrice)} style={[styles.textinput, { backgroundColor: '#C4C4C4' }]} editable={false} />
                    <TouchableOpacity style={styles.addbutton} onPress={() => { addValidation(); }}>
                        <Text style={styles.addbuttontext}> Tambahkan </Text>
                    </TouchableOpacity>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Konfirmasi"
                    message="Apakah anda setuju untuk menambahkan data transaksi ini?"
                    closeOnTouchOutside={true}
                    onDismiss={() => {
                        setShowAlert(false);
                    }}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Batal"
                    confirmText="Setuju"
                    confirmButtonColor="#7cfc00"
                    cancelButtonColor="#f08080"
                    onCancelPressed={() => {
                        setShowAlert(false);
                    }}
                    onConfirmPressed={() => {
                        setShowAlert(false);
                        setShowSuccess(true);
                        addTransaction();
                    }} />
                <AwesomeAlert
                    show={showSuccess}
                    showProgress={false}
                    title="Pemberitahuan"
                    message="Data transaksi telah ditambahkan!"
                    closeOnTouchOutside={true}
                    onDismiss={() => {
                        setShowSuccess(false);
                    }}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Oke"
                    confirmButtonColor="#7cfc00"
                    onConfirmPressed={() => {
                        setShowSuccess(false);
                        // Reset input
                    }} />
                <AwesomeAlert
                    show={showError}
                    showProgress={false}
                    title="Error"
                    message={
                        <View>
                            {
                                errorMessage?.map((item, index) => {
                                    return <Text key={index} style={styles.errorMessage}>*{item["err"]}</Text>
                                })
                            }
                        </View>
                    }
                    closeOnTouchOutside={true}
                    onDismiss={() => {
                        setShowError(false);
                    }}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Oke"
                    confirmButtonColor="#7cfc00"
                    onConfirmPressed={() => {
                        setShowError(false);
                        // Reset input
                    }} />
            </View>
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
        backgroundColor: '#000',
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
    textinputcontainer: {
        marginTop: 20
    },
    textinput: {
        borderWidth: 0.6,
        borderColor: '#8E8383',
        borderRadius: 5,
        width: 342,
        height: 49,
        padding: 14,
        marginBottom: 10,
        fontFamily: 'Outfit_500Medium',
    },
    addbutton: {
        width: 342,
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 5,
        borderWidth: 0.6,
        borderColor: '#8E8383',
        marginTop: 10,
    },
    addbuttontext: {
        color: '#fff',
        fontFamily: 'Outfit_500Medium',
        fontSize: 18,
    },
    errorMessage: {
        color: 'red',
        fontFamily: 'Outfit_500Medium'
    }
});
