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

const defaultUrl = "http://localhost:4000";

export default function App() {
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [email, setEmail] = useState("rhea@vibhaag.dev");
  const [password, setPassword] = useState("faculty123");
  const [sessionId, setSessionId] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");

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

  const handleCheckIn = async () => {
    if (!token) {
      setMessage("Login first");
      return;
    }
    setMessage("Checking in...");
    try {
      const res = await fetch(`${apiUrl}/attendance/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Check-in failed");
      setMessage("Checked in successfully");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Check-in failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.title}>Vibhaag Mobile</Text>
        <Text style={styles.subtitle}>Faculty attendance check-in</Text>
        <TextInput style={styles.input} value={apiUrl} onChangeText={setApiUrl} placeholder="API URL" />
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
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check in</Text>
        </TouchableOpacity>
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
  secondary: {
    backgroundColor: "#ff6b2c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  message: {
    color: "#1c1a19",
    marginTop: 8,
  },
});
