import {
    Kanit_400Regular,
    Kanit_700Bold,
    useFonts,
} from "@expo-google-fonts/kanit";

import React, { useState } from "react";

import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// สร้าง Component หลัก
export default function TaxiFare() {
  // State เก็บค่าระยะทาง
  const [distance, setDistance] = useState("");

  // State เก็บเวลารถติด
  const [trafficTime, setTrafficTime] = useState("");

  // State เก็บผลลัพธ์ค่าโดยสาร
  const [fare, setFare] = useState(0);

  // โหลดฟอนต์ Kanit
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });

  // ถ้าฟอนต์ยังโหลดไม่เสร็จ
  if (!fontsLoaded) {
    return null;
  }

  // ฟังก์ชันคำนวณค่าโดยสาร
  const calculateFare = () => {
    // แปลงข้อความเป็นตัวเลข
    const km = parseFloat(distance);

    // แปลงเวลารถติดเป็นตัวเลข
    const traffic = parseFloat(trafficTime);

    // ตรวจสอบว่ากรอกข้อมูลครบไหม
    if (isNaN(km) || isNaN(traffic)) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ค่าโดยสารเริ่มต้น
    let total = 35;

    // ช่วงกม.ที่ 2 - 10
    // กม.ละ 6.50 บาท
    if (km > 1) {
      // จำนวนกิโลเมตรในช่วงนี้
      const step = Math.min(km, 10) - 1;

      total += step * 6.5;
    }

    // ช่วงกม.ที่ 11 - 20
    // กม.ละ 7 บาท
    if (km > 10) {
      const step = Math.min(km, 20) - 10;

      total += step * 7;
    }

    // ช่วงกม.ที่ 21 - 40
    // กม.ละ 8 บาท
    if (km > 20) {
      const step = Math.min(km, 40) - 20;

      total += step * 8;
    }

    // ช่วงกม.ที่ 41 - 60
    // กม.ละ 8.50 บาท
    if (km > 40) {
      const step = Math.min(km, 60) - 40;

      total += step * 8.5;
    }

    // ช่วงกม.ที่ 61 - 80
    // กม.ละ 9 บาท
    if (km > 60) {
      const step = Math.min(km, 80) - 60;

      total += step * 9;
    }

    // ถ้าระยะทางเกิน 80 กม.
    // กม.ละ 10.50 บาท
    if (km > 80) {
      const step = km - 80;

      total += step * 10.5;
    }

    // ค่ารถติด นาทีละ 3 บาท
    total += traffic * 3;

    // แสดงผลลัพธ์
    setFare(total);
  };

  // ฟังก์ชันรีเซ็ตข้อมูล
  const clearData = () => {
    setDistance("");
    setTrafficTime("");
    setFare(0);
  };

  return (
    // ScrollView ใช้สำหรับเลื่อนหน้าจอ
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* ส่วนของ Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Taxi Fare</Text>
        </View>

        {/* ส่วนของรูปLogo*/}
        <Image
          source={require("../assets/images/taxi.png")}
          style={styles.logo}
        />

        {/* ส่วนของหัวข้อ */}
        <Text style={styles.title}>คำนวณค่าโดยสารแท็กซี่</Text>

        {/* Label ระยะทาง */}
        <Text style={styles.label}>ระยะทาง (กิโลเมตร) 🚕</Text>

        {/* ช่องกรอกระยะทาง */}
        <TextInput
          style={styles.input}
          placeholder="กรุณากรอกระยะทาง"
          keyboardType="numeric"
          value={distance}
          onChangeText={setDistance}
        />

        {/* Label เวลารถติด */}
        <Text style={styles.label}>เวลารถติด (นาที) ⏰</Text>

        {/* ช่องกรอกเวลารถติด */}
        <TextInput
          style={styles.input}
          placeholder="กรุณากรอกเวลารถติด"
          keyboardType="numeric"
          value={trafficTime}
          onChangeText={setTrafficTime}
        />

        {/* ปุ่มคำนวณ */}
        <TouchableOpacity style={styles.btnCalculate} onPress={calculateFare}>
          <Text style={styles.btnText}>คำนวณค่าโดยสาร</Text>
        </TouchableOpacity>

        {/* ปุ่มยกเลิก */}
        <TouchableOpacity style={styles.btnCancel} onPress={clearData}>
          <Text style={styles.btnText}>ยกเลิก</Text>
        </TouchableOpacity>

        {/* ส่วนของกล่องแสดงผลลัพธ์ */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>ค่าโดยสารแท็กซี่</Text>

          {/* แสดงผลลัพธ์ */}
          <Text style={styles.resultFare}>{fare.toFixed(2)}</Text>

          <Text style={styles.resultBaht}>บาท</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // พื้นหลังหลัก
  container: {
    flexGrow: 1,
    backgroundColor: "#e5e5e5",
  },

  // กล่องหลักเต็มจอ
  card: {
    flex: 1,
    backgroundColor: "#f7f2f7",
    minHeight: "100%",
    paddingBottom: 30,
  },

  // Header ด้านบน
  header: {
    height: 100,
    backgroundColor: "#f4bc00",
    paddingVertical: 12,
    alignItems: "center",
  },

  // ข้อความ Header
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Kanit_700Bold",
    marginTop: 40,
  },

  // รูปแท็กซี่
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginTop: 30,
    resizeMode: "contain",
  },

  // หัวข้อ
  title: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    color: "#333",
    fontFamily: "Kanit_700Bold",
  },

  // Label
  label: {
    marginLeft: 25,
    marginBottom: 8,
    fontSize: 16,
    color: "#333",
    fontFamily: "Kanit_400Regular",
  },

  // TextInput
  input: {
    width: "85%",
    height: 50,
    borderWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 18,
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
  },

  // ปุ่มคำนวณ
  btnCalculate: {
    width: "85%",
    backgroundColor: "#f4bc00",
    paddingVertical: 14,
    alignSelf: "center",
    borderRadius: 6,
    marginBottom: 12,
  },

  // ปุ่มยกเลิก
  btnCancel: {
    width: "85%",
    backgroundColor: "#9e9e9e",
    paddingVertical: 14,
    alignSelf: "center",
    borderRadius: 6,
  },

  // ข้อความบนปุ่ม
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kanit_700Bold",
  },

  // กล่องผลลัพธ์
  resultBox: {
    width: "85%",
    backgroundColor: "#f2df9f",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: "center",
  },

  // หัวข้อผลลัพธ์
  resultTitle: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Kanit_400Regular",
  },

  // ตัวเลขผลลัพธ์
  resultFare: {
    fontSize: 40,
    color: "red",
    fontFamily: "Kanit_700Bold",
  },

  // คำว่า บาท
  resultBaht: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Kanit_400Regular",
  },
});
