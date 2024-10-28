import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useWallet } from '../utils/WalletContext';

const LoginScreen = ({ navigation }) => {
  const { connectWallet, walletAddress } = useWallet();

  const handleLogin = async () => {
    await connectWallet();
    if (walletAddress) {
      navigation.navigate('Game');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tire Racer DApp</Text>
      <Button title="Connect Phantom Wallet" onPress={handleLogin} />
      {walletAddress && <Text>Wallet Connected: {walletAddress}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default LoginScreen;
