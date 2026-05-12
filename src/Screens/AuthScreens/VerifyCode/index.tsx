import React, { useRef } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { Formik } from "formik";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import { colors } from "../../../Utils/theme";
import Button from "../../../Components/Button";
import styles from "./styles";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import icons from "../../../Assets/Icons";
import { navigate } from "../../../Utils/navigation";
import { verifyCodeValidationSchema, verifyCodeInitialValues } from "../../../Utils/validation";

const OTP_LENGTH = 6;

const VerifyCode = () => {
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const onSubmit = (values: typeof verifyCodeInitialValues) => {
        console.log("Verify code submit:", values);
        navigate('ResetPassword');
    };

    return (
        <Formik
            initialValues={verifyCodeInitialValues}
            validationSchema={verifyCodeValidationSchema}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue, handleSubmit, errors, touched, setFieldTouched }) => {
                const codeChars = Array.from({ length: OTP_LENGTH }).map((_, i) => values.code?.[i] ?? "");
                const showError = touched.code && errors.code ? (errors.code as string) : undefined;

                const setCharAt = (index: number, char: string) => {
                    const next = codeChars.slice();
                    next[index] = char;
                    const joined = next.join("").replace(/\s/g, "");
                    setFieldValue("code", joined);
                };

                const focusIndex = (index: number) => {
                    inputRefs.current[index]?.focus?.();
                };

                return (
                    <AppWrapper paddingHorizontal={0}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            <ImageIcons source={icons.verifyEmail} size={100} style={styles.iconSpacing} />
                            <CustomText text="Verify your email" size={24} weight="bold" />
                            <CustomText
                                text="A 6-digit code has been sent to"
                                style={styles.subtitle}
                            />
                            <CustomText text="doctor@example.com" weight="semibold" />

                            <View style={styles.card}>
                                <View style={styles.otpRow}>
                                    {codeChars.map((char, index) => (
                                        <TextInput
                                            placeholder="-"
                                            placeholderTextColor={colors.black}
                                            key={index}
                                            ref={(r) => {
                                                inputRefs.current[index] = r;
                                            }}
                                            value={char}
                                            style={styles.otpBox}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            returnKeyType="done"
                                            onFocus={() => setFieldTouched("code", true)}
                                            onChangeText={(text) => {
                                                const digit = text.replace(/\D/g, "").slice(-1);
                                                setCharAt(index, digit);
                                                if (digit && index < OTP_LENGTH - 1) {
                                                    focusIndex(index + 1);
                                                }
                                            }}
                                            onKeyPress={({ nativeEvent }) => {
                                                if (nativeEvent.key === "Backspace") {
                                                    if (char) {
                                                        setCharAt(index, "");
                                                        return;
                                                    }
                                                    if (index > 0) {
                                                        setCharAt(index - 1, "");
                                                        focusIndex(index - 1);
                                                    }
                                                }
                                            }}
                                        />
                                    ))}

                                </View>

                                {showError ? (
                                    <CustomText
                                        text={showError}
                                        color={colors.red}
                                        size={12}
                                        style={styles.errorText}
                                    />
                                ) : null}
                                <CustomText
                                    text="Resend Code"
                                    weight="semibold"
                                    style={styles.resendText}
                                    onPress={() => { }}
                                />

                                <Button
                                    size={16}
                                    children="Confirm & Verify"
                                    style={styles.verifyButton}
                                    onPress={handleSubmit as any}
                                    icon={icons.rightArrow}
                                />
                            </View>

                            <View style={styles.secureSection}>
                                <CustomText
                                    text="By confirming, you agree to our Terms of Service."
                                    color={colors.gray}
                                    size={11}
                                    style={styles.secureDescription}
                                    onPress={() => { }}
                                />
                                <CustomText
                                    text="Back to Login"
                                    color={colors.primary}
                                    weight="semibold"
                                    style={styles.backToLogin}
                                    onPress={() => navigate('Login')}
                                />
                            </View>

                        </ScrollView>
                    </AppWrapper>
                );
            }}
        </Formik>
    );
};

export default VerifyCode;  