import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const defaultUrl = "http://localhost:4000";

export default function App() {
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [email, setEmail] = useState("rhea@vibhaag.dev");
  const [password, setPassword] = useState("faculty123");
  const [sessionId, setSessionId] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<"faculty" | "student">("faculty");
  const [scanning, setScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleLogin = async () => {
    setMessage("Signing in...");
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      setToken(json.token);
      setMessage(`Welcome ${json.user.name}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    }
  };

  const handleCheckIn = async (overrideSessionId?: string) => {
    if (!token) {
      setMessage("Login first");
      return;
    }
    const targetSessionId = overrideSessionId ?? sessionId;
    if (!targetSessionId) {
      setMessage("Enter or scan a session ID");
      return;
    }
    setMessage("Checking in...");
    try {
      const endpoint = role === "student" ? "/student/attendance/check-in" : "/attendance/check-in";
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId: targetSessionId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Check-in failed");
      setMessage("Checked in successfully");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Check-in failed");
    }
  };

  const handleScanToggle = async () => {
    if (scanning) {
      setScanning(false);
      return;
    }
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        setMessage("Camera permission denied");
        return;
      }
    }
    setMessage("Scan a session QR code");
    setScanning(true);
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (!scanning) return;
    setScanning(false);
    const trimmed = data.trim();
    let parsed = trimmed;
    if (trimmed.startsWith("{")) {
      try {
        const json = JSON.parse(trimmed) as { sessionId?: string };
        if (json.sessionId) parsed = json.sessionId;
      } catch {
        parsed = trimmed;
      }
    }
    if (trimmed.startsWith("session:")) {
      parsed = trimmed.slice("session:".length).trim();
    }
    setSessionId(parsed);
    handleCheckIn(parsed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.title}>Vibhaag Mobile</Text>
        <Text style={styles.subtitle}>Attendance check-in</Text>
        <TextInput style={styles.input} value={apiUrl} onChangeText={setApiUrl} placeholder="API URL" />
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleChip, role === "faculty" ? styles.roleActive : null]}
            onPress={() => {
              setRole("faculty");
              setEmail("rhea@vibhaag.dev");
              setPassword("faculty123");
            }}
          >
            <Text style={[styles.roleText, role === "faculty" ? styles.roleTextActive : null]}>Faculty</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleChip, role === "student" ? styles.roleActive : null]}
            onPress={() => {
              setRole("student");
              setEmail("ira@vibhaag.dev");
              setPassword("student123");
            }}
          >
            <Text style={[styles.roleText, role === "student" ? styles.roleTextActive : null]}>Student</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={styles.section}>Session to check in</Text>
        <TextInput
          style={styles.input}
          value={sessionId}
          onChangeText={setSessionId}
          placeholder="Session ID"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => handleCheckIn()}>
            <Text style={styles.buttonText}>Check in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.outline]} onPress={handleScanToggle}>
            <Text style={styles.buttonTextOutline}>{scanning ? "Cancel scan" : "Scan QR"}</Text>
          </TouchableOpacity>
        </View>
        {scanning ? (
          <View style={styles.cameraWrap}>
            <CameraView style={styles.camera} onBarcodeScanned={handleBarcodeScanned} />
          </View>
        ) : null}
        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f2ea",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff7ed",
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1c1a19",
  },
  subtitle: {
    fontSize: 14,
    color: "#6d655b",
  },
  roleRow: {
    flexDirection: "row",
    gap: 10,
  },
  roleChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#f2dfc9",
    borderWidth: 1,
    borderColor: "#e2d2c1",
  },
  roleActive: {
    backgroundColor: "#1e6f5c",
  },
  roleText: {
    color: "#2a221a",
    fontWeight: "600",
  },
  roleTextActive: {
    color: "#fff",
  },
  section: {
    fontSize: 12,
    color: "#6d655b",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2d2c1",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fffaf3",
  },
  button: {
    backgroundColor: "#1e6f5c",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  secondary: {
    backgroundColor: "#ff6b2c",
    flex: 1,
  },
  outline: {
    backgroundColor: "#fffaf3",
    borderWidth: 1,
    borderColor: "#1e6f5c",
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonTextOutline: {
    color: "#1e6f5c",
    fontWeight: "600",
  },
  cameraWrap: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2d2c1",
    height: 220,
  },
  camera: {
    flex: 1,
  },
  message: {
    color: "#1c1a19",
    marginTop: 8,
  },
});
