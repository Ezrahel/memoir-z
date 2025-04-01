import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/auth.styles';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView,Platform } from 'react-native'


import { useSignIn, useSSO } from '@clerk/clerk-expo'
import { Link, Stack, useRouter } from 'expo-router'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

export default function login() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
  
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
  
    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
      if (!isLoaded) return
  
      // Start the sign-in process using the email and password provided
      try {
        const signInAttempt = await signIn.create({
          identifier: emailAddress,
          password,
        })

        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          router.replace('/')
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2))
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    }
    const {startSSOFlow} =useSSO();
    const handleGoogleSignIn = async()=>{
        try{
            const { createdSessionId, setActive}=await startSSOFlow({strategy: "oauth_google"});
            if (setActive && createdSessionId){
                setActive({session: createdSessionId});
                router.replace("/(tabs)/profile");
            }
        } catch (error) {
            console.error("OAuth error:", error);
        }
    };
    

    return(
        <View style={styles.container}>
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={32} color={COLORS.primary}/>
                </View>
            </View>
            
                <Stack.Screen name="login" options={{headerShown:false}}>

                </Stack.Screen>
            
        <Text style={styles.appName}>
            Memoir-Z
        </Text>
        <Text style={styles.tagline}>
        Don't miss anything.
        </Text>
        <View>
                <Image source={require('../../assets/images/auth-bg-2.png')}
                style={styles.illustration}
                resizeMode='contain'/>
                    
        </View>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.container}
        >
      

        
        <TouchableOpacity 
        onPress={handleGoogleSignIn}
        >

        </TouchableOpacity>
        <View style={styles.formContainer}>

            <Text >Sign in</Text>
            <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor="#aaa"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            keyboardType="email-address"
            />
            <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
            </View>
            <TouchableOpacity style={styles.button}
            onPress={onSignInPress}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}
             onPress={handleGoogleSignIn}
             activeOpacity={0.9}>
                <View style={styles.googleIconContainer}>
                    <Ionicons name='logo-google' size={20} color={COLORS.surface}/>
                </View>
            <Text style={styles.googleButtonText}>or Continue with Google</Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Text>Don't have an account?</Text>
            <Link href="/signup">
            <Text>Sign up</Text>
            </Link>
            <Text style={styles.termsText}
            >
            By continuing, you agree to our terms and privacy policy.
            </Text>
            </View>
</KeyboardAvoidingView>
        </View>


        

   
    );
};